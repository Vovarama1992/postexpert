"use client"
import React from 'react';
import {useLocale} from "next-intl";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/dropdown";
import {ArrowDownIcon} from "@/assets";
import {twMerge} from "tailwind-merge";
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

const LangMenu = ({className}: { className?: string }) => {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const searchParams = useSearchParams();

    const onChangeLanguage = (lang: string) => () => {
        const newLocale = lang;

        let newPathname = `/${newLocale}${pathname.replace(`/${locale}`, '')}`;

        const queryParams = searchParams.toString();

        router.replace(`${newPathname}?${queryParams}`);
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <button
                    className={twMerge("min-w-[34px] max-lg:min-w-8  flex gap-1 items-center focus:outline-0", className)}>
                    <span
                        className="cursor-pointer text-subtitle-1 text-white font-medium first-letter:uppercase">{locale}</span>
                    <ArrowDownIcon className="text-white"/>
                </button>
            </DropdownTrigger>
            <DropdownMenu variant="solid">
                {['en', 'ru'].map((item, idx) => {

                    return (
                        <DropdownItem onClick={onChangeLanguage(item)}
                                      key={idx}
                                      className="text-black font-medium">
                            {item.toUpperCase()}
                        </DropdownItem>
                    )
                })}
            </DropdownMenu>
        </Dropdown>
    );
};

export default LangMenu;
