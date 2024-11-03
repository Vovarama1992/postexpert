import React from 'react';
import {Button} from "@nextui-org/button";
import {ButtonStyledProps} from "./model/buttons";
import {classNames} from "@/utils";
import {twMerge} from "tailwind-merge";

const BlackButton = ({children, size = 'md', ...other}: ButtonStyledProps) => {
    return (
        <Button {...other} className={
            twMerge(
                classNames(
                    " min-w-[95px] !px-5 !gap-2 !text-small-3 font-medium text-white !rounded-xl",
                    {
                        'bg-gray-900': !other?.disabled,
                        'h-12': size === 'sm' || size === 'lg',
                        'h-14': size === 'md',
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

export default BlackButton;
