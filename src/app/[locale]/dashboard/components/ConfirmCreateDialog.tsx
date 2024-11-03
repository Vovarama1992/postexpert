'use client';
import React from 'react';
import { ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { ModalFooter } from "@nextui-org/react";
import { confirmable, createConfirmation } from "react-confirm";
import {useStore} from "@/store/store";
import ModalCustom from "@/components/custom/Modal/ModalCustom";
import {IndigoButton, StrokeButton} from "@/components/custom";
import {ConfirmDialogType} from "@/components/common/Dialogs/model/dialog";

const ConfirmCreateDialog: ConfirmDialogType = ({ show, proceed }) => {

    const { locales } = useStore();

    return (
        <ModalCustom onClose={() => {
            if (proceed) {
                proceed(null)
            }
        }} size="2xl" backdrop={"blur"} isOpen={show}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 p-8 max-sm:p-4">
                    {locales.components.ConfirmCreateDialog.TITLE}
                </ModalHeader>
                <ModalBody className="px-8 max-sm:px-4">
                    {locales.components.ConfirmCreateDialog.BODY}
                </ModalBody>
                <ModalFooter className="max-sm:flex-col">
                    <StrokeButton size="sm" onClick={() => proceed ? proceed(true) : undefined}>
                        {locales.components.ConfirmCreateDialog.CONTINUE_PREVIOUS}
                    </StrokeButton>
                    <IndigoButton size="sm" onClick={() => proceed ? proceed(false) : undefined}>
                        {locales.components.ConfirmCreateDialog.CREATE_NEW}
                    </IndigoButton>
                </ModalFooter>
            </ModalContent>
        </ModalCustom>
    );
};

const confirmCreateDialog = createConfirmation(confirmable(ConfirmCreateDialog));

export { confirmCreateDialog }
