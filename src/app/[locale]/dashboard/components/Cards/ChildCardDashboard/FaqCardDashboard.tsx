import React from 'react';
import { Avatar } from "@nextui-org/avatar";
import { BookSavedIcon } from "@/assets";
import DashboardCard from "../DashboardCard";
import {useTranslationContext} from "@/context";

const FaqCardDashboard = () => {

    const {locales, getLabelByCode} = useTranslationContext()

    return (
        <DashboardCard
            href="/faq"
            className="flex justify-center h-full"
            centerClass="!lg:py-0  "
            left={
                <Avatar
                    className="!size-16 rounded-full bg-gray-300 text-white"
                    icon={<BookSavedIcon />}
                    alt=""
                />
            }
            variant={'white'}
            title={getLabelByCode('FAQ')}
            subTitle={locales.components.FaqCardDashboard.SUB_TITLE}
        />
    );
};

export default FaqCardDashboard;
