'use client'
import React, { useCallback } from 'react';
import PaginationCustom from "@/components/custom/PaginationCustom/PaginationCustom";
import AccordionCustom from "@/components/custom/Accordion/AccordionCustom";
import PromptList from "@/app/[locale]/components/PromptList";
import {FaqData} from "@/types/landing";
import {parseAsInteger, useQueryState} from "nuqs";

const FaqList = ({faq}: {faq: FaqData}) => {

    const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger.withDefault(1).withOptions({
        shallow: false
    }))

    const [category, setCategory] = useQueryState('category')

    const handleButtonClick = useCallback((value: string | null) => {
        setCategory(value);
        setCurrentPage(1)
    }, []);

    return (
        <>
            <section className="my-16 container gap-6 space-y-10">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => handleButtonClick(null)}
                        className={`
                                group px-4 h-[35px] flex items-center rounded-3xl transition-colors
                                ${category === null ? 'bg-blue-400' : 'bg-gray-100 hover:bg-blue-400'}
                            `}
                    >
                            <span
                                className={`
                                    text-base font-medium transition-colors
                                    ${category === null ? 'text-white' : 'text-gray-900 group-hover:text-white'}
                                `}
                            >
                                Все
                            </span>
                    </button>
                    {faq.faqCategories.map((button) => (
                        <button
                            key={button.slug}
                            onClick={() => handleButtonClick(button.slug)}
                            className={`
                                group px-4 h-[35px] flex items-center rounded-3xl transition-colors
                                ${category === button.slug ? 'bg-blue-400' : 'bg-gray-100 hover:bg-blue-400'}
                            `}
                        >
                            <span
                                className={`
                                    text-base font-medium transition-colors
                                    ${category === button.slug ? 'text-white' : 'text-gray-900 group-hover:text-white'}
                                `}
                            >
                                {button.title}
                            </span>
                        </button>
                    ))}
                </div>
                <AccordionCustom options={faq.faqs.data} itemClassName="!bg-gray-50" className="max-w-[840px] self-center mx-auto" variant="light" />
            </section>
            <PaginationCustom total={faq.faqs.last_page} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <PromptList blocks={faq.blocks} />
        </>
    );
};

export default FaqList;