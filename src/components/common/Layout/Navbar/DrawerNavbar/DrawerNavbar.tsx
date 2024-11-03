'use client'
import React, {useEffect, useMemo} from 'react';
import {Button} from "@nextui-org/button";
import {classNames} from "@/utils";
import {Link} from "@nextui-org/link";
import {useAuthContext, useTranslationContext} from "@/context";
import {Link as NextLink, usePathname} from "@/navigation";
import LangMenu from "../../../Menu/LangMenu";
import {useToggleState} from "@/hooks";
import { HowItWork } from '@/components/common/Tutorial';
import AvatarMenu from "@/components/common/Menu/AvatarMenu";
import Bag from "@/components/common/Menu/Bag";
import NotificationMenu from "@/components/common/Menu/NotificationMenu";

const DrawerNavbar = ({isOpen, close}: { isOpen: boolean, close: () => void }) => {

    const {menus} = useTranslationContext()

    const {state: showVideo, close: closeVideo} = useToggleState(false);

    const pathname = usePathname()

    const {session} = useAuthContext()

    const isAuthPage = !session

    const sitesMenu = useMemo(() => menus.find(el => {

        if (pathname.includes('/dashboard')) {
            return el.code === 'dashboard'
        }
        return el.code === 'site-header'

    }), [menus, pathname])

    useEffect(() => {
        if (isOpen) {
            close()
        }
    }, [pathname])


    return (
        <>
            <aside className={
                classNames(
                    `w-screen fixed bg-BG lg:hidden right-0 z-40 overflow-y-auto transition-transform duration-500
                       flex flex-col
                     top-16  lg:top-20
                     h-[calc(100vh-64px)] lg:h-[calc(100vh-80px)] 
                     `,
                    {
                        'translate-x-0 no-doc-scroll ': isOpen,
                        'translate-x-full ': !isOpen,
                    }
                )
            }>
                <div className="flex flex-col items-center flex-1 justify-center gap-10 pb-16 ">
                    <ul className="flex flex-col gap-10">
                        {sitesMenu?.items.map((link: any, idx: number) => {
                            return (
                                <li key={idx}>
                                    <Link as={NextLink} className="!text-white text-subtitle-2 !font-medium"
                                          color="foreground"
                                          href={link.slug} underline="none">
                                        {link.name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    <div className={
                        classNames(
                            "pt-6 border-t border-solid border-white/10 flex items-center",
                            {
                                "min-w-[146px] gap-4": !isAuthPage,
                                "min-w-[223px] gap-6": isAuthPage,
                            }
                        )
                    }>
                        {
                            isAuthPage ? <>
                                <Link as={NextLink} href="/login" className="text-base underline underline-offset-[4px]
                                 font-medium text-white focus:!outline-0">
                                    Войти
                                </Link>
                                <Button as={NextLink} href="/register"
                                        variant="bordered"
                                        className="!border-blue-400  font-medium h-10 w-[151px] xl::h-12 xl:w-[159px] !text-subtitle-1 !text-blue-300"
                                        color="primary">
                                    Регистрация
                                </Button>
                            </> : <>
                                <LangMenu className=""/>
                                <Bag className="flex"/>
                                <div className="h-[18px] w-[1px] bg-white/40 hidden sm:block"/>
                                <NotificationMenu/>
                                <AvatarMenu/>
                            </>
                        }
                    </div>
                </div>
            </aside>
            <HowItWork show={showVideo} close={closeVideo}/>
        </>
    );
};

export default DrawerNavbar;
