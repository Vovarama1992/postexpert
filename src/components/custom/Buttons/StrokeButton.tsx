'use client'
import React from 'react';
import {Button} from "@nextui-org/button";
import {ButtonStyledProps} from "./model/buttons";
import {classNames} from "@/utils";
import { twMerge } from "tailwind-merge";
import {Link} from "@/navigation";

const StrokeButton = ({children, size = 'md', ...other}: ButtonStyledProps) => {
    return (
        <Button {...other} as={other?.href ? Link : 'button'} className={
            twMerge(
                classNames(
                    " min-w-[95px]  !rounded-xl !px-5 !gap-2 !border" +
                    " !bg-transparent !text-normal font-medium  ",
                    {
                        '!border-gray-600 !text-gray-800': !other?.disabled,
                        '!border-gray-400 !text-gray-700 opacity-40': other?.disabled,
                        'h-12': size === 'sm',
                        'h-14': size === 'md',
                    },
                    []
                ),
                other?.className
            )
        } color="default" variant="bordered" >
            {children}
        </Button>
    );
};

export default StrokeButton;
