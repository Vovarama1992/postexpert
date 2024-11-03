import React from 'react';
import {Skeleton} from "@nextui-org/skeleton";
import {classNames} from "@/utils";

const SkeletonProfileCard = ({className}: { className?: string }) => {
    return (
        <figure className={
            classNames(
                "border-card h-[459px]",
                {},
                [className]
            )
        }>
            <div className="flex items-center justify-between">
                <Skeleton className=" w-[202px] h-6 rounded-lg  "/>
                <Skeleton className=" size-10  rounded-lg  "/>
            </div>
            <div className="card-avatar">
                <Skeleton className=" size-24  rounded-xl  "/>
                <div className="flex flex-col gap-2 items-start">
                    <Skeleton className=" w-[101px] h-[48px]  rounded-lg  "/>
                    <Skeleton className=" w-[252px] h-5  rounded-lg  "/>
                </div>
            </div>
            <div className="flex flex-col mt-6 flex-1 ">
                <Skeleton className="w-[300px] h-5  rounded-lg my-3 "/>
                <Skeleton className="w-[300px] h-5  rounded-lg my-3"/>
                <Skeleton className="w-[300px] h-5  rounded-lg my-3"/>
            </div>
            <div className="flex bg-gray-50 gap-4 rounded-b-lg items-center justify-end pb-6 pt-4 border-t border-dashed">
                <Skeleton className="w-[141px] h-[48px]  rounded-xl"/>
            </div>
        </figure>
    );
};

export default SkeletonProfileCard;
