'use client'
import React from 'react';
import {mainTabs} from "@/data";
import {useTranslationContext} from "@/context";
import UserCardDashboard from "@/app/[locale]/dashboard/components/Cards/ChildCardDashboard/UserCardDashboard";
import NotificationCardDashboard
	from "@/app/[locale]/dashboard/components/Cards/ChildCardDashboard/NotificationCardDashboard";
import RecipientCardDashboard
	from "@/app/[locale]/dashboard/components/Cards/ChildCardDashboard/RecipientCardDashboard";
import AddressCardDashboard from "@/app/[locale]/dashboard/components/Cards/ChildCardDashboard/AddressCardDashboard";
import FaqCardDashboard from "@/app/[locale]/dashboard/components/Cards/ChildCardDashboard/FaqCardDashboard";
import OrdersCardDashboard from "@/app/[locale]/dashboard/components/Cards/ChildCardDashboard/OrdersCardDashboard";
import DeliveryCardDashboard from "@/app/[locale]/dashboard/components/Cards/ChildCardDashboard/DeliveryCardDashboard";
import DraftCardDashboard from "@/app/[locale]/dashboard/components/Cards/ChildCardDashboard/DraftCardDashboard";
import {getDashboard} from "@/lib";
import {useQuery} from "@tanstack/react-query";
import DashboardCardSkeleton from "@/app/[locale]/dashboard/components/Cards/DashboardCardSkeleton";
import NewParcelCardDashboard
	from "@/app/[locale]/dashboard/components/Cards/ChildCardDashboard/NewParcelCardDashboard";
import {Tabs} from "@/components/ui/Tabs";

const Page = () => {

	const { getLabelByCode } = useTranslationContext()

	const { data: dashboard, isLoading } = useQuery({
		queryKey: ['dashboard'],
		queryFn: getDashboard,
	});

	return (
		<div className="container">
			<Tabs tabs={mainTabs(getLabelByCode)} baseHref={'/dashboard'}/>
			<div className="dashboard-row">
				{
					isLoading ? Array(8).fill(null).map((_, index) => <DashboardCardSkeleton variant="gray" key={index} />) : dashboard ?  <>
						<NewParcelCardDashboard  />
						<UserCardDashboard dashboard={dashboard} />
						<NotificationCardDashboard dashboard={dashboard}/>
						<RecipientCardDashboard dashboard={dashboard}/>
						<AddressCardDashboard dashboard={dashboard}/>
						<FaqCardDashboard />
						<OrdersCardDashboard dashboard={dashboard}/>
						<DeliveryCardDashboard dashboard={dashboard}/>
						<DraftCardDashboard dashboard={dashboard}/>
					</> : null
				}
			</div>
		</div>
    );
};

export default Page;
