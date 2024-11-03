"use client"
import React from 'react';
import {usePathname} from "@/navigation";
import {useTranslationContext} from "@/context";

const AuthTitle = () => {

    const {locales} = useTranslationContext()

    const pathname = usePathname();

    const renderTitle = () => {
        switch (pathname) {
            case '/login': {
                return locales.components.AuthTitle.LOGIN;
            }
            case '/register': {
                return locales.components.AuthTitle.REGISTER;
            }
            case '/reset': {
                return locales.components.AuthTitle.RESET;
            }
        }
    }

    return <h5 className="mt-[1.125rem] text-[#27272A] text-2xl font-[650]">{renderTitle()}</h5>;
};

export default AuthTitle;