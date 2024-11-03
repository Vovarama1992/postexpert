'use client'
import React, {useRef} from 'react';
import {ModalBody, ModalContent, ModalHeader} from "@nextui-org/modal";
import {ModalFooter} from "@nextui-org/react";
import Cropper, { ReactCropperElement } from "react-cropper";
import {v4 as uuidv4} from 'uuid';
import "cropperjs/dist/cropper.css";
import {useStore} from "@/store/store";
import ModalCustom from "@/components/custom/Modal/ModalCustom";
import {IndigoButton, StrokeButton} from "@/components/custom";
import {DialogType} from "@/components/common/Dialogs/model/dialog";

const DialogCrop: DialogType = ({isOpen, cropImage, onAccept, onClose, ...other}) => {

    const {
        locales
    } = useStore()

    const cropperRef = useRef<ReactCropperElement>(null);

    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;

        if (!cropper) {
            return;
        }

        cropper.getCroppedCanvas().toBlob((b) => {
            if (b) {
                const resultCrop = new File([b], `${uuidv4}.jpeg`, {
                    type: b.type,
                });

                onAccept(resultCrop);

                if (onClose) {
                    onClose();
                }
            }
        });
    };

    return (
        <ModalCustom size="3xl"  backdrop={"blur"} isOpen={isOpen} onClose={onClose} {...other}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 p-8 max-sm:p-4">
                    {locales.components.DialogCrop.CROP_PHOTO}
                </ModalHeader>
                <ModalBody className="px-8 max-sm:px-4">
                    {cropImage ? (
                        <Cropper
                            src={URL.createObjectURL(cropImage)}
                            style={{ height: 400, width: "100%" }}
                            initialAspectRatio={1}
                            guides={true}
                            ref={cropperRef}
                        />
                    ) : null}
                </ModalBody>
                <ModalFooter>
                    <StrokeButton size="sm" onPress={onClose}>
                        {locales.components.DialogCrop.CANCEL}
                    </StrokeButton>
                    <IndigoButton disabled={!cropImage} size="sm" onPress={onCrop}>
                        {locales.components.DialogCrop.SAVE}
                    </IndigoButton>
                </ModalFooter>
            </ModalContent>
        </ModalCustom>
    );
};

export default DialogCrop;
