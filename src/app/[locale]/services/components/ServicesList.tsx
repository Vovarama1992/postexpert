'use client';
import React, {useRef} from 'react';
import ServiceTariffsCard from "@/app/[locale]/services/components/ServiceTariffsCard";
import {Tariffs} from "@/types/service";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore from "swiper";

const ServicesList = ({tarrifs}: {tarrifs: Tariffs}) => {

    const swiperRef = useRef<SwiperCore>();

    return (
        <div className="max-xl:px-0 container">
            <div className="w-full gap-6 flex items-center max-xl:hidden">
                <ServiceTariffsCard type="document" index={0} tariff={tarrifs.document}/>
                <ServiceTariffsCard type="regular" index={1} tariff={tarrifs.regular}/>
                <ServiceTariffsCard type="express" index={2} tariff={tarrifs.express}/>
            </div>
            <div className="w-full max-xl:flex hidden">
                <Swiper
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    className="w-full "
                    breakpoints={{
                        0: {
                            slidesOffsetAfter: 20,
                            slidesOffsetBefore: 20,
                            slidesPerView: 1,
                            spaceBetween: 16
                        },
                        640: {
                            slidesOffsetAfter: 32,
                            slidesOffsetBefore: 32,
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        768: {
                            slidesOffsetAfter: 40,
                            slidesOffsetBefore: 40,
                            slidesPerView: 1.8,
                            spaceBetween: 20
                        },
                        1023: {
                            slidesPerView: 2.5,
                            slidesOffsetAfter: 48,
                            slidesOffsetBefore: 48,
                            spaceBetween: 20
                        },
                        1280: {
                            slidesPerView: 2.5,
                            slidesOffsetAfter: 56,
                            slidesOffsetBefore: 56,
                            spaceBetween: 20
                        }
                    }}
                >
                    <SwiperSlide className="max-sm:!max-w-[400px]"><ServiceTariffsCard type="document" index={0} tariff={tarrifs.document}/></SwiperSlide>
                    <SwiperSlide className="max-sm:!max-w-[400px]"><ServiceTariffsCard type="regular" index={1} tariff={tarrifs.regular}/></SwiperSlide>
                    <SwiperSlide className="max-sm:!max-w-[400px]" ><ServiceTariffsCard type="express" index={2} tariff={tarrifs.express}/></SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default ServicesList;