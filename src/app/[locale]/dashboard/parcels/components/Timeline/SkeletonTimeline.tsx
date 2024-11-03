'use client'
import React from 'react';
import {classNames} from "@/utils";
import {Skeleton} from "@nextui-org/skeleton";
import {useTranslationContext} from "@/context";

const SkeletonTimeline = () => {

    const {locales} = useTranslationContext()

    return (
        <nav className="mb-10">
            <ol role="list" className="flex items-center xl:w-[55%]">
                {locales.data.steps.map((_: any, stepIdx: React.Key | null | undefined) => (
                    <li key={stepIdx} className={classNames(' space-y-4 relative flex-1 ', {}, [])}>
                        <div className="relative">
                            <div className="absolute inset-0 left-9  flex items-center" aria-hidden="true">
                                <Skeleton className={
                                    classNames("h-1 w-full  mr-1")
                                }/>
                            </div>
                            <Skeleton
                                className={
                                    classNames("relative flex size-8 items-center justify-center rounded-full  ")
                                }
                            >
                            </Skeleton>
                        </div>
                        <Skeleton className={
                            'h-5 w-20'
                        }/>
                    </li>
                ))}
                <li className=" self-start">
                    <Skeleton
                        className={
                            classNames("relative flex size-8 items-center justify-center rounded-full", {
                            })
                        }
                        aria-current="step"
                    />
                </li>
            </ol>
        </nav>
    );
};

export default SkeletonTimeline;
