"use client"
import React, {MouseEvent, useCallback} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getParcelDraftCounts, getParcelLastDraft} from "@/lib";
import {usePathname} from "@/navigation";
import {parcelTabs} from "@/data";
import {confirmCreateDialog} from "./ConfirmCreateDialog";
import {useLocale} from "next-intl";
import {useRouter} from "next/navigation";
import {useTranslationContext} from "@/context";
import ParcelBreadcrumbs from "@/app/[locale]/dashboard/parcels/create/components/ParcelBreadcrumbs";
import useParcelStore from "@/store/parcelStore";
import {Tabs} from "@/components/ui/Tabs";
import {useQueryState} from "nuqs";

const DashboardParcelLayout = ({children}: { children: React.ReactNode }) => {

    const {data: draftCount} = useQuery({
        queryKey: ['draftCount'],
        queryFn: () => getParcelDraftCounts(),
    });
    const [parcelId] = useQueryState('parcelId');

    const {push} = useRouter()

    const locale = useLocale()

    const pathname = usePathname()

    const {
        getLabelByCode
    } = useTranslationContext()

    let tabs = [...parcelTabs(getLabelByCode)]

    const parcel = useParcelStore(state => state.parcel);

    const onClickCreateParcel = useCallback(async (e: MouseEvent<HTMLAnchorElement>) => {

        e.preventDefault()

        if (draftCount) {

            const val = await confirmCreateDialog({})

            if (val === null) return

            if (val) {

                const {data: lastDraft} = await getParcelLastDraft()

                const contentStep = lastDraft?.steps?.created && !lastDraft?.steps?.content && !lastDraft?.steps?.tracking
                const createStep = !lastDraft?.steps?.created && !lastDraft?.steps?.content && !lastDraft?.steps?.tracking
                const trackingStep = lastDraft?.steps?.created && lastDraft?.steps?.content && !lastDraft?.steps?.tracking

                if (parcelId) {
                    if (Number(parcelId) === lastDraft?.id) {
                        return
                    }
                }

                push(`/${locale}/dashboard/parcels/create/${contentStep ? 'second-step' : createStep ? '' : trackingStep ? 'third-step' : ''}?parcelId=${lastDraft.id}`);

                return

            } else {

                push(`/${locale}/dashboard/parcels/create`);

                return

            }

        } else {
            return push(`/${locale}/dashboard/parcels/create`)
        }

    }, [draftCount, locale, parcelId])

    if (draftCount)
        tabs[3].chip = draftCount

    tabs[0].onClick = onClickCreateParcel

    const noTab = pathname === '/dashboard/parcels/view/[id]' || parcel?.status === 'draft'

    return (
        <div className="container h-full flex-1 relative">
            {noTab ? <ParcelBreadcrumbs/> : <Tabs tabs={tabs} baseHref={'/dashboard'}/>}
            <div className="flex flex-col">
                {children}
            </div>
        </div>
    );
};

export default DashboardParcelLayout;
