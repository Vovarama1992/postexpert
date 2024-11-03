'use client';
import React, {Suspense, useEffect} from 'react';
import {useParams} from "next/navigation";
import {useToggleState} from "@/hooks";
import {ParcelProvider, StepsEnum} from "@/context";
import {getParcel} from "@/lib";
import {useRouter} from "@/navigation";
import SkeletonTimeline from "../../components/Timeline/SkeletonTimeline";
import SkeletonContentLeft from "../../components/SkeletonContentLeft";
import useParcelStore from "@/store/parcelStore";
import SkeletonContentRight from "@/app/[locale]/dashboard/parcels/components/SkeletonContentRight";
import usePayStore from "@/store/payStore";

const PayDialog = React.lazy(() => import('../../../../../../components/common/Dialogs/PayDialog'));

const Layout = ({children}: {
    children: React.ReactNode,
}) => {

    const [steps] = React.useState<Record<StepsEnum, boolean>>({
        [StepsEnum.created]: true,
        [StepsEnum.content]: true,
        [StepsEnum.tracking]: true,
    })

    const {push} = useRouter()

    const isOpen = usePayStore((state) => state.isOpen);

    const {
        id: parcelId
    } = useParams()

    const {
        state: isLoading, close: stop
    } = useToggleState(false)

    const parcel = useParcelStore(state => state.parcel)
    const setParcel = useParcelStore(state => state.setParcel)
    const clearParcel = useParcelStore(state => state.clearParcel)

    const fetchParcel =   async (parcelId: string) => {
        const res = await getParcel(parcelId as string);
        if (res.data.status !== 'draft') {
            setParcel(res.data);
            stop();
            return Promise.resolve()
        } else {
            push('/dashboard/parcels');
            return Promise.resolve()
        }
    }

    useEffect(() => {
        fetchParcel(parcelId as string)
    }, [parcelId]);

    useEffect(() => {
        return () => {
            clearParcel()
        }
    }, []);

    if (isLoading || !parcel) {
        return < >
            <SkeletonTimeline/>
            <div className="order-row">
                <SkeletonContentLeft/>
                <SkeletonContentRight/>
            </div>
        </>
    }

    return (
        <ParcelProvider fetchParcel={fetchParcel} steps={steps} step={StepsEnum.tracking} parcel={parcel}>
            {children}
            <Suspense fallback={<div>Loading...</div>}>
                {isOpen && <PayDialog />}
            </Suspense>
        </ParcelProvider>
    );
};

export default Layout;
