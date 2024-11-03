import {ReactNode} from "react";

export interface SideOverProps {
    isOpen: boolean;
    isValid: boolean;
    isSubmitting: boolean;
    onClose(data?: any): void;
    onSubmit: any;
    children: ReactNode;
    title: string;
}

export type SideOverType = Omit<SideOverProps, 'children' | 'onSubmit' | 'isSubmitting' | 'isValid' | 'title'>