'use client'
import React from 'react';
import {Button} from "@nextui-org/button";
import {ButtonStyledProps} from "./model/buttons";
import {classNames} from "@/utils";
import { twMerge } from "tailwind-merge";
import {Link} from "@/navigation";

const IndigoButton = ({children, size, ...other}: ButtonStyledProps) => {
    return (
        <Button {...other} as={other?.href ? Link : 'button'} className={
            twMerge(
                classNames(
                    "min-w-[95px] h-14 !rounded-xl !px-5 !gap-2 !text-normal font-medium text-white",
                    {
                        'h-12': size === 'sm',
                        'h-14': size === 'md',
                        'bg-gray-300': other?.disabled,
                        'bg-indigo-600': !other?.disabled,
                    },
                    []
                ),
                other?.className
            )
        } color="default" >
            {children}
        </Button>
    );
};

export default IndigoButton;
