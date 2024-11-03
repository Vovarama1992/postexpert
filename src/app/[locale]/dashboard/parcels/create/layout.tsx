'use client';

import React, {Suspense, useEffect, useState} from 'react';
import {createParcel, getParcel, getParcelSteps} from "@/lib";
import {ParcelProvider, StepsEnum, useTranslationContext} from "@/context";
import {useToggleState} from "@/hooks";
import {notFound} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
import {usePathname, useRouter} from "@/navigation";
import {useQueryState} from "nuqs";
import {Timeline} from "@/app/[locale]/dashboard/parcels/components/Timeline";
import useParcelStore from "@/store/parcelStore";
import ParcelCreateTop from "@/app/[locale]/dashboard/parcels/create/components/ParcelCreateTop";
import ChipCustom from "@/components/custom/Chip/ChipCustom";
import {convertDate, getStatusInfo,} from "@/utils";
import useStatusStore from "@/store/statusesStore";
import {useSession} from "next-auth/react";
import {useLocale} from "next-intl";
import SkeletonTimeline from '../components/Timeline/SkeletonTimeline';
import SkeletonContentLeft from '../components/SkeletonContentLeft';
import SkeletonContentRight from "@/app/[locale]/dashboard/parcels/components/SkeletonContentRight";
import usePayStore from "@/store/payStore";
import {ListText} from "@/components/ui/ListText";
import {undefined} from "zod";

const PayDialog = React.lazy(() => import('../../../../../components/common/Dialogs/PayDialog'));

const Layout = ({children}: { children: React.ReactNode }) => {
    const {parcel, setParcel, clearParcel} = useParcelStore();
    const [steps, setSteps] = useState<Record<StepsEnum, boolean>>({
        [StepsEnum.created]: false,
        [StepsEnum.content]: false,
        [StepsEnum.tracking]: false,
    });
    const [step, setStep] = useState<StepsEnum | undefined>();
    const {state: isLoading, close: stopLoading, open: startLoading} = useToggleState(true);
    const {locales, getLabelByCode} = useTranslationContext()

    const {ORDER, STATUS, DATE} = locales.pages.parcelDetails;

    const session = useSession()

    const locale = useLocale()

    const queryClient = useQueryClient();
    const pathname = usePathname();
    const router = useRouter();
    const [parcelId, setParcelId] = useQueryState('parcelId', {
        // @ts-ignore
        defaultValue: null
    });
    const statuses = useStatusStore(state => state.statuses)
    const isOpen = usePayStore((state) => state.isOpen);

    const fetchParcel = async (parcelId?: string | null) => {

        if (!parcelId && session?.data?.user) {
            // @ts-ignore
            const res = await createParcel(session.data.user.token as string, locale);

            setParcel(res.data);

            setSteps({
                [StepsEnum.created]: false,
                [StepsEnum.content]: false,
                [StepsEnum.tracking]: false,
            });

            await setParcelId(res.data.id)

            await queryClient.invalidateQueries({queryKey: ['draftCount']});
        } else if (parcelId) {
            try {
                const res = await getParcel(parcelId);

                if (res.data.status && res.data.status !== 'draft') {
                    // @ts-ignore
                    router.push(`/dashboard/parcels/view/${res.data.id}`);
                    return;
                }

                setParcel(res.data);

                const stepsData = await getParcelSteps(parcelId);
                setSteps({
                    [StepsEnum.created]: stepsData.created,
                    [StepsEnum.content]: stepsData.content,
                    [StepsEnum.tracking]: stepsData.tracking,
                });

                if (stepsData.created && !stepsData.content && !stepsData.tracking) {
                    setStep(StepsEnum.content);
                } else if (stepsData.created && stepsData.content && !stepsData.tracking) {
                    setStep(StepsEnum.tracking);
                }

                if (pathname.includes('/create')) setStep(StepsEnum.created);
                if (pathname.includes('/second-step')) setStep(StepsEnum.content);
                if (pathname.includes('/third-step')) setStep(StepsEnum.tracking);

                await queryClient.invalidateQueries({queryKey: ['draftCount']});
            } catch (error) {
                console.error("Error fetching parcel data:", error);
            } finally {
                stopLoading();
            }
        }

    };

    useEffect(() => {
        fetchParcel(parcelId);
    }, [parcelId, pathname]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {

        return () => {
            clearParcel()
        }
    }, []);

    if (isLoading || !parcel) {
        return (
            < >
                <SkeletonTimeline/>
                <div className="order-row">
                    <SkeletonContentLeft/>
                    <SkeletonContentRight/>
                </div>
            </>
        );
    }

    if (!isLoading && !parcel) {
        return notFound();
    }

    return (
        <ParcelProvider fetchParcel={fetchParcel} steps={steps} step={step} parcel={parcel!}>
            <div className="mb-10  flex w-full items-start justify-between gap-10  max-xl:flex-col bg-white   z-[20] ">
                <Timeline steps={steps} step={step as StepsEnum}/>
                <ParcelCreateTop className="max-xl:hidden"/>
            </div>
            <ParcelCreateTop className="max-xl:mb-10  max-xl:flex xl:hidden"/>
            {
                parcel?.status ? <div className="flex flex-col gap-y-4 mb-4  lg:mb-8 ">
                    <div className="flex items-center gap-2">
                        <h3 className="text-title-2 text-gray-900 font-semibold">{ORDER}</h3>
                        <h3 className="text-title-2 text-gray-900 font-semibold">{parcel.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                        <ListText variant="big" left={STATUS} right={parcel?.status ? <ChipCustom variant={
                            getStatusInfo(parcel.status, getLabelByCode)[0]
                        }>{statuses?.find(el => el.code === parcel?.status)?.title}</ChipCustom> : null}/>
                        <ListText variant="big" left={DATE} right={<ChipCustom
                            variant={'grayLight'}>{convertDate(parcel.created_at, 'DD.MM.YYYY')}</ChipCustom>}/>
                    </div>
                </div> : null
            }
            {children}

            <Suspense fallback={<div>Loading...</div>}>
                {isOpen && <PayDialog />}
            </Suspense>
        </ParcelProvider>
    );
};

export default Layout;
