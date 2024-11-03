'use client'
import React from 'react';
import {getParcels} from "@/lib";
import {useQuery} from "@tanstack/react-query";
import {parseAsInteger, useQueryState} from "nuqs";
import ParcelRowCard from "../components/Cards/ParcelRowCard";
import {useTranslationContext} from "@/context";
import LastNews from "@/app/[locale]/components/LastNews";
import {LastPosts} from "@/types/landing";
import useLastNewsStore from "@/store/lastNewsStore";
import {SkeletonParcelCard} from "@/components/ui/Skeleton";

const Page = () => {

    const {locales} = useTranslationContext()

    const { NO_ORDERS } = locales.pages.parcels;

    const [currentPage] = useQueryState('page', parseAsInteger.withDefault(1).withOptions({
        scroll: true
    }))

    const {data: parcels, isLoading} = useQuery({
        queryKey: ['parcels', currentPage],
        queryFn: () => getParcels(currentPage, 'draft'),
    });

    const lastNews = useLastNewsStore(state => state.lastNews)

    return (
        <div className="page-with-slider">
            <div className="cards-body">
                <div className="card-row">
                    {
                        isLoading ? Array(4).fill(null).map((_, index) => <SkeletonParcelCard key={index}/>) : parcels?.data?.length ? (
                            parcels.data.map(parcel => {
                                return <ParcelRowCard key={parcel.id} card={parcel}/>
                            })
                        ) : <p className="text-gray-400 ">{NO_ORDERS}</p>
                    }
                </div>
            </div>
            <hr className="hidden max-xl:block after:my-4 after:w-full after:h-[1px] after:text-gray-200"/>
            <LastNews isDashboard last={lastNews as unknown as LastPosts}/>
        </div>
    );
};

export default Page;
