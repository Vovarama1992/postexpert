'use client'
import React from 'react';
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import {MinusIcon, PlusIcon} from "@/assets";
import {classNames} from "@/utils";
import {twMerge} from "tailwind-merge";

interface AccordionItem {
    answer: string;
    question: string
}

interface AccordionCustom {
    className?: string;
    options?: AccordionItem[];
    itemClassName?: string;
    variant?: 'light' | 'dark';
}

const defaultOptions = [
    {
        answer: "Вопрос",
        question: 'Ответ'
    },
    {
        answer: "Вопрос 2",
        question: 'Ответ 2'
    },
    {
        answer: "Вопрос 3",
        question: 'Ответ 3'
    }
]

const PlusButton = ({isOpen, variant, className}: { isOpen: boolean, variant: 'light' | 'dark', className?: string }) => {
    return <div
        className={
            twMerge(
                classNames(
                    "size-10 rounded-xl flex items-center justify-center transition-colors ",
                    {
                        "bg-amber-400": isOpen && variant === 'dark',
                        "bg-[#12294D]": !isOpen && variant === 'light',
                        "group-hover/item:bg-amber-400": variant === 'dark',
                        "group-hover/item:bg-blue-400": variant === 'light',
                        "bg-blue-400 ": (!isOpen && variant === 'dark') || (isOpen && variant === 'light'),
                    }
                ),
                className
            )
        }>
        {
            isOpen
                ? <MinusIcon className={
                    classNames(
                        " rotate-90",
                        {
                            "text-white": variant === 'light',
                            "text-gray-900": variant === 'dark',
                        }
                    )
                }/>
                : <PlusIcon className={
                    classNames(
                        " rotate-90",
                        {
                            "text-white": variant === 'light',
                            "text-gray-900": variant === 'dark',
                        }
                    )
                }/>
        }
    </div>
}

const AccordionCustom = ({
                             className, variant = 'dark', itemClassName, options = defaultOptions
                         }: AccordionCustom) => {
    return (
        <div className={classNames("accordion", {
            'accordion-dark': variant === 'dark',
            'accordion-light': variant === 'light',
        }, [className])}>
            <Accordion defaultExpandedKeys={['0']} className="!gap-6" variant="splitted">
                {
                    options.map((el, index) => (
                        <AccordionItem
                            title={el.question}
                            key={index}
                            indicator={({isOpen}) => <PlusButton variant={variant} isOpen={Boolean(isOpen)}/>}
                            classNames={{
                                base: twMerge(
                                    classNames(
                                        '!pl-10 !pr-8 !rounded-3xl group/item',
                                        {
                                            '!bg-accordion': variant === 'dark',
                                            '!bg-blue-50 !shadow-none': variant === 'light',
                                        }
                                    ),
                                    itemClassName
                                ),
                                title: classNames(
                                    'text-site-text-4 max-sm:text-[18px] max-sm:leading-[27px]',
                                    {
                                        '!text-white font-medium': variant === 'dark',
                                        '!text-gray-950 font-semibold !leading-normal tracking-[-0.02em]': variant === 'light',
                                    }
                                ),
                                trigger: '!pt-8 !pb-6',
                                content: '!pt-0 !pb-8',
                            }}
                        >
                            <div className={
                                classNames(
                                    " text-site-text-3 max-sm:text-[16px] max-sm:leading-[27px] tracking-[-0.01em]",
                                    {
                                        'text-white': variant === 'dark',
                                        'text-gray-700': variant === 'light',
                                    }
                                )
                            } dangerouslySetInnerHTML={{
                                __html: el.answer
                            }}></div>
                        </AccordionItem>
                    ))
                }
            </Accordion>
        </div>
    );
};

export default AccordionCustom;
