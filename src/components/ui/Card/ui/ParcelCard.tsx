import React from 'react';
import {ParcelCardProps} from "../model/card";
import {classNames} from "@/utils";

const ParcelCard = ({
    children, title, icon: Icon, className, right, id
                    }: ParcelCardProps) => {
    return (
        <figure id={id} className={
            classNames(
                "border-card",
                {},
                [className]
            )
        }>
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    {Icon ? <Icon className="size-[18px] text-gray-900"/> : null}
                    <h6 className="text-subtitle-2 font-semibold">
                        {title}
                    </h6>
                </div>
                {right ? right : null}
            </div>
            {children}
        </figure>
    );
};

export default ParcelCard;
