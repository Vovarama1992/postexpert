import React from 'react';
import {IconButtonProps} from "./model/buttons";
import {Button} from "@nextui-org/button";
import { twMerge } from "tailwind-merge";

const IconButton = ({icon: Icon, iconClassName, ...other}: IconButtonProps) => {
    return (
        <Button isIconOnly  color="default"
                variant="bordered" {...other} className={twMerge("!h-12 !w-[50px] !bg-white !border !border-gray-200 ", other?.className || '')}
        >
            <Icon className={twMerge("size-[18px]", iconClassName)}/>
        </Button>
    );
};

export default IconButton;
