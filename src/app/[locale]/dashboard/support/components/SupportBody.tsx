'use client';
import React from 'react';
import {useTranslationContext} from "@/context";
import {mainTabs} from "@/data";
import ContactForm from "@/app/[locale]/contact/components/ContactForm";
import {ContactData} from "@/types/contact";
import {Tabs} from "@/components/ui/Tabs";

const SupportBody = ({page}: {page: ContactData}) => {

    const {locales, getLabelByCode} = useTranslationContext()

    const {WRITE_SUPPORT, TEAM_WILL_LISTEN} = locales.pages.support;

    return (
        <div className="container">
            <Tabs tabs={mainTabs(getLabelByCode)} baseHref={'/dashboard'}/>
            <div className="cards-body">
                <div className="flex flex-col gap-3">
                    <h6 className="text-subtitle-6 font-semibold text-gray-900">{WRITE_SUPPORT}</h6>
                    <span className="text-normal text-gray-700">{TEAM_WILL_LISTEN}</span>
                </div>
                <ContactForm fields={page.form.fields}/>
            </div>
        </div>
    );

};

export default SupportBody;
