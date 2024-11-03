'use client'
import React from 'react';
import { Avatar } from "@nextui-org/avatar";
import { BoldMapIcon } from "@/assets";
import DashboardCard from "../DashboardCard";
import ChipCustom from "@/components/custom/Chip/ChipCustom";
import {useTranslationContext} from "@/context";
import {Dashboard} from "@/types";
import {ListText} from "@/components/ui/ListText";

const AddressCardDashboard = ({dashboard}: {dashboard: Dashboard}) => {

    const {locales} = useTranslationContext()

    return (
        <DashboardCard
            left={
                <Avatar
                    className="!size-16 rounded-full bg-indigo-400 text-white"
                    icon={<BoldMapIcon />}
                    alt=""
                />
            }
            href="/dashboard/profile/address"
            variant={'gray'}
            title={locales.components.AddressCardDashboard.TITLE}
            subTitle={locales.components.AddressCardDashboard.SUB_TITLE}
            bottom={
                <ListText left={locales.components.AddressCardDashboard.TOTAL_LABEL} right={<ChipCustom variant="grayLarge">
                    {dashboard.addresses.count}
                </ChipCustom>} />
        }
        />
    );
};

export default AddressCardDashboard;
