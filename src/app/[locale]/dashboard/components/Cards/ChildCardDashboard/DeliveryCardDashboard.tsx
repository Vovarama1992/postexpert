import React from 'react';
import { Avatar } from "@nextui-org/avatar";
import { CubeScanIcon } from "@/assets";
import DashboardCard from "../DashboardCard";
import ChipCustom from "@/components/custom/Chip/ChipCustom";
import {useTranslationContext} from "@/context";
import {Dashboard} from "@/types";
import {ListText} from "@/components/ui/ListText";

const DeliveryCardDashboard = ({dashboard}: {dashboard: Dashboard}) => {

    const {locales} = useTranslationContext()

    return (
        <DashboardCard
            left={
                <Avatar
                    className="!size-16 rounded-full bg-teal-400 text-white"
                    icon={<CubeScanIcon />}
                    alt=""
                />
            }
            variant={'white'}
            href={'/dashboard/delivering'}
            title={locales.components.DeliveryCardDashboard.TITLE}
            subTitle={''}
            bottom={
                <>
                    <ListText left={locales.components.DraftCardDashboard.TOTAL_LABEL} right={
                        <ChipCustom variant="grayLarge">
                            {dashboard.in_delivering.count}
                        </ChipCustom>
                    } />
                </>
            }
        />
    );
};

export default DeliveryCardDashboard;
