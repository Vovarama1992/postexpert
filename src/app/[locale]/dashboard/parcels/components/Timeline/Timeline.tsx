'use client'
import React, {useRef} from 'react';
import {classNames} from "@/utils";
import {StepsEnum, useTranslationContext} from "@/context";
import {useQueryState} from "nuqs";
import {Link} from "@/navigation";
import SwiperCore from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";

interface TimelineProps {
    step: string;
    steps: Record<StepsEnum, boolean>
}

const Timeline = ({step: activeStep, steps}: TimelineProps) => {

    const {locales} = useTranslationContext()
    const [parcelId] = useQueryState('parcelId')
    const swiperRef = useRef<SwiperCore>();

    const activeIndex = locales.data.steps.findIndex((step: { value: string; }) => step.value === activeStep);

    const firstStepComplete = steps[StepsEnum.created];
    const secondStepComplete = steps[StepsEnum.content];
    const viewMode = steps[StepsEnum.tracking];

    const progress = {
        "created": firstStepComplete,
        "content": secondStepComplete || firstStepComplete,
        "tracking": secondStepComplete,
    }

    const links = {
        'created': '/dashboard/parcels/create',
        'content': '/dashboard/parcels/create/second-step',
        'tracking': '/dashboard/parcels/create/third-step'
    }

    return (
        <>
            <nav className="flex-1 w-full lg:max-w-[764px] flex max-md:hidden ">
                <ol role="list" className="flex items-center w-full   ">
                    {locales.data.steps.map((step: any, stepIdx: number) => {

                        const hasHref = progress[step.value as keyof typeof progress];
                        const link = links[step.value as keyof typeof links];

                        const completeCreated = steps.created && step.value === 'created'
                        const completeContent = steps.content && step.value === 'content'

                        return (
                            <li key={stepIdx} className={classNames(' flex flex-col gap-4 relative flex-1 ', {}, [])}>
                                <div className="relative">
                                    <div className="absolute inset-0 left-9  flex items-center" aria-hidden="true">
                                        <div className={
                                            classNames("h-1 w-full rounded-[2px] mr-1", {
                                                "bg-indigo-600": (stepIdx < activeIndex) || activeStep === 'complete' || completeCreated || completeContent,
                                                "bg-gray-200": stepIdx >= activeIndex,
                                            }, [])
                                        }/>
                                    </div>
                                    <Link
                                        // @ts-ignore
                                        href={`${link}?parcelId=${parcelId}`}
                                        onClick={e => {
                                            if (!hasHref || viewMode) e.preventDefault()
                                        }}
                                        className={
                                            classNames("relative flex size-8 items-center justify-center rounded-full  ", {
                                                "outline-1 outline outline-indigo-600 bg-white": (stepIdx !== activeIndex) && (activeStep === 'complete' || completeContent || completeCreated),
                                                "bg-indigo-600 outline-1 outline outline-indigo-600 outline-offset-2": stepIdx === activeIndex ,
                                                "bg-gray-200": stepIdx > activeIndex,
                                            })
                                        }
                                        aria-current="step"
                                    >
                                    <span className={
                                        classNames("text-[12px] font-semibold", {
                                            "text-white": stepIdx === activeIndex ,
                                            "!text-gray-700": (stepIdx !== activeIndex) && (activeStep === 'complete' || (completeCreated || completeContent)),
                                        }, [])
                                    }>
                                        {stepIdx + 1}
                                    </span>
                                    </Link>
                                </div>
                                <Link
                                    // @ts-ignore
                                    href={`${link}?parcelId=${parcelId}`} onClick={e => {
                                    if (!hasHref || viewMode) e.preventDefault()
                                }} className={
                                    classNames(
                                        "text-small tracking-[-0.5px] font-medium",
                                        {
                                            'text-gray-500': stepIdx >= activeIndex,
                                            'text-gray-800 ': (stepIdx < activeIndex) || activeStep === 'complete' || (completeCreated || completeContent)
                                        }
                                    )
                                }>{step.label}</Link>
                            </li>
                        )
                    })}
                    <li className=" self-start">
                        <a
                            href="#"
                            className={
                                classNames("relative flex size-8 items-center justify-center rounded-full", {
                                    "bg-gray-300": activeStep !== 'complete',
                                    "bg-indigo-600": activeStep === 'complete',
                                })
                            }
                            aria-current="step"
                        >
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.25 4.00097L3.74706 6.49802L8.75 1.50391" stroke="white" strokeWidth="2"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>
                    </li>
                </ol>
            </nav>
            <div className=" max-sm:py-1.5 h-[73px] hidden max-md:flex ">
                <div
                    className="w-full overflow-hidden  h-auto py-[1px] absolute left-0 right-0 bg-white z-[20] hidden max-md:flex">
                    <Swiper
                        initialSlide={activeIndex === 0 ? 0 : activeIndex - 1}
                        onSwiper={(swiper: SwiperCore) => {
                            swiperRef.current = swiper;
                        }}
                        className="!mx-0  !py-[3px]"
                        breakpoints={
                            {
                                0: {
                                    slidesPerView: 2,
                                    slidesOffsetBefore: 20,
                                    slidesOffsetAfter: 20,
                                },
                                640: {
                                    slidesPerView: 2.8,
                                    slidesOffsetBefore: 32,
                                    slidesOffsetAfter: 32,
                                },
                            }
                        }
                    >
                        {locales.data.steps.map((step: any, stepIdx: number) => {

                            const hasHref = progress[step.value as keyof typeof progress];
                            const link = links[step.value as keyof typeof links];

                            const completeCreated = steps.created && step.value === 'created'
                            const completeContent = steps.content && step.value === 'content'

                            return (
                                <SwiperSlide key={stepIdx}>
                                    <li className={classNames(' flex flex-col gap-4 relative flex-1 ', {}, [])}>
                                        <div className="relative max-lg:p-[1px]">
                                            <div className="absolute inset-0 left-9  flex items-center"
                                                 aria-hidden="true">
                                                <div className={
                                                    classNames("h-1 w-full rounded-[2px] mr-1", {
                                                        "bg-indigo-600": (stepIdx < activeIndex) || activeStep === 'complete' || completeCreated || completeContent,
                                                        "bg-gray-200": stepIdx >= activeIndex,
                                                    }, [])
                                                }/>
                                            </div>
                                            <Link
                                                // @ts-ignore
                                                href={`${link}?parcelId=${parcelId}`}
                                                onClick={e => {
                                                    if (!hasHref || viewMode) e.preventDefault()
                                                }}
                                                className={
                                                    classNames("relative flex size-8 items-center justify-center rounded-full  ", {
                                                        "outline-1 outline outline-indigo-600 bg-white": (stepIdx !== activeIndex) && (activeStep === 'complete' || completeContent || completeCreated),
                                                        "bg-indigo-600 outline-1 outline outline-indigo-600 outline-offset-2": stepIdx === activeIndex ,
                                                        "bg-gray-200": stepIdx > activeIndex,
                                                    })
                                                }
                                                aria-current="step"
                                            >
                                    <span className={
                                        classNames("text-[12px] font-semibold", {
                                            "text-white": stepIdx === activeIndex ,
                                            "!text-gray-700": (stepIdx !== activeIndex) && (activeStep === 'complete' || (completeCreated || completeContent)),
                                        }, [])
                                    }>
                                        {stepIdx + 1}
                                    </span>
                                            </Link>
                                        </div>
                                        <Link
                                            // @ts-ignore
                                            href={`${link}?parcelId=${parcelId}`} onClick={e => {
                                            if (!hasHref || viewMode) e.preventDefault()
                                        }} className={
                                            classNames(
                                                "text-small tracking-[-0.5px] font-medium",
                                                {
                                                    'text-gray-500': stepIdx >= activeIndex,
                                                    'text-gray-800 ': (stepIdx < activeIndex) || activeStep === 'complete' || (completeCreated || completeContent)
                                                }
                                            )
                                        }>{step.label}</Link>
                                    </li>
                                </SwiperSlide>
                            )
                        })}
                        <SwiperSlide>
                            <li className=" self-start">
                                <a
                                    href="#"
                                    className={
                                        classNames("relative flex size-8 items-center justify-center rounded-full", {
                                            "bg-gray-300": activeStep !== 'complete',
                                            "bg-indigo-600": activeStep === 'complete',
                                        })
                                    }
                                    aria-current="step"
                                >
                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.25 4.00097L3.74706 6.49802L8.75 1.50391" stroke="white"
                                              strokeWidth="2"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </a>
                            </li>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default Timeline;
