import React from 'react';
import {confirmable, createConfirmation} from "react-confirm";
import { ModalBody, ModalContent, ModalHeader} from "@nextui-org/modal";
import { ModalFooter } from '@nextui-org/react';
import {useStore} from "@/store/store";
import ModalCustom from "@/components/custom/Modal/ModalCustom";
import {ConfirmProps} from "@/components/common/Dialogs/model/dialog";
import {IndigoButton, StrokeButton} from "@/components/custom";

const DeleteDialog = ({show, proceed, title}: ConfirmProps) => {
    if (!proceed) {
        return null;
    }

    const {locales} = useStore()

    return (
        <ModalCustom backdrop={"blur"} isOpen={show} onClose={() => proceed(false)}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 p-8 max-sm:p-4">{title}?</ModalHeader>
                <ModalBody className="px-8 max-sm:px-4">
                    <p>{locales.components.DeleteDialog.CONFIRMATION}</p>
                </ModalBody>
                <ModalFooter>
                    <StrokeButton size="sm" onClick={() => proceed ? proceed(false) : undefined}>
                        {locales.components.DeleteDialog.CANCEL}
                    </StrokeButton>
                    <IndigoButton size="sm" onClick={() => proceed ? proceed(true) : undefined}>
                        {locales.components.DeleteDialog.DELETE}
                    </IndigoButton>
                </ModalFooter>
            </ModalContent>
        </ModalCustom>
    );
};

export const confirmDeleteDialog = createConfirmation(confirmable(DeleteDialog));
