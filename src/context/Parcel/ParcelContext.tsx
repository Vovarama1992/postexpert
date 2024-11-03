'use client'
import {createContext, Dispatch, SetStateAction, useContext} from "react";
import {Parcel} from "@/types";

enum StepsEnum {
    created = 'created',
    content = 'content',
    tracking = 'tracking',
}

interface ParcelContextProps {
    parcel: Parcel;
    step: StepsEnum;
    steps: Record<StepsEnum, boolean>;
    onSaveImages: (images: { file: File }[], deletedImagesOther?: number[]) => Promise<boolean | number[]>;
    onSaveProducts: (products: any[], deletedItems: number[]) => Promise<boolean>;
    deletedItems: number[];
    onSetDeletedItems: Dispatch<SetStateAction<number[]>>;
    fetchParcel: (id: string) => Promise<void>;
}

const ParcelContext = createContext<ParcelContextProps | null>(null);

const ParcelDataProvider = ParcelContext.Provider

const useParcelContext = () => {
    const data = useContext(ParcelContext)

    if (!data) {
        throw new Error(`Невозможно использовать useParcelContext вне ReportAllProvider`)
    }

    return data;
}

export {ParcelDataProvider, useParcelContext}

export {StepsEnum}
