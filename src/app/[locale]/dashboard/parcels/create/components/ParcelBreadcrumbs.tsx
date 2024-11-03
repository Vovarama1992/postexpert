'use client'
import React from 'react';
import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/breadcrumbs";
import {useTranslationContext} from "@/context";
import {useRouter} from "@/navigation";
import useParcelStore from "@/store/parcelStore";

const ParcelBreadcrumbs = () => {

    const {locales} = useTranslationContext()
    const router = useRouter();
    const parcel = useParcelStore(state => state.parcel);

    const {ALL_ORDERS} = locales.pages.parcelDetails;

    const onGoToParcels = () => {
        router.push('/dashboard/parcels');
    }

    return (
        <Breadcrumbs className="mb-6 mt-4 lg:mb-10 lg:mt-8"  size={'md'}>
            <BreadcrumbItem className="font-medium text-gray-500" onClick={onGoToParcels}>{ALL_ORDERS}</BreadcrumbItem>
            <BreadcrumbItem className="font-medium text-gray-800">{parcel?.title}</BreadcrumbItem>
        </Breadcrumbs>
    );
};

export default ParcelBreadcrumbs;
