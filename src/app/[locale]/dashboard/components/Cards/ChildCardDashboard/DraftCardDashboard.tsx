'use client'
import React from 'react';
import { Avatar } from "@nextui-org/avatar";
import { DocumentTextIcon } from "@/assets";
import DashboardCard from "../DashboardCard";
import ChipCustom from "@/components/custom/Chip/ChipCustom";
import {useTranslationContext} from "@/context";
import {Dashboard} from "@/types";
import {ListText} from "@/components/ui/ListText";

const DraftCardDashboard = ({dashboard}: {dashboard: Dashboard}) => {

    const {locales} = useTranslationContext()

    return (
        <DashboardCard
            left={
                <Avatar
                    className="!size-16 rounded-full bg-gray-300 text-white"
                    icon={<DocumentTextIcon />}
                    alt=""
                />
            }
            href="/dashboard/cart"
            variant={'gray'}
            title={locales.components.DraftCardDashboard.TITLE}
            subTitle={locales.components.DraftCardDashboard.SUB_TITLE}
            bottom={
                <>
                    <ListText left={locales.components.DraftCardDashboard.TOTAL_LABEL} right={
                        <ChipCustom variant="grayLarge">
                            {dashboard.drafts.count}
                        </ChipCustom>
                        } />
                </>
            }
        />
    );
};

export default DraftCardDashboard;
