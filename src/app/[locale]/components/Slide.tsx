'use client';

import React from 'react';
import Image from 'next/image';
import { FeatureBlock } from "@/types/main";
import { MessageQuestionIcon } from "@/assets";

const Card = ({ card, index }: { card: FeatureBlock, index: number }) => {
    const topOffsets = ['top-12', 'top-20', 'top-28', 'top-36'];
    const bgColors = ['bg-white'];

    return (
        <div
            className={`w-full ${bgColors[index % bgColors.length]} 
             grid grid-cols-2 w-full max-lg:flex-col-reverse items-center max-lg:flex transition duration-200 rounded-[32px] bg-white max-lg:bg-gray-50 max-lg:gap-8
                    max-lg:items-center
             sticky ${topOffsets[index % topOffsets.length]} my-4`}
            style={{
            }}
        >
            <div className="flex flex-col gap-6 px-16 max-2xl:px-14 max-lg:px-10 max-lg:gap-4 max-md:px-0 justify-center/2">
                <h3 className="text-site-title-3 text-gray-950 max-lg:text-[32px]  max-lg:leading-[38px] max-sm:text-[28px] max-sm:leading-[34px]">{card.title}</h3>
                <p className='text-site-text-3 text-gray-700'>{card.description}</p>
                <div className="flex items-center gap-3 py-0.5">
                    <MessageQuestionIcon className="text-blue-400" />
                    <p className='text-site-text-3 text-gray-800 font-medium'>{card.annotation}</p>
                </div>
            </div>
            <Image
                quality={60}
                src={card.image}
                alt={'delivery'}
                loading="lazy"
                width={664}
                height={560}
                className={`max-lg:max-w-[440px] max-sm:max-w-[360px] max-sm:min-h-[410px]  max-sm:h-[410px] max-lg:min-h-[500px] max-lg:h-[500px]  w-full  rounded-r-[32px]
                    max-lg:rounded-3xl
                     object-cover pointer-events-none select-none max-2xl:h-[540px]  h-[560px]`}
            />
        </div>
    );
};

export default Card;
