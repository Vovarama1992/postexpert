'use client'
import React, {ReactNode, useEffect} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {useToggleState} from "@/hooks";
import {classNames} from "@/utils";
import "react-toastify/dist/ReactToastify.css";
// Todo GET /_next/static/css/app/%5Blocale%5D/ReactToastify.css.map 404 in 1259ms в консоли такая ошибка вылезает, это проблема либы https://github.com/fkhadra/react-toastify/issues/1099
import {SessionProvider} from "next-auth/react";
import {UserProvider} from "@/context";
import {usePathname} from "@/navigation";
import 'swiper/react';
import 'swiper/css';
import {LayoutData} from "@/types/layout";
import {useLocale} from "next-intl";
import useLocaleStore from "@/store/localeStore";
import useLenisStore from "@/store/lenisStore";
import dynamic from "next/dynamic";
import {Footer, Navbar} from "@/components/common/Layout";

interface LayoutProps {
    children: ReactNode,
    layoutData: LayoutData,
    closeBanner?: boolean
}

const CookieConsentModal = dynamic(() => import('@/components/common/Dialogs/CookieConsentDialog'), {
    ssr: false,
});

const ToastContainer = dynamic(() => import('react-toastify').then((mod) => mod.ToastContainer), {
    ssr: false,
});

const queryClient = new QueryClient()

const Layout = ({children, layoutData}: LayoutProps) => {

    const pathname = usePathname()

    const locale = useLocale()
    const setLocale = useLocaleStore((state) => state.setLocale);
    const initializeLenis = useLenisStore((state) => state.initializeLenis);

    const {
        state: show, close
    } = useToggleState(false)

    const isAuthPage = pathname.includes('login') || pathname.includes('register') ||
        pathname.includes('reset') || pathname.includes('reset-password')

    const isSite = !pathname.includes('dashboard')

    useEffect(() => {
        setLocale(locale)
    }, [locale]);


    useEffect(() => {
        if (document.getElementById('[data-overlay-container="true"]'))
            initializeLenis(document.getElementById('[data-overlay-container="true"]') as HTMLElement);
    }, [initializeLenis]);

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <div className="lenis-content min-h-screen bg-BG w-full flex flex-col relative font-inter">
                            <Navbar show={show} close={close}/>
                            <div className={
                                classNames("flex-1 bg-white flex flex-col  ", {
                                    'mt-[130px] lg:mt-[162px]': !show && !isAuthPage && !isSite,
                                    'mt-[64px] xl:mt-[96px]': isSite,
                                    'justify-center': !isSite,
                                })
                            }>
                                {children}
                            </div>
                            <Footer footer={layoutData.footer}/>
                    </div>
                    <ToastContainer bodyClassName={"text-gray-800"} className={
                        "text-gray-800"
                    } position="top-right"/>
                    <CookieConsentModal/>
                </UserProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
};

export default Layout;
