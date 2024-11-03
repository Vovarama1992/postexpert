'use client';

import React, { useRef, useState } from 'react';
import { Link } from "@/navigation";
import {ArrowNarrowIcon, ChevronIcon} from "@/assets";
import { BlogPost, LastPosts} from "@/types/landing";
import {parseAndRenderContent} from "@/utils";
import SwiperCore from "swiper";
import {Swiper, SwiperSlide} from 'swiper/react';
import BlogCard from "@/components/common/Cards/BlogCard";
import {useTranslationContext} from "@/context";
import {IconButton} from "@/components/custom";

const LastNews = ({last, isDashboard = false}: { last: LastPosts, isDashboard?: boolean }) => {
    const swiperRef = useRef<SwiperCore>();
    const [canSlideNext, setCanSlideNext] = useState(true);
    const [canSlidePrev, setCanSlidePrev] = useState(false);

    const {getLabelByCode} = useTranslationContext()

    // @ts-ignore
    const posts = last?.blogPosts?.data?.length ? last.blogPosts?.data : last?.blogPosts
        ? last.blogPosts : last?.posts?.length ? last.posts : [];

    const updateSlideState = () => {
        if (!swiperRef.current) return;

        const swiper = swiperRef.current;
        setCanSlideNext(!swiper.isEnd);
        setCanSlidePrev(!swiper.isBeginning);
    };

    const slider = (
        <Swiper
            onSwiper={(swiper: SwiperCore) => {
                swiperRef.current = swiper;
                updateSlideState(); // Обновляем состояние при инициализации
            }}
            onSlideChange={updateSlideState} // Обновляем состояние при изменении слайда
            className="!mx-0"
            slidesOffsetAfter={isDashboard ? 0 : 20}
            slidesOffsetBefore={isDashboard ? 0 : 20}
            spaceBetween={18}
            breakpoints={
                isDashboard ? {
                    0: {
                        slidesPerView: 1.1
                    },
                    640: {
                        slidesPerView: 1.8
                    },
                    768: {
                        slidesPerView: 2.15
                    },
                    1023: {
                        slidesPerView: 3
                    },
                    1280: {
                        slidesPerView: 1.15
                    },
                    1440: {
                        slidesPerView: 1.15
                    }
                } : undefined
            }
            slidesPerView={'auto'}
        >
            {posts.map((post: BlogPost) => (
                <SwiperSlide key={post.id} className={!isDashboard ? "max-w-[340px] " : ''}>
                    <BlogCard blog={post} />
                </SwiperSlide>
            ))}
        </Swiper>
    )

    return (
        <section className={`space-y-10 max-xl:space-y-8 overflow-hidden w-full ${isDashboard ? 'sticky top-[20%] self-start' : ''}`}>
            <div className={
                !isDashboard ? "w-full md:container-left relative gap-x-14 gap-y-10 grid grid-cols-[1fr_1.5fr] max-xl:grid-cols-1" : "w-full overflow-hidden"
            }>
                {
                    !isDashboard ? <div className="flex flex-col gap-4 max-xl:items-center max-sm:container ">
                        <span className="text-label">{last.label}</span>
                        <div className="flex flex-col gap-6 max-xl:items-center ">
                            <h3 className="text-site-title-3 text-gray-950">{last.title}</h3>
                            <p
                                className="text-site-text-1 max-xl:text-center leading-[136.2%]"
                                dangerouslySetInnerHTML={{
                                    __html: parseAndRenderContent(last.description)
                                }}
                            ></p>
                            <Link
                                href="/register"
                                className="button-link-indigo xl:self-start"
                            >
                                <span >Вопросы ответы</span>
                                <ChevronIcon  />
                            </Link>
                        </div>
                    </div> : null
                }
                {
                    isDashboard ? <div className="flex flex-col gap-6 ">
                        <div className="hidden max-xl:flex justify-between items-center">
                            <h5 className="text-[20px] leading-[40px] font-semibold tracking-[-0.9px]">
                                {getLabelByCode('LAST_NEWS_TITLE')}
                            </h5>
                            <Link
                                // @ts-ignore
                                href="/blog" className={`flex items-center gap-3 group transition-all duration-300`}>
                                <span className="text-small-4 transition-all duration-300 group-hover:text-blue-300 text-gray-900 underline underline-offset-4 font-medium">{
                                    getLabelByCode('All_NEWS')
                                }</span>
                                <ArrowNarrowIcon className="rotate-180 text-gray-900 transition-all duration-300 group-hover:text-blue-300"/>
                            </Link>
                        </div>
                        {slider}
                    </div>  :<div className="flex flex-col justify-end relative w-full overflow-hidden ">
                        {slider}
                    </div>
                }
            </div>
            <div className={`flex gap-3 justify-end mt-4 ${!isDashboard ? 'container' : ''}`}>
                <IconButton
                    onClick={() => {
                        swiperRef.current?.slidePrev();
                        updateSlideState();
                    }}
                    iconClassName="!size-[12px] rotate-180 "
                    className={`!h-10 !w-10 !rounded-lg   ${!canSlidePrev ? '!bg-white !border-gray-200 cursor-not-allowed text-gray-900' : '!bg-BG text-white'}`}
                    icon={ChevronIcon}
                    disabled={!canSlidePrev}
                />
                <IconButton
                    onClick={() => {
                        swiperRef.current?.slideNext();
                        updateSlideState();
                    }}
                    iconClassName="!size-[12px] "
                    className={`!h-10 !w-10 !rounded-lg   ${!canSlideNext ? '!bg-white !border-gray-200 cursor-not-allowed text-gray-900' : '!bg-BG text-white'}`}
                    icon={ChevronIcon}
                    disabled={!canSlideNext}
                />
            </div>
        </section>
    );
};

export default LastNews;
