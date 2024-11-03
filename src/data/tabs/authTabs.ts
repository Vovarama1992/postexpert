"use client"
import {defaultLocales} from "@/defaultLocales";
import {Tab} from "@/components/ui/Tabs";

const authTab = (getLabelByCode: any): Tab[] => [
    {
        label: defaultLocales(getLabelByCode).data.authTab[0],
        value: 'register',
    },
    {
        label: defaultLocales(getLabelByCode).data.authTab[1],
        value: 'login',
    },
]
export {authTab}
