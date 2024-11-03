import React from 'react';
import {Skeleton} from "@nextui-org/skeleton";
import {classNames} from "@/utils";

const SkeletonTariffCard = ({className, isSite}: { className?: string, isSite?: boolean }) => {
    return (
        <figure className={
            classNames(
                'flex flex-col cursor-pointer rounded-2xl !p-6 pb-[18px] transition-colors group  ' +
                'bg-white  ' +
                ' w-full !max-w-full border-white border ',
                {
                    'h-[172px]': !isSite,
                    'h-[234px]': isSite,
                },
                [className]
            )
        }>
            <div className="flex items-center justify-between">
                <Skeleton className=" w-[152px] h-7 rounded-lg  "/>
                <Skeleton className=" size-5  rounded-lg  "/>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <Skeleton className=" w-[74px] h-7 rounded-lg  "/>
                <Skeleton className=" w-[70px] h-[18px] rounded-lg  "/>
            </div>
            <Skeleton className="h-[22px] rounded-lg w-full mt-auto"/>
        </figure>
    );
};

export default SkeletonTariffCard;
