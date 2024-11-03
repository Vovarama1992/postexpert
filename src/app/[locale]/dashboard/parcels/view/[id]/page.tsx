'use client'
import React from 'react';
import {FormProvider, useForm} from "react-hook-form";
import ChipCustom from "@/components/custom/Chip/ChipCustom";
import {ParcelLoadingDataProvider, StepsEnum, useParcelContext, useTranslationContext} from "@/context";
import {convertDate, getStatusInfo} from "@/utils";
import ParcelViewCard from "../../components/Cards/ParcelViewCard";
import ParcelInfoCard from "../../components/Cards/ParcelInfoCard";
import Timeline from "../../components/Timeline/Timeline";
import {DeliveryTimeline} from "@/app/[locale]/dashboard/parcels/components/Timeline";
import useStatusStore from "@/store/statusesStore";
import {ListText} from "@/components/ui/ListText";

const Page = () => {

    const {locales, getLabelByCode} = useTranslationContext()
    const {parcel} = useParcelContext();

    const {ORDER, STATUS, DATE} = locales.pages.parcelDetails;

    const statuses = useStatusStore(state => state.statuses)

    const methods = useForm({
        mode: 'onBlur'
    });

    return (
        <ParcelLoadingDataProvider value={{isPending: false}}>
            <FormProvider {...methods}>
                <div className={`  lg:max-w-[764px] bg-white w-auto  flex    z-[20]`}>
                    {
                        parcel?.payment?.status === 'paid' ? <DeliveryTimeline step={parcel.status as string}/> : <Timeline steps={{
                            [StepsEnum.created]: true,
                            [StepsEnum.content]: true,
                            [StepsEnum.tracking]: true,
                        }} step={'complete'}/>
                    }
                </div>
                <div className="flex flex-col gap-y-4 mt-10 max-lg:mt-8 max-md:mt-6 mb-4  lg:mb-8">
                    <div className="flex items-center gap-2">
                        <h3 className="text-title-2 text-gray-900 font-semibold">{ORDER}</h3>
                        <h3 className="text-title-2 text-gray-900 font-semibold">{parcel.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                        <ListText variant="big" left={STATUS} right={parcel?.status ? <ChipCustom variant={
                            getStatusInfo(parcel.status, getLabelByCode)[0]
                        }> {statuses.find(el => el.code === parcel.status)?.title as string}</ChipCustom> : null}/>
                        <ListText variant="big" left={getLabelByCode('STATUS_PAYMENT')} right={parcel?.payment ? <ChipCustom variant={
                            getStatusInfo(parcel.payment?.status as any, getLabelByCode)[0]
                        }>{statuses.find(el => el.code === parcel.payment?.status as any)?.title as string}</ChipCustom> : null}/>
                        <ListText variant="big" left={DATE} right={<ChipCustom variant={'grayLight'}>{convertDate(parcel.created_at, 'DD.MM.YYYY')}</ChipCustom>}/>
                    </div>
                </div>
                <div className="order-row">
                    <div className="cards-body xl:w-2/3">
                        <ParcelViewCard/>
                    </div>
                    <ParcelInfoCard className="drop-shadow-md" view/>
                </div>
            </FormProvider>
        </ParcelLoadingDataProvider>
    );
};

export default Page;
