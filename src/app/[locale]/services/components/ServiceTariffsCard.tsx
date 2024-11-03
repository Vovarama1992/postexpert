import React from 'react';
import {Tariff} from "@/types/service";
import {classNames} from "@/utils";
import {CheckElIcon, DocumentIcon, ExpressDeliveryIcon, IconType, StandardDeliveryIcon} from "@/assets";
import {StrokeButton} from "@/components/custom";

const getIcon = (key: string): IconType => {
    switch (key) {
        case 'express':
            return ExpressDeliveryIcon;
        case 'document':
            return DocumentIcon;
        default:
            return StandardDeliveryIcon;
    }
};

const ServiceTariffsCard = ({
    tariff, index, type
                            }: {tariff: Tariff, index: number, type: string}) => {


    const Icon = getIcon(type)

    return (
        <figure className={
            classNames(
                'p-12 max-sm:!w-[400px] flex cursor-pointer flex-col h-[524px]  xl:basis-1/3 transition-colors group hover:bg-indigo-600 rounded-3xl  max-xl:basis-auto ',
                {
                    'bg-white': index === 0,
                    'bg-gray-50': index === 1,
                    'bg-indigo-600': index === 2,
                    'border border-gray-200': index !== 2,
                    'border-indigo-600': index === 2,
                }
            )
        }>
            <div className="flex items-center gap-4">
                <h5 className={`text-[32px] leading-[28px] transition-colors group-hover:text-white ${index === 2 ? 'text-white' : 'text-gray-900'} font-semibold`}>
                    {tariff.name}
                </h5>
                <Icon className={`h-8 w-8 group-hover:text-white transition-colors ${index === 2 ? 'text-white' : 'text-gray-900'}`}/>
            </div>
            <div className="flex items-center gap-1 mt-10">
                <h2 className={classNames(" font-semibold  group-hover:text-white text-[48px] leading-[28px]", {
                    'text-white': index === 2,
                    'text-gray-900': index !== 2,
                })}>
                    €{tariff.price}
                </h2>
                <span className={classNames(" font-semibold  group-hover:text-white text-[24px] leading-[22px]", {
                    'text-white': index === 2,
                    'text-gray-500': index !== 2,
                })}>eur</span>
            </div>
            <ul className="mt-10 flex flex-col gap-6 w-full ">
                {
                    tariff.options.map((option, index2) => {
                        return <li className="flex items-center justify-between" key={index2}>
                            <div className="flex items-center gap-3">
                                <CheckElIcon className="text-white"/>
                                <span className={
                                    classNames(
                                        "group-hover:text-white transition-colors text-[16px] leading-[18px] ",
                                        {
                                            'text-gray-800': index !== 2,
                                            'text-white': index === 2,
                                        }
                                    )
                                }>{option.name}</span>
                            </div>
                            <span className={
                                classNames(
                                    "group-hover:text-white transition-colors text-[16px] font-medium leading-[18px] ",
                                    {
                                        'text-gray-900': index !== 2,
                                        'text-white': index === 2,
                                    }
                                )
                            }>{option.value}</span>
                        </li>
                    })
                }
            </ul>
            <div className="mt-auto">
                <StrokeButton href={tariff.button.link} className={`w-full group-hover:!border-white group-hover:!text-white ${index === 2 ? '!text-white' : ''} !border-gray-300`}>
                    {tariff.button.label}
                </StrokeButton>
            </div>
        </figure>
    );
};

export default ServiceTariffsCard;
