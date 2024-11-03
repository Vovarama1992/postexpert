'use client';

import React, { memo, useMemo, useCallback } from 'react';
import { Link, usePathname } from "@/navigation";
import { classNames } from "@/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import {Tab, TabsProps} from "@/components/ui/Tabs";

const Tabs = ({ tabs, baseHref, className, border = true, spanClassName }: TabsProps) => {
    const pathname = usePathname();

    const activeTab = useMemo(() => {
        const path = pathname.replace(baseHref, '');
        return path === pathname ? '' : path;
    }, [pathname, baseHref]);

    const renderTab = useCallback((tab: Tab) => {
        const isActive = tab.value === '/parcels/create' ? activeTab.includes(tab.value) : tab.value === activeTab;

        return (
            <Link
                key={tab.value}
                // @ts-ignore
                href={baseHref + tab.value}
                onClick={tab?.onClick ?? undefined}
                className={classNames(
                    'group max-sm:!text-[15px] inline-flex items-center relative border-b-2 pb-3 text-small',
                    {
                        'border-indigo-500 text-indigo-600': isActive,
                        'border-transparent text-gray-800 hover:border-gray-300 hover:text-gray-1000': !isActive
                    }
                )}
            >
                {tab.icon && <tab.icon height={18} width={18} className={classNames(
                    '-ml-0.5 mr-2',
                    {
                        'text-indigo-600': isActive,
                        'text-gray-800 group-hover:text-gray-1000': !isActive
                    }
                )}/>}
                <span className={classNames(
                    'font-medium',
                    {
                        'text-indigo-600': isActive,
                        'mr-2': !!tab?.chip
                    },
                    [spanClassName]
                )}>{tab.label}</span>
                {tab.chip && (
                    <div className="h-[22px] max-sm:h-[18px] max-sm:max-w-[18px] min-w-[22px] rounded flex items-center justify-center bg-gray-800">
                        <span className="text-[14px] max-sm:text-[12px] font-medium tracking-[-0.01em] text-white">{tab.chip}</span>
                    </div>
                )}
            </Link>
        );
    }, [activeTab, baseHref, spanClassName]);

    return (
        <div className={classNames("mb-6 mt-4 lg:mb-10 lg:mt-8 max-sm:-mx-5", {}, [className])}>
            <div className="flex">
                <div className={classNames('w-full overflow-hidden', {
                    "border-b border-gray-200": border
                })}>
                    <Swiper
                        className=" !hidden max-sm:!flex"
                        slidesOffsetBefore={20}
                        spaceBetween={24}
                        initialSlide={tabs.findIndex(tab => tab.value === activeTab)}
                        breakpoints={{
                            0: {
                                slidesPerView: 'auto'
                            }
                        }}
                    >
                        {tabs.map(tab => (
                            <SwiperSlide className="!w-auto !h-full" key={tab.value}>
                                {renderTab(tab)}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <nav className="-mb-px flex space-x-6 max-sm:hidden">
                        {tabs.map(renderTab)}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default memo(Tabs);
