'use client';

import React, { memo, useMemo } from 'react';
import { TarrifType } from "@/types";
import { Checkbox } from "@nextui-org/checkbox";
import { classNames } from "@/utils";
import { useController, useFormContext, useWatch } from "react-hook-form";
import { DocumentIcon, ExpressDeliveryIcon, StandardDeliveryIcon } from "@/assets";
import InfoCustom from "@/components/custom/Info/InfoCustom";
import { useTranslationContext } from "@/context";
import { twMerge } from "tailwind-merge";
import {useRouter} from "@/navigation";
import {useSession} from "next-auth/react";

interface ParcelTariffCardProps {
    card: TarrifType;
    isSite?: boolean;
}

const ParcelTariffCard = ({ card, isSite }: ParcelTariffCardProps) => {
    const { locales } = useTranslationContext();
    const { field } = useController({ name: 'tariff_id' });
    const { setValue, getValues } = useFormContext();
    const router = useRouter()
    const session = useSession()
    const weight = useWatch({ name: 'weight' });
    const tariff_id = useWatch({ name: 'tariff_id' });

    const isSelected = isSite ? false : Boolean(card.id === field.value);
    const onValueChange = (val: boolean) => {

        if (isSite) {
            if (!session?.data) {
                router.push('/register')
            } else {

                const {
                    country_id, locality, weight
                } = getValues()

                router.push( {
                    pathname: '/dashboard/parcels/create',
                    query: {
                        country_id,
                        tariff_id: card.id,
                        locality: locality ?? '',
                        weight: weight ?? 1
                    }
                })
            }
        } else {
            if (val) {
                field.onChange(card.id);
                setValue('tariff', card);
            }
        }

    };

    const currentPrice = useMemo(() => {
        const priceInfo = card.prices.find(el => el.weight === Math.ceil(Number(weight)) && el.tariff_id === card.id);
        return priceInfo ? priceInfo.price.toFixed(isSite ? 0 : 2) : '--';
    }, [weight, card, isSite, tariff_id]);

    const getIcon = (key: string) => {
        switch (key) {
            case 'express':
                return <ExpressDeliveryIcon className={isSite ? 'h-6 w-6' : ''} />;
            case 'document':
                return <DocumentIcon className={isSite ? 'h-6 w-6' : ''} />;
            default:
                return <StandardDeliveryIcon className={isSite ? 'h-6 w-6' : ''} />;
        }
    };

    return (
        <label
            onClick={() => onValueChange(!isSelected)}
            htmlFor={card.code}
            aria-label={`Select ${card.title} tariff`}
            className={twMerge(
                classNames(
                    'flex flex-col cursor-pointer rounded-2xl !p-6 pb-[18px] transition-colors group h-[172px] ' +
                    'hover:bg-indigo-600 hover:text-white border-gray-200 border  ' +
                    'w-full !max-w-full',
                    {
                        'bg-indigo-600 text-white ': isSelected,
                        'outline outline-2 outline-white': isSelected && !isSite,
                        'hover:outline hover:outline-2 hover:outline-white outline-offset-[-5px]': !isSite,
                        'bg-white': !isSelected,
                    }
                ),
                isSite ? '!p-10 !pb-10 !pr-5 h-[234px]' : ''
            )}
        >
            <div className="card-top">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className={classNames(" font-semibold", {
                            'text-gray-800 group-hover:text-white': !isSelected,
                            'text-subtitle-3': !isSite,
                            'text-[24px] leading-[28px]': isSite,
                            'text-white': isSelected,
                        })}>
                            {card.title}
                        </h3>
                        {getIcon(card.code)}
                    </div>
                    {!isSite && <InfoCustom content={card.helper} />}
                </div>
                {!isSite && (
                    <Checkbox
                        id={card.code}
                        aria-label={`Checkbox for ${card.title} tariff`}
                        isSelected={isSelected}
                        onValueChange={onValueChange}
                        className="pt-[5px] checkbox-card"
                        color="default"
                    />
                )}
            </div>
            <div className={`flex items-center justify-between ${isSite ? 'mt-[34px]' : 'mt-4'}`}>
                <div className="flex items-center gap-1">
                    <h2 className={classNames(" font-semibold", {
                        'text-gray-900 group-hover:text-white': !isSelected,
                        'text-white': isSelected,
                        'text-subtitle-4': !isSite,
                        'text-[40px] leading-[28px]': isSite,
                    })}>
                        €{currentPrice}
                    </h2>
                    <span className={classNames(" font-semibold", {
                        'text-gray-500 group-hover:text-white': !isSelected,
                        'text-white': isSelected,
                        'text-small-5': !isSite,
                        'text-[24px] leading-[22px]': isSite,
                    })}>
                        {locales.components.ParcelTariffCard.EUR}
                    </span>
                </div>
                <span className={classNames(" font-semibold", {
                    'text-gray-800 group-hover:text-white': !isSelected,
                    'text-white': isSelected,
                    'text-small-5': !isSite,
                    'text-[20px] leading-[18px]': isSite,
                })}>
                    {locales.components.ParcelTariffCard.TO} {card.max_weigth} {locales.components.ParcelTariffCard.KG}
                </span>
            </div>
            <div className={`${isSite ? 'mt-auto' : 'mt-[14px]'}`}>
                <p className={classNames("text-small-2 leading-[22px] line-clamp-2 mt-auto", {
                    'text-gray-600 group-hover:text-white': !isSelected,
                    'text-white': isSelected,
                })}>
                    {card.description}
                </p>
            </div>
        </label>
    );
};

export default memo(ParcelTariffCard);
