import React from 'react';
import { Avatar } from "@nextui-org/avatar";
import { useAuthContext, useUserContext } from "@/context";
import DashboardCard from "../DashboardCard";
import {useTranslationContext} from "@/context/Translation/TranslationContext";
import {Dashboard} from "@/types";
import {ListText} from "@/components/ui/ListText";

const UserCardDashboard = ({dashboard}: {dashboard: Dashboard}) => {

    const {
        getLabelByCode
    } = useTranslationContext()

    const { avatar: avatarSrc, profile } = useUserContext();
    const { session } = useAuthContext();

    const avatar = (
        <Avatar
            src={avatarSrc ?? undefined}
            name={session?.user?.name ?? undefined}
            className="!size-16 rounded-full"
            alt=""
        />
    );

    return (
        <DashboardCard
            centerClass="lg:!py-0 lg:!px-2.5 flex items-center h-full"
            left={avatar}
            href="/dashboard/profile"
            variant={'gray'}
            bottomClass="!mx-2"
            title={profile?.full_name ?? getLabelByCode('FULL_NAME_NOT_SET')}
            subTitle={
                <div className="flex flex-col gap-1 ">
                    <ListText  left={getLabelByCode('PHONE')} right={dashboard.user.phone} />
                    <ListText  left={getLabelByCode('EMAIL')} right={dashboard.user.email} />
                </div>
            }
            bottom={
               null
            }
        />
    );
};

export default UserCardDashboard;
