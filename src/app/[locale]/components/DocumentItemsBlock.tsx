'use client'; // Указываем, что компонент рендерится на клиенте

import React from 'react';
import { Step } from "@/types/main";
import { Swiper, SwiperSlide } from 'swiper/react';

const DocumentItemsBlock = ({ steps }: { steps: Step[] }) => {
    return (
        <div className="mt-[72px] xl:container max-lg:mt-16">
            {/* Карусель для max-xl экранов */}
            <div className="hidden max-xl:block">
                <Swiper
                    breakpoints={{
                        0: {
                            spaceBetween: 16,
                            slidesOffsetAfter: 20,
                            slidesOffsetBefore: 20,
                            slidesPerView: 1.2
                        },
                        640: {
                            spaceBetween: 24,
                            slidesOffsetAfter: 32,
                            slidesOffsetBefore: 32,
                            slidesPerView: 1.6
                        },
                        768: {
                            spaceBetween: 32,
                            slidesOffsetAfter: 40,
                            slidesOffsetBefore: 40,
                            slidesPerView: 1.8
                        },
                        1023: {
                            spaceBetween: 40,
                            slidesOffsetAfter: 48,
                            slidesOffsetBefore: 48,
                            slidesPerView: 2.5
                        }
                    }}
                >
                    {steps.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col gap-8 items-center">
                                {index === 1 ? (
                                    <div className="size-14 max-xl:size-12 rounded-full bg-amber-400 flex items-center justify-center text-base text-gray-950 font-semibold">
                                        2
                                    </div>
                                ) : (
                                    <div className="size-14 max-xl:size-12 rounded-full bg-white/10 flex items-center justify-center text-base text-white font-semibold">
                                        {index + 1}
                                    </div>
                                )}
                                <div className="flex flex-col gap-6 items-center">
                                    <h6 className="text-site-sub-title-1 text-white">{item.title}</h6>
                                    <p className="text-site-text-1 text-white/90 text-center max-w-[416px]">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Статичный блок для xl экранов */}
            <div className="hidden xl:flex gap-10">
                {steps.map((item, index) => (
                    <div key={index} className="flex flex-col gap-8 items-center basis-1/3">
                        {index === 1 ? (
                            <div className="size-14 rounded-full bg-amber-400 flex items-center justify-center text-base text-gray-950 font-semibold">
                                2
                            </div>
                        ) : (
                            <div className="size-14 rounded-full bg-white/10 flex items-center justify-center text-base text-white font-semibold">
                                {index + 1}
                            </div>
                        )}
                        <div className="flex flex-col gap-6 items-center">
                            <h6 className="text-site-sub-title-1 text-white">{item.title}</h6>
                            <p className="text-site-text-1 text-white/90 text-center max-w-[416px]">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DocumentItemsBlock;
