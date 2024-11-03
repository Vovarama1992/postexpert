import React from 'react';
import {__API__} from "@/lib";
import {ContactData} from "@/types/contact";
import SupportBody from "@/app/[locale]/dashboard/support/components/SupportBody";

const Page = async ({params: {locale}}: {params: { locale: string }}) => {

    const response = await fetch(`${__API__}/site/pages/contacts`, {
        headers: {
            locale
        },
        
    })

    const { data } = await response.json()

    const page = data as ContactData

    return (
        <SupportBody page={page}/>
    );
};

export default Page;
