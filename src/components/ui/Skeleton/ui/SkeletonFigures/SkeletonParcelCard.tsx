import React from 'react';
import {Skeleton} from "@nextui-org/skeleton";
import {classNames} from "@/utils";

const SkeletonParcelCard = ({className}: { className?: string }) => {
    return (
        <figure className={
            classNames(
                "border-card lg:px-8 bg-white border-gray-200 flex flex-col gap-3",
                {},
                [className]
            )
        }>
            <div className="flex gap-2">
                <Skeleton className="w-[18px] h-[21px] rounded-full"/>
                <div className="flex-1 flex-col flex gap-4">
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-[127px] h-5 rounded-full"/>
                        <Skeleton className="w-[185px] h-5 rounded-full"/>
                    </div>
                </div>
                <Skeleton className="size-6 rounded-full"/>
            </div>
            <div className="flex items-center gap-x-4 gap-y-2 flex-wrap pl-[26px] max-w-[80%]">
                <Skeleton className="w-[172.34px] h-[24px] rounded-full"/>
                <Skeleton className="w-[252.5px] h-[24px] rounded-full"/>
                <Skeleton className="w-[261.84px] h-[24px] rounded-full"/>
                <Skeleton className="w-[135.68px] h-[24px] rounded-full"/>
            </div>
            <div className="w-full flex justify-end items-center pt-3 border-t border-gray-300 border-dashed ">
                <Skeleton className="w-[164px] h-[24px] rounded-full"/>
            </div>
        </figure>
    );
};

export default SkeletonParcelCard;
