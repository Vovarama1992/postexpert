'use client'
import React from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@nextui-org/dropdown";
import {Avatar} from "@nextui-org/avatar";
import {useAuthContext, useTranslationContext, useUserContext} from "@/context";
import {Link} from "@/navigation";
import {LogoutIcon} from "@/assets";

const AvatarMenu = () => {

    const {locales, menus} = useTranslationContext()

    const userMenu = menus.find(el => el.code === 'user')

    const {avatar} = useUserContext();
    const {session, onSignOut} = useAuthContext();

    const onExit = async () => await onSignOut();

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    className="!size-8 cursor-pointer !ring-0 outline-1 hover:outline hover:outline-white/50 outline-offset-[2px]"
                    src={avatar ?? undefined}
                    name={session?.user?.name ?? undefined}
                />
            </DropdownTrigger>
            <DropdownMenu variant="solid" classNames={{ base: 'w-[260px]' }}>
                <DropdownSection showDivider>
                    {userMenu?.items?.length ? userMenu?.items?.map((item, idx) => {
                        return (
                            <DropdownItem
                                as={Link}
                                key={idx}
                                href={item.slug}
                                classNames={{ title: "text-gray-800 font-medium !text-subtitle-1" }}
                            >
                                {item.name}
                            </DropdownItem>
                        );
                    }) : []}
                </DropdownSection>
                <DropdownSection className="!mb-0">
                    <DropdownItem
                        endContent={<LogoutIcon />}
                        onClick={onExit}
                        classNames={{ title: "text-gray-800 font-medium !text-subtitle-1" }}
                    >
                        {locales.components.AvatarMenu.LOGOUT}
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
};

export default AvatarMenu;
