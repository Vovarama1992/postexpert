import React from 'react';
import {Skeleton} from "@nextui-org/skeleton";
import {classNames} from "@/utils";

const SkeletonAddressCard = ({className}: { className?: string }) => {
    return (
        <figure className={
            classNames(
                "border-card pb-0 h-[379px]",
                {},
                [className]
            )
        }>
            <div className="flex items-center justify-between">
                <Skeleton className=" w-[202px] h-6 rounded-lg  "/>
                <Skeleton className=" size-10  rounded-lg  "/>
            </div>
            <div className="grid grid-cols-2 justify-between mt-6 flex-1 gap-x-8">
                <div className="flex flex-col  ">
                    <Skeleton className="w-full h-5  rounded-lg my-3 "/>
                    <Skeleton className="w-full h-5  rounded-lg my-3"/>
                    <Skeleton className="w-full h-5  rounded-lg my-3"/>
                    <Skeleton className="w-full h-5  rounded-lg my-3"/>
                </div>
                <div className="flex flex-col">
                    <Skeleton className="w-full h-5  rounded-lg my-3"/>
                    <Skeleton className="w-full h-5  rounded-lg my-3"/>
                    <Skeleton className="w-full h-5  rounded-lg my-3"/>
                </div>
            </div>
            <div className="flex bg-gray-50 gap-4 rounded-b-lg items-center justify-end pb-6 pt-4 border-t border-dashed">
                <Skeleton className="w-[131px] h-[48px]  rounded-xl"/>
                <Skeleton className="w-[141px] h-[48px]  rounded-xl"/>
            </div>
        </figure>
    );
};

export default SkeletonAddressCard;
