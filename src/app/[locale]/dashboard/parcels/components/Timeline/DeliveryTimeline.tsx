'use client'
import React from 'react';
import {classNames} from "@/utils";
import {Swiper, SwiperSlide} from "swiper/react";
import useStatusStore from "@/store/statusesStore";

interface DeliveryTimelineProps {
    step: string;
}

const steps = [
    'delivered_to_warehouse', 'sent_to_recipient', 'delivered_to_recipient'
]

const DeliveryTimeline = ({step: activeStep}: DeliveryTimelineProps) => {

    const status = activeStep

    const activeIndex = steps.findIndex((step) => step === activeStep);

    const statuses = useStatusStore(state => state.statuses)

    const progress = {
        "delivered_to_warehouse":  status === 'delivered_to_recipient' || status === 'delivered_to_warehouse' || status === 'sent_to_recipient',
        "sent_to_recipient": status === 'delivered_to_recipient' || status === 'sent_to_recipient',
        "delivered_to_recipient": status === 'delivered_to_recipient',
    }

    return (
        <>
            <nav className="flex-1 w-full  flex max-md:hidden ">
                <ol role="list" className="flex items-center w-full   ">
                    {steps.map((step: any, stepIdx: number) => {

                        const completeDelivered_to_warehouse = progress.delivered_to_warehouse && step === 'delivered_to_warehouse'
                        const completeSent_to_recipient = progress.sent_to_recipient && step === 'sent_to_recipient'
                        const completeDelivered_to_recipient = progress.delivered_to_recipient && step === 'delivered_to_recipient'

                        const completed = completeDelivered_to_warehouse || completeSent_to_recipient || completeDelivered_to_recipient

                        return (
                            <li key={stepIdx} className={classNames(' flex flex-col gap-4 relative flex-1 ', {}, [])}>
                                <div className="relative">
                                    <div className="absolute inset-0 left-9  flex items-center" aria-hidden="true">
                                        <div className={
                                            classNames("h-1 w-full  mr-1", {
                                                "bg-indigo-600": (stepIdx < activeIndex) || progress.delivered_to_recipient,
                                                "bg-gray-200": stepIdx >= activeIndex && !progress.delivered_to_recipient,
                                            }, [])
                                        }/>
                                    </div>
                                    <div
                                        className={
                                            classNames("relative flex size-8 items-center justify-center rounded-full  ", {
                                                "outline-1 outline outline-indigo-600 bg-white": ((stepIdx !== activeIndex) && completed) || progress.delivered_to_recipient,
                                                "bg-indigo-600 outline-1 outline outline-indigo-600 outline-offset-2": stepIdx === activeIndex && !progress.delivered_to_recipient ,
                                                "bg-gray-200": stepIdx > activeIndex,
                                            })
                                        }
                                        aria-current="step"
                                    >
                                    <span className={
                                        classNames("text-[12px] font-semibold", {
                                            "text-white": stepIdx === activeIndex && !progress.delivered_to_recipient ,
                                            "!text-gray-700": ((stepIdx !== activeIndex) && completed) || progress.delivered_to_recipient,
                                        }, [])
                                    }>
                                        {stepIdx + 1}
                                    </span>
                                    </div>
                                </div>
                                <div className={
                                    classNames(
                                        "text-small tracking-[-0.5px] font-medium",
                                        {
                                            'text-gray-500': stepIdx >= activeIndex || progress.delivered_to_recipient,
                                            'text-gray-800 ': ((stepIdx < activeIndex) || completed) && !progress.delivered_to_recipient
                                        }
                                    )
                                }>{
                                    statuses.find(el => el.code === step)?.title
                                }</div>
                            </li>
                        )
                    })}
                    <li className=" self-start">
                        <a
                            href="#"
                            className={
                                classNames("relative flex size-8 items-center justify-center rounded-full", {
                                    "bg-gray-300": !progress.delivered_to_recipient,
                                    "bg-indigo-600": progress.delivered_to_recipient,
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
            <div className="h-[71px] hidden max-md:flex ">
                <div
                    className="w-full overflow-hidden h-[71px]  absolute left-0 right-0 bg-white z-[20] hidden max-md:flex">
                    <Swiper
                        initialSlide={activeIndex === 0 ? 0 : activeIndex - 1}
                        className="!mx-0  !py-[3px]"
                        breakpoints={
                            {
                                0: {
                                    slidesPerView: 2,
                                    slidesOffsetBefore: 20,
                                },
                                640: {
                                    slidesPerView: 2.8,
                                    slidesOffsetBefore: 32,
                                },
                            }
                        }
                    >
                        {steps.map((step: any, stepIdx: number) => {

                            const completeDelivered_to_warehouse = progress.delivered_to_warehouse && step === 'delivered_to_warehouse'
                            const completeSent_to_recipient = progress.sent_to_recipient && step === 'sent_to_recipient'
                            const completeDelivered_to_recipient = progress.delivered_to_recipient && step === 'delivered_to_recipient'

                            const completed = completeDelivered_to_warehouse || completeSent_to_recipient || completeDelivered_to_recipient

                            return (
                                <SwiperSlide key={stepIdx}>
                                    <li className={classNames(' flex flex-col gap-4 relative flex-1 ', {}, [])}>
                                        <div className="relative max-lg:p-[1px]">
                                            <div className="absolute inset-0 left-9  flex items-center"
                                                 aria-hidden="true">
                                                <div className={
                                                    classNames("h-1 w-full  mr-1", {
                                                        "bg-indigo-600": (stepIdx < activeIndex) || progress.delivered_to_recipient,
                                                        "bg-gray-200": stepIdx >= activeIndex && !progress.delivered_to_recipient,
                                                    }, [])
                                                }/>
                                            </div>
                                            <div
                                                className={
                                                    classNames("relative flex size-8 items-center justify-center rounded-full  ", {
                                                        "outline-1 outline outline-indigo-600 bg-white": ((stepIdx !== activeIndex) && completed) || progress.delivered_to_recipient,
                                                        "bg-indigo-600 outline-1 outline outline-indigo-600 outline-offset-2": stepIdx === activeIndex && !progress.delivered_to_recipient ,
                                                        "bg-gray-200": stepIdx > activeIndex,
                                                    })
                                                }
                                                aria-current="step"
                                            >
                                    <span className={
                                        classNames("text-[12px] font-semibold", {
                                            "text-white": stepIdx === activeIndex && !progress.delivered_to_recipient ,
                                            "!text-gray-700": ((stepIdx !== activeIndex) && completed) || progress.delivered_to_recipient,
                                        }, [])
                                    }>
                                        {stepIdx + 1}
                                    </span>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                classNames(
                                                    "text-small tracking-[-0.5px] font-medium",
                                                    {
                                                        'text-gray-500': stepIdx >= activeIndex,
                                                        'text-gray-800 ': (stepIdx < activeIndex) || completed
                                                    }
                                                )
                                            }>{
                                            statuses.find(el => el.code === step)?.title
                                        }</div>
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
                                            "bg-gray-300": !progress.delivered_to_recipient,
                                            "bg-indigo-600": progress.delivered_to_recipient,
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

export default DeliveryTimeline;
