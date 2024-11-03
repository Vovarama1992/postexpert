'use client'
import React from 'react';
import {profileTabs} from "@/data";
import {useTranslationContext} from "@/context";
import {Tabs} from "@/components/ui/Tabs";

const Layout = ({children}: {children: React.ReactNode}) => {

    const {
        getLabelByCode
    } = useTranslationContext()

    return (
        <div className="container h-full flex-1">
            <Tabs tabs={profileTabs(getLabelByCode)}  baseHref={'/dashboard/profile/'}/>
            <div className="flex flex-col gap-y-16">
                {children}
            </div>
        </div>
    );
};

export default Layout;
