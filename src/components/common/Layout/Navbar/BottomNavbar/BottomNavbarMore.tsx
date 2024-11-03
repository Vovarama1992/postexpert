"use client"
import React, {MouseEvent, useCallback} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/dropdown";
import {classNames} from "@/utils";
import {Link} from "@/navigation";
import {useTranslationContext} from "@/context";

const BottomNavbarMore = ({toggle}: {toggle: () => void}) => {

    const {menus} = useTranslationContext()

    const dashboardMenu = menus.find(el => el.code === 'dashboard')

    const onClickLink = useCallback(
        (hrefValue: string) => (e: any) => {

            if (hrefValue.includes('how-it-works')) {
                e.preventDefault();
                toggle();
            }
        },
        [toggle]
    );

    return (
        <Dropdown >
            <DropdownTrigger>
                <div className="flex lg:hidden gap-[3px] px-2 cursor-pointer h-[33px] justify-center items-center">
                    <div className="size-1 rounded-full bg-white"/>
                    <div className="size-1 rounded-full bg-white"/>
                    <div className="size-1 rounded-full bg-white"/>
                </div>
            </DropdownTrigger>
            <DropdownMenu variant="solid" >
                {
                    dashboardMenu?.items?.length ? dashboardMenu?.items?.slice(3).map((link: any, key: number) => {
                        return <DropdownItem
                            key={link.slug}
                            as={Link}
                            href={link.slug}
                            onClick={onClickLink(link.slug)}
                            className={
                                classNames("", {
                                    'flex sm:hidden': key === 0,
                                    'flex lg:hidden': key === 1
                                })
                            }
                            classNames={{
                                title: "text-gray-800 font-medium !text-subtitle-1"
                            }}
                        >
                            {link.name}
                        </DropdownItem>
                    })
                : []}
            </DropdownMenu>
        </Dropdown>
    );
};

export default BottomNavbarMore;
