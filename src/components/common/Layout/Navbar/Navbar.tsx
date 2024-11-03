'use client';

import React, {memo, useMemo, useState, useEffect, useCallback, MouseEvent} from 'react';
import Image from 'next/image';
import { Link as NextLink, usePathname } from '@/navigation';
import { Link } from '@nextui-org/link';
import logo from '../../../../../public/logo/logo.svg';
import { classNames } from '@/utils';
import {BurgerIcon, CloseIcon, LoginIcon, NotificationIcon} from '@/assets';
import { useAuthContext, useTranslationContext } from '@/context';
import BottomNavbar from '@/components/common/Layout/Navbar/BottomNavbar/BottomNavbar';
import LangMenu from '../../Menu/LangMenu';
import { Button } from '@nextui-org/button';
import {useToggleState} from "@/hooks";
import dynamic from 'next/dynamic';
import AvatarMenu from "@/components/common/Menu/AvatarMenu";
import Bag from "@/components/common/Menu/Bag";

const HowItWork = dynamic(() => import('@/components/common/Tutorial/HowItWork'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

const NotificationMenu = dynamic(() => import('@/components/common/Menu/NotificationMenu'), {
    ssr: false,
    loading: () => <NotificationIcon className="text-white" />,
});

const DrawerNavbar = dynamic(() => import('@/components/common/Layout/Navbar/DrawerNavbar/DrawerNavbar'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

interface NavbarProps {
    show: boolean;
    close(): void;
}

const Navbar = ({}: NavbarProps) => {
    const { locales, menus } = useTranslationContext();
    const { session } = useAuthContext();
    const pathname = usePathname();

    const {
        state: isOpen, toggle: toggleNavbar, close: closeNavbar
    } = useToggleState(false);

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { state: show, toggle, close } = useToggleState(false);

    const isAuthPage = useMemo(() => !session, [session]);

    const sitesMenu = useMemo(() => menus.find(el => {
        return el.code === 'site-header';
    }), [menus, pathname]);

    const onClickLink = useCallback(
        (hrefValue: string) => (e: MouseEvent<HTMLButtonElement>) => {
            if (hrefValue.includes('how-it-works')) {
                e.preventDefault();
                toggle();
            }
        },
        [toggle]
    );

    useEffect(() => {
        const threshold = 25;
        let ticking = false;

        const handleScroll = () => {
            if (pathname.includes('/dashboard')) {
                setIsVisible(true)
                return;
            }
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    if (currentScrollY > lastScrollY && currentScrollY > threshold) {
                        setIsVisible(false);
                    } else if (lastScrollY > currentScrollY || currentScrollY <= threshold) {
                        setIsVisible(true);
                    }
                    setLastScrollY(currentScrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY, pathname]);

    return (
        <>
            <header className={`bg-BG fixed left-0 right-0 z-[21] transition-transform duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="lg:h-[96px] flex items-center py-[16px] lg:py-6 w-full relative container  ">
                    <div className="flex items-center justify-between w-full">
                        <NextLink href={'/'}>
                            <Image
                                className="select-none pointer-events-none w-[120px] h-[24px] lg:w-[130px] lg:h-[26px] xl:w-[173px] xl:h-[34px]"
                                src={logo}
                                alt={'logo'}
                                unoptimized
                                width={173}
                                height={34}
                            />
                        </NextLink>
                        <nav className={classNames('absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2')}>
                            <ul className="hidden lg:flex items-center gap-8 max-xl:gap-6">
                                {sitesMenu?.items?.map((link: any, idx: number) => (
                                    <li key={idx} className="group relative py-2">
                                        <NextLink
                                            // @ts-ignore
                                            onClick={onClickLink(link.slug)}
                                            href={link.slug}
                                            underline="none"
                                            className={`!text-white text-subtitle-1 !font-medium transition-all duration-300  ${
                                                pathname === link.slug ? 'text-blue-500' : 'hover:text-blue-300'
                                            }`}
                                            color="foreground"
                                        >
                                            {link.name}
                                        </NextLink>
                                        <span
                                            className={`absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 transition-all duration-300 ${
                                                pathname === link.slug ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                            }`}
                                            style={{ transformOrigin: 'left' }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <div className="gap-x-4 flex items-center text-sm">
                            <LangMenu className="max-sm:hidden" />
                            {!session ? (
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <div className="hidden gap-4 items-center lg:flex">
                                        <Link as={NextLink} href="/login" className="text-small-2 font-medium text-white focus:outline-none hover:text-blue-300">
                                            {locales.components.Navbar.LOGIN}
                                        </Link>
                                        <Button as={NextLink} href="/register"
                                                className="bg-blue-400 hover:bg-blue-500 transition-all duration-300 font-medium w-[128px] h-12 xl:w-[135px] !text-small-2 !text-white"
                                                color="primary">
                                            {locales.components.Navbar.REGISTER}
                                        </Button>
                                    </div>
                                    <Button as={NextLink} href="/login" isIconOnly className="flex lg:hidden !size-8" variant="light">
                                        <LoginIcon className="text-white" />
                                    </Button>
                                    <Button onClick={toggleNavbar} size="sm" className="block  lg:hidden bg-transparent " isIconOnly   >
                                        {
                                            isOpen ? <CloseIcon className="text-white"/> : <BurgerIcon className="text-white"/>
                                        }
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Bag className="flex" />
                                    <div className="h-[18px] w-[1px] bg-white/40 hidden sm:block" />
                                    <NotificationMenu />
                                    <AvatarMenu />
                                    <Button onClick={toggleNavbar} size="sm" className="block  lg:hidden bg-transparent " isIconOnly   >
                                        {
                                            isOpen ? <CloseIcon className="text-white"/> : <BurgerIcon className="text-white"/>
                                        }
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {!isAuthPage && pathname.includes('dashboard') ? <BottomNavbar /> : null}
            </header>
            <HowItWork show={show} close={close} />
            <DrawerNavbar close={closeNavbar} isOpen={isOpen}/>
        </>
    );
}

export default memo(Navbar);
