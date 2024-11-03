'use client'
import React from 'react';
import { NotificationBing } from "@/assets";
import DashboardCard from "../DashboardCard";
import { Avatar } from "@nextui-org/avatar";
import {useTranslationContext} from "@/context";
import {Dashboard} from "@/types";
import ChipCustom from "@/components/custom/Chip/ChipCustom";
import {ListText} from "@/components/ui/ListText";

const NotificationCardDashboard = ({dashboard}: {dashboard: Dashboard}) => {

    const {locales} = useTranslationContext()

    const avatar = (
        <Avatar
            className="!size-16 rounded-full bg-amber-400 text-white"
            icon={<NotificationBing />}
            alt=""
        />
    );

    return (
        <DashboardCard
            href="/dashboard/notifications"
            centerClass="!pb-12 !px-2"
            left={avatar}
            bottomClass="!mx-2"
            variant={'white'}
            title={locales.components.NotificationCardDashboard.TITLE}
            subTitle={locales.components.NotificationCardDashboard.SUB_TITLE}
            bottom={<ListText left={locales.components.NotificationCardDashboard.TOTAL_LABEL} right={<ChipCustom variant="grayLarge">
                {dashboard.notifications.count}
            </ChipCustom>} />}
        />
    );
};

export default NotificationCardDashboard;
