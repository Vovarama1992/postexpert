import React from 'react';
import { Skeleton } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { classNames } from "@/utils";

interface DashboardCardSkeletonProps {
    variant: 'blue' | 'white' | 'gray';
    className?: string;
}

const DashboardCardSkeleton: React.FC<DashboardCardSkeletonProps> = ({ variant, className }) => {
    const backgroundColor = variant === 'blue' ? 'bg-blue-100'
        : variant === 'gray' ? 'bg-gray-100' : 'bg-white';

    return (
        <a href={'/'}
            className={
                twMerge(
                    classNames(
                        "flex flex-col p-4 rounded-2xl relative",
                        {
                            'outline-1 outline outline-gray-300': variant === 'white'
                        },
                        [backgroundColor]
                    ),
                    className
                )
            }
        >
            <div className="pt-2 pb-8 flex items-center px-4 gap-4">
                <Skeleton className="rounded-full w-10 h-10" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
            <div className="pt-4 border-t border-solid border-gray-300 flex items-center mx-4 gap-x-4">
                <Skeleton className="h-6 w-20" />
            </div>
        </a>
    );
};

export default DashboardCardSkeleton;