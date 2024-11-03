'use client';

import React, { useMemo } from 'react';
import { listIcons } from "@/utils";
import { Link } from "@/navigation";
import { ChevronIcon } from "@/assets";
import { Block } from "@/types/main";
import { twMerge } from "tailwind-merge";
import { Swiper, SwiperSlide } from 'swiper/react';

const HeroBlock = ({ blocks, className }: { blocks: Block[], className?: string }) => {
    const renderBlock = (block: Block, index: number) => {
        const Icon = listIcons[block.icon];
        const isHighlighted = index === 2;

        return (
            <figure
                key={block.id}
                className={`rounded-3xl p-12 flex flex-col items-center gap-8 h-[426px] w-full 
                ${isHighlighted ? 'bg-gray-100' : 'bg-BG'} transition-all transform  hover:scale-105 hover:shadow-lg`}
            >
                <button
                    className={`size-[72px] min-h-[72px] min-w-[72px] flex items-center justify-center 
                    ${isHighlighted ? 'bg-white' : 'bg-BG-3'} rounded-xl`}
                >
                    <Icon className={`${isHighlighted ? 'text-gray-900' : 'text-white'} h-12 w-12`} />
                </button>
                <div className="space-y-4 text-center">
                    <h6 className={`text-site-sub-title-1 ${isHighlighted ? 'text-gray-900' : 'text-white'}`}>
                        {block.title}
                    </h6>
                    <p className={`text-site-text-1 ${isHighlighted ? 'text-gray-900' : 'text-white'}`}>
                        {block.description}
                    </p>
                </div>
                <Link
                    // @ts-ignore
                    href={block.link.url}
                    className={`flex items-center  gap-1.5 mt-auto ${isHighlighted ? 'text-indigo-600 button-link-indigo hover:bg-indigo-100' : 'text-white button-link-white'}`}
                >
                    <span className="text-[17px] leading-normal font-medium">
                        {block.link.label}
                    </span>
                    <ChevronIcon className="size-4" />
                </Link>
            </figure>
        );
    };

    const memoizedBlocks = useMemo(() => blocks.map(renderBlock), [blocks]);

    return (
        <div className={twMerge("items-center  gap-6 z-10 relative xl:container max-xl:!mt-[160px] max-lg:!mt-[120px] max-md:!mt-[104px]", className)}>
            {/* Карусель для мобильных устройств */}
            <div className="hidden max-xl:block w-full ">
                <Swiper
                    wrapperClass="py-4"
                    breakpoints={{
                        0: {
                            spaceBetween: 16,
                            slidesOffsetAfter: 24,
                            slidesOffsetBefore: 24,
                            slidesPerView: 1.2
                        },
                        640: {
                            spaceBetween: 24,
                            slidesOffsetAfter: 32,
                            slidesOffsetBefore: 32,
                            slidesPerView: 1.6
                        },
                        768: {
                            spaceBetween: 24,
                            slidesOffsetAfter: 40,
                            slidesOffsetBefore: 40,
                            slidesPerView: 1.8
                        },
                        1023: {
                            spaceBetween: 24,
                            slidesOffsetAfter: 48,
                            slidesOffsetBefore: 48,
                            slidesPerView: 2.5
                        }
                    }}
                >
                    {blocks.map((block, index) => (
                        <SwiperSlide key={block.id}>
                            {renderBlock(block, index)}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="hidden xl:flex w-full gap-6">
                {memoizedBlocks}
            </div>
        </div>
    );
};

export default React.memo(HeroBlock);
