"use client"
import {BoldMapIcon, Profile2UserIcon, UserIcon} from "@/assets";
import {defaultLocales} from "@/defaultLocales";
import {Tab} from "@/components/ui/Tabs";

const profileTabs = (getLabelByCode: any): Tab[] => [
    {
        value: '',
        label: defaultLocales(getLabelByCode).data.profileTabs[0],
        icon: UserIcon,
    },
    {
        value: 'recipients',
        label: defaultLocales(getLabelByCode).data.profileTabs[1],
        icon: Profile2UserIcon,
    },
    {
        value: 'address',
        label: defaultLocales(getLabelByCode).data.profileTabs[2],
        icon: BoldMapIcon,
    },
]

export {profileTabs}
