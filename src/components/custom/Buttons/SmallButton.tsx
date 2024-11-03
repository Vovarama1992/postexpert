import React from 'react';
import {IconButtonProps} from "./model/buttons";
import {Button} from "@nextui-org/button";
import {twMerge} from "tailwind-merge";

const SmallButton = ({icon: Icon, ...other}: IconButtonProps) => {
    return (
        <Button isIconOnly  color="default"
                 {...other} className={twMerge(
            "!size-11 !rounded-xl flex items-center !bg-gray-200  justify-center text-small-2 font-medium !text-gray-900",
            other.className
        )}
        >
            <Icon />
        </Button>
    );
};

export default SmallButton;
