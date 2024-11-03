import React from 'react';
import {Button} from "@nextui-org/button";
import {ButtonStyledProps} from "./model/buttons";
import {TrashIcon} from "@/assets";

const DeleteButton = ({children, ...other}: ButtonStyledProps) => {
    return (
        <Button {...other} color="default" size="lg" className="!rounded-[12px] border-gray-500 !px-5 !border-1 !gap-2 !text-small-3 font-medium" variant="bordered"
                endContent={<TrashIcon height={16} width={16}/>}>
            {children}
        </Button>
    );
};

export default DeleteButton;
