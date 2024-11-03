'use client';
import React, { useEffect } from 'react';
import { LampChargeIcon, RoutingIcon, TourIcon } from "@/assets";
import InfoCustom from "@/components/custom/Info/InfoCustom";
import {useAuthContext, useParcelContext, useTranslationContext} from "@/context";
import { getTarrifs } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import SkeletonTariffCard from "@/components/ui/Skeleton/ui/SkeletonFigures/SkeletonTariffCard";
import { Button } from "@nextui-org/button";
import { useFormContext, useWatch } from "react-hook-form";
import { useTour } from "@reactour/tour";
import ParcelTariffCard from "../Cards/ParcelTariffCard";
import {Swiper, SwiperSlide} from "swiper/react";
import {useSearchParams} from "next/navigation";
import CountryField from "@/components/common/Fields/CountryField";
import WarehouseField from "@/components/common/Fields/WarehouseField";
import {InputCustom} from "@/components/custom";
import { ParcelCard } from '@/components/ui/Card';

const ParcelBaseCard = () => {

    const {locales, getLabelByCode} = useTranslationContext()
    const { setIsOpen, isOpen } = useTour();
    const { session } = useAuthContext();
    const parcelContext = useParcelContext();
    const {
        setValue, setError, clearErrors, formState: {
            errors
        }
    } = useFormContext();

    const searchParams = useSearchParams()

    const warehouse = useWatch({ name: 'warehouse' });
    const warehouse_id = useWatch({ name: 'warehouse_id' });
    const country = useWatch({ name: 'country' });
    const weight = useWatch({ name: 'weight' });
    const tariff = useWatch({ name: 'tariff' });

    const { data: tarrifs, isLoading } = useQuery({
        queryKey: ['tarrifs-warehouse', warehouse_id],
        queryFn: () => getTarrifs(warehouse_id),
        enabled: !!session,
    });

    useEffect(() => {
            if (tarrifs?.length && !tariff) {
                setValue('tariff_id', tarrifs[0].id);
                setValue('tariff', tarrifs[0]);
            }
    }, [tarrifs, tariff]);

    useEffect(() => {
        if (searchParams.get('country_id') && tarrifs?.length) {
            setValue('country_id', Number(searchParams.get('country_id')));
            setValue('locality', searchParams.get('locality'));
            setValue('tariff_id', Number(searchParams.get('tariff_id')));
            setValue('tariff', tarrifs.find(t => t.id === Number(searchParams.get('tariff_id'))));
            setValue('weight', searchParams.get('weight'));
        }
        }, [searchParams, tarrifs]);

    useEffect(() => {
        if (tariff) {
            if (tariff.max_weigth < Number(weight)) {
                setError('weight', {
                    type: 'max_weight',
                    message: getLabelByCode('EXCEEDED_WEIGHT_TARIFF'),
                });
            } else {
                if (errors?.weight && errors?.weight?.type === "max_weight" && tariff.max_weigth >= Number(weight)) {
                    clearErrors('weight');
                }
            }
        }
    }, [weight, tariff, errors]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'inherit';
        }
    }, [isOpen]);

    return (
        <ParcelCard
            id="delivery"
            right={
                <Button onClick={() => setIsOpen(true)} isIconOnly type="button" variant="light">
                    <TourIcon />
                </Button>
            }
            icon={RoutingIcon}
            title={`${locales.components.ParcelBaseCard.TITLE} ${parcelContext?.parcel?.title}`}
        >
            <div className="flex flex-col gap-6 mt-6">
                <div className="flex flex-col gap-2">
                    <span className="text-normal font-semibold text-gray-800">{getLabelByCode('DESTINATION')}</span>
                    <div className="parcel-row">
                        <CountryField />
                        <InputCustom label={getLabelByCode('LOCALITY')}
                                     labelPlacement="inside"
                                      name="locality" />
                        <InputCustom
                            placeholder={locales.components.ParcelBaseCard.WEIGHT_PLACEHOLDER}
                            type="number"
                            step={0.1}
                            endContent={
                                <div className="top-1/2 transform -translate-y-1/2 absolute right-2">
                                    <span className="text-base font-medium text-gray-900">{getLabelByCode('KG')}</span>
                                </div>
                            }
                            name="weight"
                        />
                    </div>
                </div>
                <div id="my-first-step" className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-normal font-semibold text-gray-800">{locales.components.ParcelBaseCard.PICKUP_POINT}</span>
                        <InfoCustom content={getLabelByCode('ParcelBaseCard_HELPER')} />
                    </div>
                    <WarehouseField />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-normal font-semibold text-gray-800">{getLabelByCode('SELECT_TARIFF')}</span>
                    {isLoading ? (
                        <div className="grid grid-cols-tarrifs gap-4 items-stretch max-xl:grid-cols-2">
                            {Array(3).fill(null).map((_, index) => (
                                <SkeletonTariffCard key={index} />
                            ))}
                        </div>
                    ) : (
                        <div id={"tariff-list"} className=" lg:grid hidden grid-cols-3 gap-4 items-stretch ">
                            {tarrifs?.length ? tarrifs.map((tarrif) => (
                                <ParcelTariffCard key={tarrif.id} card={tarrif} />
                            )) : null}
                        </div>
                    )}
                    <div className="flex lg:hidden -mx-8 max-md:-mx-6 max-sm:-mx-5">
                        <Swiper
                            breakpoints={{
                                0: {
                                    spaceBetween: 12,
                                    slidesOffsetAfter: 20,
                                    slidesOffsetBefore: 20,
                                    slidesPerView: 1.2
                                },
                                640: {
                                    spaceBetween: 12,
                                    slidesOffsetAfter: 32,
                                    slidesOffsetBefore: 32,
                                    slidesPerView: 2.4
                                },
                                768: {
                                    spaceBetween: 16,
                                    slidesOffsetAfter: 32,
                                    slidesOffsetBefore: 32,
                                    slidesPerView: 2.3,
                                },
                            }}
                        >
                            {tarrifs?.length ? tarrifs.map((tarrif) => (
                                <SwiperSlide  key={tarrif.id}>
                                    <ParcelTariffCard key={tarrif.id} card={tarrif}/>
                                </SwiperSlide>
                            )) : null}
                        </Swiper>
                    </div>
                </div>
                <div id="my-other-step" className="flex items-center gap-2">
                    <LampChargeIcon className="text-gray-800" />
                    <span className="text-small-4 font-medium text-gray-800">
                        {getLabelByCode('DELIVERY_COST_TO')} {warehouse?.title ?? '...'} {locales.components.ParcelBaseCard.TO} {country?.name ?? '...'}
                    </span>
                </div>
            </div>
        </ParcelCard>
    );
};

export default ParcelBaseCard;
