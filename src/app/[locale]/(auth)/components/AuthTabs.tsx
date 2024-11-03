'use client'
import React from 'react';
import {authTab} from "@/data";
import {useTranslationContext} from "@/context";
import {Tabs} from "@/components/ui/Tabs";

const AuthTabs = () => {

    const {getLabelByCode} = useTranslationContext()

    return (
        <Tabs spanClassName="text-base" className="my-6" border={false} tabs={authTab(getLabelByCode)} baseHref={'/'}/>
    );
};

export default AuthTabs;
