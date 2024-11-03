import {MouseEvent} from 'react';
import {IconType} from "@/assets";

export interface Tab {
    label: string;
    chip?: number;
    icon?: IconType;
    value: string;
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export interface TabsProps {
    tabs: Tab[];
    baseHref: string;
    className?: string;
    spanClassName?: string;
    border?: boolean;
    noSelect?: boolean;
}
