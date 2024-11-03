import React from 'react';
import {CardProps} from "../model/card";
import {classNames} from "@/utils";

const Card = ({actions, children, mainClassName, actionsClassName, top, className, }: CardProps) => {

    return (
        <figure className={
            classNames(`border-card pb-0`, {}, [className]
            )
        }>
            {top ? top : null}
            <div className={
                classNames(
                    " pb-4 flex flex-col",
                    {},
                    [mainClassName]
                )
            }>
                {children}
            </div>
            {
                actions  ? <div className={
                    classNames(
                        "flex bg-gray-50   items-center justify-end pb-6 pt-4 max-sm:pb-4 border-t border-dashed",
                        {},
                        [actionsClassName]
                    )
                }>
                    {actions}
                </div> : null
            }
        </figure>
    );
};

export default Card;
