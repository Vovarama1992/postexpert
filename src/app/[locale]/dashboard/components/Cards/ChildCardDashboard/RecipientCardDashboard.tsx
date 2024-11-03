import React from 'react';
import { Avatar } from "@nextui-org/avatar";
import { Profile2UserIcon } from "@/assets";
import DashboardCard from "../DashboardCard";
import ChipCustom from "@/components/custom/Chip/ChipCustom";
import {useTranslationContext} from "@/context";
import {Dashboard} from "@/types";
import {ListText} from "@/components/ui/ListText";

const RecipientCardDashboard = ({dashboard}: {dashboard: Dashboard}) => {

    const {locales} = useTranslationContext()

    return (
        <DashboardCard
            href="/dashboard/profile/recipients"
            left={
                <Avatar
                    className="!size-16 rounded-full bg-blue-400 text-white"
                    icon={<Profile2UserIcon />}
                    alt=""
                />
            }
            variant={'blue'}
            title={locales.components.RecipientCardDashboard.TITLE}
            subTitle={locales.components.RecipientCardDashboard.SUB_TITLE}
            bottom={
                <>
                    <ListText left={locales.components.RecipientCardDashboard.TOTAL_LABEL} right={
                        <ChipCustom variant="grayLarge">
                            {dashboard.recipients.count}
                        </ChipCustom>
                    } />
                </>
            }
        />
    );
};

export default RecipientCardDashboard;
