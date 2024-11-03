import React from 'react';
import {InfoFillIcon} from "@/assets";
import {Tooltip} from "@nextui-org/react";
import {twMerge} from "tailwind-merge";

const InfoCustom = ({content, className}: {content: string, className?: string}) => {
    return (
        <Tooltip content={content} placement="bottom">
            <div>
                <InfoFillIcon className={
                    twMerge(" text-amber-400", className)
                }/>
            </div>
        </Tooltip>
    );
};

export default InfoCustom;
