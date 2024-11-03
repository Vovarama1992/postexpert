import {ReactNode} from "react";
import {IconType} from "@/assets";

export interface CardProps {
    top?: ReactNode;
    children?: ReactNode;
    mainClassName?: string;
    className?: string;
    actionsClassName?: string;
    actions?: ReactNode;
}

export interface ParcelCardProps {
    children: ReactNode;
    right?: ReactNode;
    className?: string;
    icon?: IconType;
    title?: ReactNode;
    id?: string;
}
