'use client'
import React, {useState} from 'react';
import {useToggleState} from "@/hooks";
import {parseAsInteger, useQueryState} from "nuqs";
import {getAddresses} from "@/lib";
import {AddressType} from "@/types";
import {AddCircleIcon} from "@/assets";
import {useQuery} from "@tanstack/react-query";
import AddressCard from "../components/Cards/AddressCard";
import {useTranslationContext} from "@/context";
import PaginationCustom from "@/components/custom/PaginationCustom/PaginationCustom";
import useLastNewsStore from "@/store/lastNewsStore";
import {LastPosts} from "@/types/landing";
import LastNews from "@/app/[locale]/components/LastNews";
import {SearchPanelWidget} from "@/components/common/Widgets";
import {IndigoButton} from "@/components/custom";
import {AddressSideOver} from "@/components/common/SideOver";


const Page = () => {

    const {locales} = useTranslationContext()

    const {ENTER_CITY, ADD} = locales.pages.addresses;

    const lastNews = useLastNewsStore(state => state.lastNews)

    const {
        state: show, close, open
    } = useToggleState(false)

    const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger.withDefault(1).withOptions({
        scroll: true
    }))

    const [name] = useQueryState('locality')

    const {data: addresses, isLoading} = useQuery({
        queryKey: ['addresses', currentPage, name],
        queryFn: () => getAddresses(currentPage, name),
    });

    const [address, setAddress] = useState<AddressType | undefined>()

    const onOpenSideOver = (address?: AddressType) => () => {
        if (address) {
            setAddress(address)
        }
        open()
    }

    const onCloseSideOver = () => {
        setAddress(undefined)
        close()
    }

    return (
        <>
            <div className="page-with-slider">
                <div className="cards-body">
                    <div className="card-row">
                        <SearchPanelWidget label={ENTER_CITY} name="locality" />
                        {
                            isLoading ? Array(2).fill(null).map((_, index) => <AddressCard key={index} ready={false}
                                                                                           onOpen={onOpenSideOver}/>) :
                                addresses?.data?.length ? (
                                    addresses.data.map((address, index) => {
                                        return <AddressCard key={address.id} data={address}
                                                            onOpen={onOpenSideOver}/>
                                    })
                                ) : <AddressCard empty onOpen={onOpenSideOver}/>
                        }
                        {addresses?.data?.length ?
                            <IndigoButton onClick={onOpenSideOver()} endContent={<AddCircleIcon height={18} width={18}/>}
                                          className=" h-[56px] !text-small-4 text-white font-medium"
                                          color="primary">
                                {ADD}
                            </IndigoButton> : null}
                    </div>
                    <AddressSideOver address={address} isOpen={show} onClose={onCloseSideOver}/>
                </div>
                {(addresses?.meta?.last_page || 0) > 1 ?
                    <PaginationCustom
                        className="hidden max-xl:flex"
                        total={addresses?.meta?.last_page as number}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    : null}
                <hr className="hidden max-xl:block after:my-4 after:w-full after:h-[1px] after:text-gray-200"/>
                <LastNews isDashboard last={lastNews as unknown as LastPosts}/>
            </div>
            {(addresses?.meta?.last_page || 0) > 1 ?
                <PaginationCustom
                    className="max-xl:hidden mt-12"
                    total={addresses?.meta?.last_page as number}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                : null}
        </>
    );
};

export default Page;
