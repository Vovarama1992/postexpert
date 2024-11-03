'use client'
import React, {useRef} from 'react';
import {Avatar} from "@nextui-org/avatar";
import {ChevronIcon} from "@/assets";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import {Review} from "@/types/main";
import {IconButton} from "@/components/custom";

const SliderReview = ({reviews}: {reviews: Review[]}) => {

    const swiperRef = useRef<SwiperCore>();

    return (
        <div className="flex flex-col gap-16 items-center mt-12 w-full max-sm:mt-10">
            <Swiper
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                className="w-full " spaceBetween={64}
                breakpoints={{
                    0: {
                        slidesOffsetAfter: 20,
                        slidesOffsetBefore: 20,
                        slidesPerView: 1.4
                    },
                    640: {
                        slidesOffsetAfter: 32,
                        slidesOffsetBefore: 32,
                        slidesPerView: 1.6
                    },
                    768: {
                        slidesOffsetAfter: 40,
                        slidesOffsetBefore: 40,
                        slidesPerView: 1.8
                    },
                    1023: {
                        slidesPerView: 2.1
                    },
                    1280: {
                        slidesPerView: 2.5
                    }
                }}
            >
                {
                    reviews.map((review, index) => (
                        <SwiperSlide key={index} className="max-w-[500px]">
                            <div className="flex items-center gap-16">
                                <div className="space-y-10">
                                    <p className="text-site-text-3 text-white text-left">{
                                        review.text
                                    }</p>
                                    <div className="flex items-center gap-6">
                                        <Avatar src={review.avatar} className="h-14 min-w-14" />
                                        <div className="space-y-1">
                                            <div className="text-base font-medium text-white max-md:text-left">
                                                {review.name}
                                            </div>
                                            <div className="text-base font-medium text-white/70 max-md:text-left">
                                                {review.delivery}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <div className="flex gap-3 justify-center mt-4">
                <IconButton onClick={() => swiperRef.current?.slidePrev()} iconClassName="!size-[12px] rotate-180 " className="!h-10 !w-10 !rounded-lg !bg-BG !border-white/20 text-white" icon={ChevronIcon} />
                <IconButton onClick={() => swiperRef.current?.slideNext()} iconClassName="!size-[12px] " className="!h-10 !w-10 !rounded-lg !bg-BG !border-white/20 text-white" icon={ChevronIcon} />
            </div>
        </div>
    );
};

export default SliderReview;
