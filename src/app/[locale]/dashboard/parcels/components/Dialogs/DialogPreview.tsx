'use client'
import React from 'react';
import {ModalBody, ModalContent} from "@nextui-org/modal";
import {DialogPreviewType} from "@/components/common/Dialogs/model/dialog";
import ParcelViewCard from "../Cards/ParcelViewCard";
import {useStore} from "@/store/store";
import ModalCustom from "@/components/custom/Modal/ModalCustom";
import {InfoFillIcon} from "@/assets";
import useParcelStore from "@/store/parcelStore";
import {ListText} from "@/components/ui/ListText";

const DialogPreview: DialogPreviewType = ({isOpen, onClose, ...other}) => {

    const {locales, getLabelByCode} = useStore()
    const parcel = useParcelStore(state => state.parcel);

    return (
        <ModalCustom className="p-16 max-lg:p-14 max-md:p-10 max-sm:p-6" scrollBehavior="outside" size="5xl"
                     backdrop={"blur"} isOpen={isOpen} onClose={onClose} {...other}>
            <ModalContent>
                <ModalBody className="p-0 gap-6">
                    <h5 className="text-[24px] leading-[24px] font-semibold tracking-[-0.01em] text-gray-900">{getLabelByCode('PREVIEW_TITLE')} {parcel?.title}</h5>
                    <figure className="w-full max-sm:py-8 flex flex-col gap-4 bg-gray-900 border-card border-stroke-500">
                        <div className="flex items-center gap-3">
                            <InfoFillIcon className="text-amber-400 max-sm:grow min-w-[18px]"/>
                            <h6 className="text-subtitle-2 font-medium text-white">{getLabelByCode('PREVIEW_SUB_TITLE')}</h6>
                        </div>
                        <div className="p-8 rounded-2xl max-lg:p-6 bg-dialog-card">
                            <ListText
                                leftClassName="text-white/80"
                                rightClassName="text-white"
                                className={'list-row !text-white/80'}
                                variant="small"
                                left={getLabelByCode('POSTEXPERT_ADDRESS')}
                                right={parcel?.warehouse ? <span>
                                    <span>{parcel?.warehouse?.recipient}</span>
                                    <br/>
                                    <span>{parcel?.warehouse.address}</span>
                                </span> : locales.components.ParcelAddressCard.UNKNOWN}
                            />
                        </div>
                    </figure>
                    <p className="text-[16px] leading-list tracking-[-0.01em] text-gray-700">
                        *{getLabelByCode('PREVIEW_TEXT')}
                    </p>
                    <ParcelViewCard preview/>
                </ModalBody>
            </ModalContent>
        </ModalCustom>
    );
};

export default DialogPreview;
