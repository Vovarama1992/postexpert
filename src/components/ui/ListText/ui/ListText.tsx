import React, {memo, ReactNode} from 'react';
import {classNames} from "@/utils";
import {twMerge} from "tailwind-merge";

interface ListTextProps {
    left: string;
    right: ReactNode | string | null;
    className?: string;
    leftClassName?: string;
    rightClassName?: string;
    variant?: 'small' | 'middle' | 'big';
}

const
    ListText = ({left, right, variant = 'small', className, leftClassName, rightClassName}: ListTextProps) => {

    return (
        <div className={
            classNames(
                "flex items-center",
                {
                    'list-text-row': variant === 'middle',
                    'gap-1 ': variant === 'small',
                    'gap-2 ': variant === 'big',
                },
                [className]
            )
        }>
            <span className={
                twMerge(
                    classNames('', {
                        "text-sm text-gray-600": variant === 'small',
                        "text-small-4 text-gray-500": variant === 'middle' || variant === 'big',
                    }),
                    leftClassName
                )
            }>
                {left}{left ? ':' : ''}
            </span>
            <span className={
                twMerge(
                    classNames("font-medium !leading-list ", {
                        'text-sm text-gray-800': variant === 'small',
                        'text-small-4 text-gray-800': variant === 'middle',
                        "text-small-4 text-gray-900": variant === 'big'
                    }),
                    rightClassName
                )
            }>
                    {!right ? '-' : right}
                </span>
        </div>
    );
};

export default memo(ListText);
