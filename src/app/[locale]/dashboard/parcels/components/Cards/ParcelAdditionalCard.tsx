'use client'
import React from 'react';
import { ShieldIcon } from "@/assets";
import { getServices } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import {useTranslationContext} from "@/context";
import {SwitchCustom} from "@/components/custom";
import {ParcelCard} from "@/components/ui/Card";

const ParcelAdditionalCard = () => {

    const {locales} = useTranslationContext()

    const { data: services } = useQuery({
        queryKey: ['services'],
        queryFn: () => getServices(),
    });

    return (
        <ParcelCard icon={ShieldIcon} title={locales.components.ParcelAdditionalCard.TITLE}>
            <div className="mt-6 space-y-6">
                {
                    services?.data?.map((service, index) => (
                        <SwitchCustom id={service.id} key={index} content={service.description} name={'service_ids'}/>
                    ))
                }
            </div>
        </ParcelCard>
    );
};

export default ParcelAdditionalCard;
