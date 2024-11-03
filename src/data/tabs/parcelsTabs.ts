"use client"
import {EditIcon, BoxAddIcon, TaskSquareIcon, StandardDeliveryIcon} from "@/assets";
import {defaultLocales} from "@/defaultLocales";
import {Tab} from "@/components/ui/Tabs";

const parcelTabs = (getLabelByCode: any): Tab[] => [
    {
        value: '/parcels/create',
        label: defaultLocales(getLabelByCode).data.parcelTabs[0],
        icon: BoxAddIcon,
    },
    {
        value: '/parcels',
        label: defaultLocales(getLabelByCode).data.parcelTabs[1],
        icon: TaskSquareIcon,
    },
    {
        value: '/delivering',
        label: defaultLocales(getLabelByCode).data.parcelTabs[3],
        icon: StandardDeliveryIcon,
    },
    {
        value: '/cart',
        label: defaultLocales(getLabelByCode).data.parcelTabs[2],
        icon: EditIcon,
    },
]

export {parcelTabs}
