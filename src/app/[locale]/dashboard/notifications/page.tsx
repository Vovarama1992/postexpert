'use client'
import React from 'react';
import {NotificationStatusIcon} from "@/assets";
import NotificationCard from "./components/Cards/NotificationCard";
import {useTranslationContext} from "@/context";
import {parseAsInteger, useQueryState} from "nuqs";
import {getNotifications} from "@/lib";
import {useQuery} from "@tanstack/react-query";
import PaginationCustom from "@/components/custom/PaginationCustom/PaginationCustom";
import LastNews from "@/app/[locale]/components/LastNews";
import {LastPosts} from "@/types/landing";
import useLastNewsStore from "@/store/lastNewsStore";
import {SearchPanelWidget} from "@/components/common/Widgets";
import {SkeletonParcelCard} from "@/components/ui/Skeleton";
import {Tabs} from "@/components/ui/Tabs";

const Page = () => {

    const {locales} = useTranslationContext()

    const {ALL, ENTER_ORDER_NUMBER} = locales.pages.notifications;

    const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger.withDefault(1).withOptions({
        scroll: true
    }))

    const [parcel_number] = useQueryState('parcel_number', {clearOnDefault: true})

    const {data: notifications, isLoading} = useQuery({
        queryKey: ['notifications', currentPage, parcel_number],
        queryFn: () => getNotifications(currentPage, parcel_number),
    });

    const lastNews = useLastNewsStore(state => state.lastNews)

    return (
        <div className="container h-full flex-1">
            <Tabs tabs={[
                {
                    value: '',
                    label: ALL,
                    icon: NotificationStatusIcon,
                }
            ]}  baseHref={'/dashboard/notifications/'}/>
            <div className="flex flex-col gap-y-16">
                <div className="page-with-slider">
                    <div className="cards-body">
                        <div className="card-row">
                            <SearchPanelWidget label={ENTER_ORDER_NUMBER} name="parcel_number" />
                            {
                            isLoading ? Array(4).fill(null).map((_, index) => <SkeletonParcelCard key={index}/>) :
                                notifications?.data?.length ? (
                                    notifications?.data.map(notification => {
                                        return <NotificationCard key={notification.id} card={notification}/>
                                    })
                                ) : !isLoading && !notifications?.data?.length ? (
                                    <p className="text-gray-400">{ENTER_ORDER_NUMBER}</p>
                                ) : <p className="text-gray-400">{ALL}</p>
                            }
                        </div>
                    </div>
                    {(notifications?.meta?.last_page || 0) > 1 ?
                        <PaginationCustom className="hidden max-xl:flex" total={notifications?.meta?.last_page as number} currentPage={currentPage}
                                          setCurrentPage={setCurrentPage}/>
                        : null}
                    <hr className="hidden max-xl:block after:my-4 after:w-full after:h-[1px] after:text-gray-200"/>
                    <LastNews isDashboard last={lastNews as unknown as LastPosts}/>
                </div>
                {(notifications?.meta?.last_page || 0) > 1 ?
                    <PaginationCustom className="max-xl:hidden mt-12" total={notifications?.meta?.last_page as number} currentPage={currentPage}
                                      setCurrentPage={setCurrentPage}/>
                    : null}
            </div>
        </div>
    );
};

export default Page;
