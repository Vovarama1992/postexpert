import React from 'react';
import {Skeleton} from "@nextui-org/skeleton";
import {LampChargeIcon, RoutingIcon, TourIcon} from "@/assets";
import {Button} from "@nextui-org/button";
import {ParcelCard} from "@/components/ui/Card";

const SkeletonContentLeft = () => {
    return (
        <ParcelCard
            className="xl:w-2/3"
            right={
                <Button isIconOnly type="button" variant="light">
                    <TourIcon />
                </Button>
            }
            icon={RoutingIcon}
            title={<Skeleton className="w-32 h-6" />}
        >
            <div className="flex flex-col gap-6 mt-6">
                <div className="flex flex-col gap-2">
                    <Skeleton className="w-24 h-5" />
                    <div className="side-over-row grid-cols-3">
                        <Skeleton className="w-full h-14 rounded-xl" />
                        <Skeleton className="w-full h-14 rounded-xl" />
                        <Skeleton className="w-full h-14 rounded-xl" />
                    </div>
                </div>
                <div id="my-first-step" className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-32 h-5" />
                        <Skeleton className="w-6 h-6 rounded-full" />
                    </div>
                    <Skeleton className="w-full h-14 rounded-xl" />
                </div>
                <div className="flex flex-col gap-2">
                    <Skeleton className="w-32 h-5" />
                    <div className="grid grid-cols-tarrifs gap-4 items-stretch max-xl:grid-cols-2">
                        {Array(3).fill(null).map((_, index) => (
                            <Skeleton key={index} className="w-full h-[172px] rounded-2xl" />
                        ))}
                    </div>
                </div>
                <div id="my-other-step" className="flex items-center gap-2">
                    <LampChargeIcon className="text-gray-800" />
                    <Skeleton className="w-full h-5" />
                </div>
            </div>
        </ParcelCard>
    );
};

export default SkeletonContentLeft;
