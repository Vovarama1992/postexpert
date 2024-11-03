'use client'
import React, {useState} from 'react';
import {useToggleState} from "@/hooks";
import {parseAsInteger, useQueryState} from "nuqs";
import {RecipientType} from "@/types";
import {getRecipients} from "@/lib";
import {AddCircleIcon} from "@/assets";
import {useQuery} from "@tanstack/react-query";
import RecipientCard from "./components/Cards/RecipientCard";
import {useTranslationContext} from "@/context";
import PaginationCustom from "@/components/custom/PaginationCustom/PaginationCustom";
import {LastPosts} from "@/types/landing";
import LastNews from "@/app/[locale]/components/LastNews";
import useLastNewsStore from "@/store/lastNewsStore";
import {SearchPanelWidget} from "@/components/common/Widgets";
import {IndigoButton} from "@/components/custom";
import {RecipientsSideOver} from "@/components/common/SideOver";

const Page = () => {

    const {locales} = useTranslationContext()

    const {ENTER_LAST_NAME, ADD} = locales.pages.recipients;

    const lastNews = useLastNewsStore(state => state.lastNews)

    const {
        state: show, close, open
    } = useToggleState(false)

    const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger.withDefault(1).withOptions({
        scroll: true
    }))

    const [name] = useQueryState('name')

    const [address, setAddress] = useState<RecipientType | undefined>()

    const {data: recipients, isLoading} = useQuery({
        queryKey: ['recipients', currentPage, name],
        queryFn: () => getRecipients(currentPage, name),
    });

    const onOpenSideOver = (address?: RecipientType) => () => {
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
                        <SearchPanelWidget label={ENTER_LAST_NAME} name="name" />
                        {
                            isLoading ? Array(2).fill(null).map((_, index) => <RecipientCard key={index} ready={false}
                                                                                             onOpen={onOpenSideOver}/>) :
                                recipients?.data?.length ? (
                                    recipients.data.map(recipient => {
                                        return <RecipientCard key={recipient.id} data={recipient}
                                                              onOpen={onOpenSideOver}/>
                                    })
                                ) : <RecipientCard empty onOpen={onOpenSideOver}/>
                        }
                        {recipients?.data?.length ?
                            <IndigoButton onClick={onOpenSideOver()} endContent={<AddCircleIcon height={18} width={18}/>}
                                          className=" h-[56px] !text-small-4 text-white font-medium"
                                          color="primary">
                                {ADD}
                            </IndigoButton> : null}
                    </div>

                    <RecipientsSideOver address={address} isOpen={show} onClose={onCloseSideOver}/>
                </div>
                {(recipients?.meta?.last_page || 0) > 1 ? <PaginationCustom
                    className="hidden max-xl:flex"
                    total={recipients?.meta?.last_page as number}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                /> : null}
                <hr className="hidden max-xl:block after:my-4 after:w-full after:h-[1px] after:text-gray-200"/>
                <LastNews isDashboard last={lastNews as unknown as LastPosts}/>
            </div>
            {(recipients?.meta?.last_page || 0) > 1 ? <PaginationCustom
                className="max-xl:hidden mt-12"
                total={recipients?.meta?.last_page as number}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
             /> : null}
        </>
    );
};

export default Page;
