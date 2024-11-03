import React from 'react';
import { BoxOrderIcon, Link2Icon } from "@/assets";
import { Link } from "@/navigation";
import ChipCustom from "@/components/custom/Chip/ChipCustom";
import { Parcel } from "@/types";
import { getStatusInfo } from "@/utils";
import {useTranslationContext} from "@/context";
import useStatusStore from "@/store/statusesStore";
import { ListText } from '@/components/ui/ListText';

interface ParcelRowCardProps {
    card: Parcel
}

const ParcelRowCard = ({
                           card
                       }: ParcelRowCardProps) => {

    const {locales, getLabelByCode} = useTranslationContext()

    const contentStep = card.steps?.created && !card.steps?.content && !card.steps?.tracking
    const createStep = !card.steps?.created && !card.steps?.content && !card.steps?.tracking
    const trackingStep = card.steps?.created && card.steps?.content && !card.steps?.tracking

    const statuses = useStatusStore(state => state.statuses)

    return (
        <Link
            // @ts-ignore
            href={card.status === 'draft' ? `/dashboard/parcels/create/${
                contentStep ? 'second-step' : createStep ? '' : trackingStep ? 'third-step' : ''
            }?parcelId=${card.id}` : `/dashboard/parcels/view/${card.id}`}
            className={`border-card hover:shadow-md lg:px-8
               transition-all active:bg-white  
               bg-white border-gray-200 flex flex-col gap-3 max-sm:gap-2`}>
            <div className="flex gap-2">
                <BoxOrderIcon width={18} height={21}/>
                <div className="flex-1 flex-col flex gap-4">
                    <div className="flex items-center gap-4 max-sm:gap-2 flex-wrap">
                        <ListText variant="big" left={locales.components.ParcelRowCard.ORDER} right={card.title}/>
                        <ListText variant="big" left={locales.components.ParcelRowCard.TRACKER} right={card.tracking_code}/>
                    </div>
                </div>
                <Link2Icon/>
            </div>
            <div className="flex items-center gap-x-4 gap-y-2 flex-wrap pl-[26px] max-w-[80%]">
                <ListText variant="big" left={locales.components.ParcelRowCard.SENDER} right={
                    <ChipCustom variant="grayLight">
                        {card?.warehouse?.country ?? locales.components.ParcelRowCard.UNKNOWN}
                    </ChipCustom>
                }/>
                <ListText variant="big" left={locales.components.ParcelRowCard.DELIVERY} right={
                    <ChipCustom variant="grayLight">
                        {card?.address?.country ?? locales.components.ParcelRowCard.UNKNOWN}{card?.address?.locality ? locales.components.ParcelRowCard.SEPARATOR : ''} {card?.address?.locality ?? locales.components.ParcelRowCard.UNKNOWN}
                    </ChipCustom>
                }/>
                <ListText variant="big" left={locales.components.ParcelRowCard.RECIPIENT} right={
                    <ChipCustom variant="grayLight">
                        {card?.recipient?.name ?? locales.components.ParcelRowCard.UNKNOWN}
                    </ChipCustom>
                }/>
                {card.status ? <ListText variant="big" left={locales.components.ParcelRowCard.STATUS} right={
                    <ChipCustom variant={getStatusInfo(card.status, getLabelByCode)[0]}>{
                        statuses?.find(el => el.code === card?.status)?.title
                    }
                    </ChipCustom>
                }/> : null}
                {card?.status !== 'draft' ? <ListText variant="big" left={getLabelByCode('STATUS_PAYMENT')}
                           right={card?.payment ? <ChipCustom variant={
                               getStatusInfo(card.payment?.status as any, getLabelByCode)[0]
                           }>{statuses.find(el => el.code === card.payment?.status as any)?.title as string}</ChipCustom> : null}/> : null}
            </div>
            <div className="w-full flex justify-end items-center pt-3 border-t border-gray-300 border-dashed ">
                <ListText variant="big" left={locales.components.ParcelRowCard.PAID} right={
                    <ChipCustom variant="grayLarge">
                        {card?.price ?? '0'} €
                    </ChipCustom>
                }/>
            </div>
        </Link>
    );
};

export default ParcelRowCard;
