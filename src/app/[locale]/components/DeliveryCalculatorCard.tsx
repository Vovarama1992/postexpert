'use client';
import React, {useEffect} from 'react';
import {LampChargeIcon} from "@/assets";
import {useTranslationContext} from "@/context";
import {getTarrifsForSite} from "@/lib";
import {useQuery} from "@tanstack/react-query";
import SkeletonTariffCard from "@/components/ui/Skeleton/ui/SkeletonFigures/SkeletonTariffCard";
import {useController, useFormContext, useWatch} from "react-hook-form";
import ParcelTariffCard from "@/app/[locale]/dashboard/parcels/components/Cards/ParcelTariffCard";
import {Slider} from "@nextui-org/react";
import {Swiper, SwiperSlide} from "swiper/react";
import CountryField from "@/components/common/Fields/CountryField";
import {InputCustom} from "@/components/custom";
import {ParcelCard} from "@/components/ui/Card";

const DeliveryCalculatorCard = () => {

    const {locales, getLabelByCode} = useTranslationContext()
    const {
        setValue, setError, clearErrors, formState: {
            errors
        }
    } = useFormContext();

    const country = useWatch({name: 'country'});
    const tariff = useWatch({name: 'tariff'});
    const {
        field: {value: weight, onChange: onChangeValue}
    } = useController({name: 'weight'})

    const {data: tarrifs, isLoading} = useQuery({
        queryKey: ['tarrifs'],
        queryFn: () => getTarrifsForSite(),
    });

    useEffect(() => {
        if (tarrifs?.length) {
            setValue('tariff_id', tarrifs[0].id);
            setValue('tariff', tarrifs[0]);
        }
    }, [tarrifs]);

    useEffect(() => {
        if (tariff) {
            if (tariff.max_weigth < Number(weight)) {
                setError('weight', {
                    type: 'max_weight',
                    message: `${locales.components.ParcelBaseCard.MAX_WEIGHT_MESSAGE} ${tariff.max_weigth} ${locales.components.ParcelBaseCard.WEIGHT_UNIT}`,
                });
            } else {
                if (errors?.weight && errors?.weight?.type === "max_weight") {
                    clearErrors('weight');
                }
            }
        }
    }, [weight, tariff, errors]);

    return (
        <ParcelCard
            className="!p-12 max-lg:!py-14 max-md:!px-0    max-sm:!px-0 max-lg:!rounded-none border-none "
        >
            <div className="flex flex-col gap-6 max-md:container max-md:!px-0">
                <div className="flex flex-col gap-4 max-md:pr-8 max-sm:px-5 max-md:px-8">
                    <span className="text-[18px] font-semibold text-gray-800">{getLabelByCode('WHERE_TO')}</span>
                    <div className="grid grid-cols-2 gap-6">
                        <CountryField isSite/>
                        <InputCustom placeholder={locales.components.ParcelBaseCard.LOCALITY_PLACEHOLDER}
                                     name="locality"/>
                    </div>
                </div>
                <div className="flex flex-col gap-4 max-md:pr-8 max-sm:px-5 max-md:px-8 pb-4">
                        <span
                            className="text-[18px] font-semibold text-gray-800">{getLabelByCode('WEIGHT_CALCULATION')}</span>
                    <div className="flex items-center gap-x-6 gap-y-5 max-sm:flex-col">
                        <Slider
                            aria-label="slider"
                            value={weight} color="primary"
                            onChange={val => onChangeValue(val)}
                            classNames={{
                                track: 'border-s-gray-400',
                                filler: "bg-gray-400", base: 'max-w-[709px] max-xl:max-w-[90%] max-sm:max-w-full',
                                thumb: 'bg-gray-900 !h-8 !w-8'
                            }}
                            step={0.1}
                            maxValue={30}
                            minValue={0}
                        />
                        <div
                            className="h-10 px-3 flex max-sm:w-full max-sm:h-12 items-center justify-center text-[20px] whitespace-nowrap font-semibold leading-normal rounded-xl bg-gray-900 text-white">
                            {weight}
                            {' '}
                            {getLabelByCode('KG')}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full overflow-hidden">
                    <div className="flex items-center gap-2 max-sm:px-5 max-md:px-8">
                        <LampChargeIcon className="text-gray-800"/>
                        <span className="text-small-4 font-medium text-gray-800">
                        {getLabelByCode('ONE_TARIFF')}
                    </span>
                    </div>
                    {isLoading ? (
                        <div className="grid grid-cols-tarrifs gap-4 items-stretch max-xl:grid-cols-2">
                            {Array(3).fill(null).map((_, index) => (
                                <SkeletonTariffCard isSite key={index}/>
                            ))}
                        </div>
                    ) : (
                        <div
                            className="md:grid grid-cols-tarrifs gap-6 max-lg:gap-4 hidden items-stretch max-xl:grid-cols-2">
                            {tarrifs?.length ? tarrifs.map((tarrif) => (
                                <ParcelTariffCard isSite key={tarrif.id} card={tarrif}/>
                            )) : null}
                        </div>
                    )}
                    <div className="flex md:hidden !ml-0">
                        <Swiper
                            breakpoints={{
                                0: {
                                    spaceBetween: 16,
                                    slidesOffsetAfter: 20,
                                    slidesOffsetBefore: 20,
                                    slidesPerView: 1.2
                                },
                                640: {
                                    spaceBetween: 16,
                                    slidesOffsetAfter: 32,
                                    slidesOffsetBefore: 32,
                                    slidesPerView: 1.8
                                },
                            }}
                        >
                            {tarrifs?.length ? tarrifs.map((tarrif) => (
                                <SwiperSlide key={tarrif.id}>
                                    <ParcelTariffCard isSite card={tarrif}/>
                                </SwiperSlide>
                            )) : null}
                        </Swiper>
                    </div>
                </div>
                <div className="flex items-center gap-2 max-sm:px-5 max-md:px-8">
                    <LampChargeIcon className="text-gray-800"/>
                    <span className="text-small-4 font-medium text-gray-800">
                        {getLabelByCode('DELIVERY_COST_TO')} {country?.name ?? '...'}
                    </span>
                </div>
            </div>
        </ParcelCard>
    );
};

export default DeliveryCalculatorCard;
