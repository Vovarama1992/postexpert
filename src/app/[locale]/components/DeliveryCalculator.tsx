'use client';
import React from 'react';
import {FormProvider, useForm} from "react-hook-form";
import DeliveryCalculatorCard from "@/app/[locale]/components/DeliveryCalculatorCard";
import {DeliveryInformation} from "@/types/service";
import { IndigoButton } from '@/components/custom';

const DeliveryCalculator = ({info}: { info: DeliveryInformation }) => {

    const methods = useForm({
        defaultValues: {
            weight: 1
        }
    });

    return (
        <FormProvider {...methods}>
            <section className=" space-y-12 max-xl:space-y-10 max-sm:space-y-8  ">
                <div className="gap-4 flex flex-col container">
                    <span className="text-label">{info.label}</span>
                    <div className="w-full flex justify-between items-end max-lg:flex-col max-lg:items-start gap-y-8">
                        <div className="space-y-6">
                            <h2 className="text-site-title-2 text-gray-950">{info.title}</h2>
                            <p className="text-site-text-2 text-gray-700 max-w-[600px]">{info.description}</p>
                        </div>
                        {
                            info?.button ? <IndigoButton href={info?.button?.link} type="button" className="h-[60px] !bg-BG w-[140px] max-sm:h-[50px] max-sm:w-[140px]">
                                {info?.button?.label}
                            </IndigoButton> : null
                        }
                    </div>
                </div>
                <div className="lg:container">
                    <DeliveryCalculatorCard/>
                </div>
            </section>
        </FormProvider>
    );
};

export default DeliveryCalculator;
