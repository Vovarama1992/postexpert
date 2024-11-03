import {ModalProps} from "@nextui-org/modal";

interface DialogCropProps {
    cropImage: File | null,
    onAccept: (cropImage: File) => void,
}

interface ConfirmProps {
    show?: boolean,
    proceed?(val: boolean | null): void,
    confirmation?: any,
    options?: any,
    title?: string
}

export type DialogType = (props: Omit<ModalProps, 'children'> & DialogCropProps) => JSX.Element;
export type ConfirmDialogType = (props: ConfirmProps) => JSX.Element;
export type DialogPreviewType = (props: Omit<ModalProps, 'children'>) => JSX.Element;

export type {ConfirmProps}
