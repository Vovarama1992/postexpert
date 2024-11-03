'use client'
import React from 'react';
import { Avatar } from "@nextui-org/avatar";
import { BoxIcon } from "@/assets";
import DashboardCard from "../DashboardCard";
import ChipCustom from "@/components/custom/Chip/ChipCustom";
import {useTranslationContext} from "@/context";
import {Dashboard} from "@/types";
import {ListText} from "@/components/ui/ListText";

const OrdersCardDashboard = ({dashboard}: {dashboard: Dashboard}) => {

    const {locales} = useTranslationContext()

    return (
        <DashboardCard
            left={
                <Avatar
                    className="!size-16 rounded-full bg-gray-300 text-white"
                    icon={<BoxIcon />}
                    alt=""
                />
            }
            href="/dashboard/parcels"
            variant={'gray'}
            title={locales.components.OrdersCardDashboard.TITLE}
            subTitle={locales.components.OrdersCardDashboard.SUB_TITLE}
            bottom={
                <>
                    <ListText left={locales.components.OrdersCardDashboard.TOTAL_LABEL} right={<ChipCustom variant="grayLarge">
                        {dashboard.parcels.count}
                    </ChipCustom>} />
                </>
            }
        />
    );
};

export default OrdersCardDashboard;
