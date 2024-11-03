'use client'
import React from 'react';
import {parseAsInteger, useQueryState} from "nuqs";
import {getParcels} from "@/lib";
import {useQuery} from "@tanstack/react-query";
import ParcelRowCard from "../components/Cards/ParcelRowCard";
import PaginationCustom from "@/components/custom/PaginationCustom/PaginationCustom";
import {useTranslationContext} from "@/context";
import LastNews from "@/app/[locale]/components/LastNews";
import {LastPosts} from "@/types/landing";
import useLastNewsStore from "@/store/lastNewsStore";
import {FilterPanelWidget} from "@/components/common/Widgets";
import {SkeletonParcelCard} from "@/components/ui/Skeleton";

const Page = () => {

    const {locales} = useTranslationContext()

    const {NO_ORDERS, NOTHING_FOUND} = locales.pages.parcels;

    const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger.withDefault(1).withOptions({
        scroll: true
    }))

    const [number] = useQueryState('number', {clearOnDefault: true})
    const [status] = useQueryState('status', {clearOnDefault: true})

    const {data: parcels, isLoading} = useQuery({
        queryKey: ['parcels', currentPage, number, status],
        queryFn: () => getParcels(currentPage, status || undefined, number || undefined),
    });

    const lastNews = useLastNewsStore(state => state.lastNews)

    return (
        <>
            <div className="page-with-slider">
                <div className="cards-body">
                    <FilterPanelWidget/>
                    <div className="card-row">
                        {
                            isLoading ? Array(4).fill(null).map((_, index) => <SkeletonParcelCard key={index}/>)
                                : parcels?.data?.length ? (
                                    parcels.data.map(parcel => {
                                        return <ParcelRowCard key={parcel.id} card={parcel}/>
                                    })
                                ) : !isLoading && !parcels?.data?.length ? (
                                    <p className="text-gray-400">{NOTHING_FOUND}</p>
                                ) : <p className="text-gray-400">{NO_ORDERS}</p>
                        }
                    </div>
                </div>
                {(parcels?.meta?.last_page || 0) > 1 ?
                    <PaginationCustom className="hidden max-xl:flex" total={parcels?.meta?.last_page as number} currentPage={currentPage}
                                      setCurrentPage={setCurrentPage}/>
                    : null}
                <hr className="hidden max-xl:block after:my-4 after:w-full after:h-[1px] after:text-gray-200"/>
                <LastNews isDashboard last={lastNews as unknown as LastPosts}/>
            </div>
            {(parcels?.meta?.last_page || 0) > 1 ?
                <PaginationCustom className="max-xl:hidden mt-12" total={parcels?.meta?.last_page as number} currentPage={currentPage}
                                  setCurrentPage={setCurrentPage}/>
                : null}
        </>
    );
};

export default Page;
