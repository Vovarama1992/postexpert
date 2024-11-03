import React from 'react';
import {EyeIcon, TrashIcon, VideoIcon} from "@/assets";
import {useToggleState} from "@/hooks";
import {useTranslationContext} from "@/context";
import DialogPreview from "@/app/[locale]/dashboard/parcels/components/Dialogs/DialogPreview";
import useParcelStore from "@/store/parcelStore";
import {deleteParcel} from "@/lib";
import {toast} from "react-toastify";
import {useRouter} from "@/navigation";
import {twMerge} from "tailwind-merge";
import {BlackButton, StrokeButton} from "@/components/custom";
import {HowItWork} from "@/components/common/Tutorial";
import {confirmDeleteDialog} from "@/components/common/Dialogs/DeleteDialog";

const ParcelCreateTop = ({
                             className
                         }: { className?: string }) => {

    const {locales} = useTranslationContext()

    const router = useRouter()

    const {state: show, toggle: toggleShow, close: closeShow} = useToggleState(false);

    const {state: showPreview, toggle: togglePreview, close: closePreview} = useToggleState(false);

    const parcel = useParcelStore(state => state.parcel);

    const onDelete = async () => {
        const confirmDelete = await confirmDeleteDialog({
            title: 'Удалить заказ',
        });

        if (confirmDelete && parcel?.id) {
            const {message} = await deleteParcel(parcel?.id)

            toast.info(message)

            router.push('/dashboard/parcels')
        }
    }

    return (
        <div className={
            twMerge(
                "max-w-[408px] w-full ml-auto max-md:max-w-full bg-white", className
            )
        }>
            <div className="flex w-full gap-2 justify-end max-md:grid max-md:grid-cols-[2fr_2fr_0.8fr] ">
                <StrokeButton id="preview" className="!text-button-1 max-md:col-span-3" disabled={parcel?.status !== 'draft'} onClick={togglePreview}
                              endContent={<EyeIcon className="h-4 w-4 min-w-4"/>}>
                    {locales.components.TrackingStepForm.PREVIEW_ORDER}
                </StrokeButton>
                <BlackButton className="!text-button-1 max-md:col-span-2" onClick={toggleShow}
                             endContent={<VideoIcon className="h-4 w-4 min-w-4"/>}>
                    {locales.components.TrackingStepForm.HOW_IT_WORKS}
                </BlackButton>
                <StrokeButton className="!text-button-1 w-14 min-w-14 !p-4 max-sm:!p-1 max-sm:w-full max-sm:min-w-full" disabled={parcel?.status !== 'draft'}
                              onClick={onDelete}>
                    <TrashIcon className="h-6 w-6 max-sm:w-5 max-sm:h-5"/>
                </StrokeButton>
            </div>
            <HowItWork show={show} close={closeShow}/>
            <DialogPreview isOpen={showPreview} onClose={closePreview}/>
        </div>

    );
};

export default ParcelCreateTop;
