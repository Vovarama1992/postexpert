import {ButtonProps} from "@nextui-org/react";
import {ReactNode} from "react";
import {IconType} from "@/assets";

export interface ButtonStyledProps extends ButtonProps {
    children: ReactNode
}

export interface IconButtonProps extends ButtonProps {
    icon: IconType,
    iconClassName?: string;
}
