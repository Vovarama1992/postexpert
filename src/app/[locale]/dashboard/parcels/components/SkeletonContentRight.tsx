import React from 'react';
import {Skeleton} from "@nextui-org/skeleton";
import {ArrowMiniIcon} from "@/assets";

const SkeletonContentRight = ({view = false}: {
    view?: boolean
}) => {
    return (
        <div
            className="parcel-info border-card px-6 max-lg:hidden">
            <h2 className="text-title-1 font-semibold"></h2>
            <div className="mt-7 flex items-center gap-2 w-full">
                <Skeleton className="rounded-lg flex-1 h-[33px]"/>
                <ArrowMiniIcon/>
                <Skeleton className="rounded-lg flex-1 h-[33px]"/>
            </div>
            <div className="flex flex-col gap-3 my-3 w-full">
                <div className="flex flex-col gap-3 w-full rounded-xl . py-3">
                    <Skeleton className="w-full h-[21px] py-2"/>
                </div>
                <div className="flex flex-col gap-3 w-full rounded-xl . py-3">
                    <Skeleton className="w-full h-[21px] py-2"/>
                    <Skeleton className="w-full h-[21px] py-2"/>
                    <Skeleton className="w-full h-[21px] py-2"/>
                </div>
                <div className="px-4 py-3 flex items-center justify-between w-full">
                    <Skeleton className="w-[60px] h-[21px]"/>
                    <Skeleton className="w-[60px] h-[21px]"/>
                </div>
            </div>
            {!view ? (
                <div className="flex gap-3 flex-col w-full">
                    <Skeleton className="h-14 rounded-xl"/>
                    <Skeleton className="h-14 rounded-xl"/>
                </div>
            ) : null}
        </div>
    );
};

export default SkeletonContentRight;