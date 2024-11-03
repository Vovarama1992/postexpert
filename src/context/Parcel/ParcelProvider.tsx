'use client'
import {ReactNode, useState} from 'react';
import {ParcelDataProvider, StepsEnum} from "@/context";
import {Parcel} from "@/types";
import {
    createParcelImage,
    createParcelStepsItems,
    deleteParcelImage,
    deleteParcelStepsItems,
    updateParcelStepsItems
} from "@/lib";
import {cyrToLat} from "@/utils";
import ParcelTourProvider from "@/context/Parcel/ParcelTourProvider";

interface ParcelProviderProps {
    children: ReactNode;
    parcel: Parcel;
    step?: StepsEnum;
    steps: Record<StepsEnum, boolean>;
    fetchParcel: (id: string) => Promise<void>;
}

const ParcelProvider = ({children, parcel, step, steps, fetchParcel}: ParcelProviderProps) => {

    const [deletedItems, setDeletedItems] = useState<number[]>([])

    const [activeStep] = useState<StepsEnum>(step || StepsEnum.created)

    const onSaveImages = async (images: { file: File }[], deletedImagesOther: number[] = []) => {

        if (deletedImagesOther?.length) {

            for (const image of deletedImagesOther) {
                if (image)
                    await deleteParcelImage(parcel.id, image)
            }
        }

        if (images) {

            const created: number[] = []

            const imagesCreated =
                // @ts-ignore
                images?.filter(el => typeof el?.id === 'string')

            for (const image of imagesCreated) {
                const formData = new FormData()

                formData.append('image', image.file)

                const res = await createParcelImage(parcel.id, formData)

                created.push(res.data.image.id)
            }

            return Promise.resolve(created)
        }

        return Promise.resolve(false)
    }

    const onSaveProducts = async (products: any[], deletedItems: number[]) => {

        if (deletedItems.length) {
            await deleteParcelStepsItems(parcel.id, deletedItems.map(el => ({id: el})))
        }

        const productsEdit = products?.filter(el => typeof el.id === 'number')
        const productsCreated = products?.filter(el => typeof el.id === 'string')

        if (productsEdit?.length) {
            await updateParcelStepsItems(parcel.id, productsEdit.map(el => ({
                ...el,
                name_ru: el.title,
                name_en: cyrToLat(el.title)
            })))
        }

        if (productsCreated?.length) {
            await createParcelStepsItems(parcel.id, productsCreated.map(el => ({
                ...el,
                name_ru: el.title,
                name_en: cyrToLat(el.title)
            })))
        }

        return Promise.resolve(true)
    }

    return (
        <ParcelDataProvider value={{
            parcel,
            onSaveImages,
            steps,
            deletedItems,
            onSetDeletedItems: setDeletedItems,
            step: activeStep,
            onSaveProducts,
            fetchParcel
        }}>
            <ParcelTourProvider>
                {children}
            </ParcelTourProvider>
        </ParcelDataProvider>
    );
};

export default ParcelProvider;
