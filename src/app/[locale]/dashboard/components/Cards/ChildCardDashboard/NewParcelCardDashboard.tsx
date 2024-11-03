'use client'
import React from 'react';
import { Avatar } from "@nextui-org/avatar";
import {BoxBoldIcon} from "@/assets";
import DashboardCard from "../DashboardCard";
import {useTranslationContext} from "@/context";

const NewParcelCardDashboard = () => {

    const {getLabelByCode} = useTranslationContext()

    return (
        <DashboardCard
            left={
                <Avatar
                    className="!size-16 rounded-full bg-white text-blue-400"
                    icon={<BoxBoldIcon />}
                    alt=""
                />
            }
            centerClass="!py-0 !px-2.5 flex items-center h-full"
            className="bg-blue-400 h-[191px]"
            href="/dashboard/parcels/create"
            variant={'gray'}
            title={<span className="text-white">{getLabelByCode('NEW_PARCEL')}</span>}
            subTitle={''}
        />
    );
};

export default NewParcelCardDashboard;
