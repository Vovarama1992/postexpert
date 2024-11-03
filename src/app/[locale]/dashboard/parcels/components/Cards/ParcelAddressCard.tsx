'use client'
import React, {useCallback, useEffect} from 'react';
import { GPSIcon, TourIcon } from "@/assets";
import {useTranslationContext} from "@/context";
import { Button } from "@nextui-org/button";
import { useTour } from "@reactour/tour";
import useParcelStore from "@/store/parcelStore";
import {ListText} from "@/components/ui/ListText";
import {ParcelCard} from "@/components/ui/Card";

const ParcelAddressCard = () => {

    const {locales, getLabelByCode} = useTranslationContext()

    const { setIsOpen, isOpen } = useTour()

    const parcel = useParcelStore(state => state.parcel);

    const _getTitleAddress = useCallback(() => {
        const address = parcel!.address;
        if (address) {
            return <p className="flex-1 max-w-[509px]">{address?.country}, {address?.region}, {address?.locality}, {address?.street}, д. {address?.house}</p>;
        }
        return <p className="flex-1">{locales.components.ParcelViewCard.NO_RECIPIENT_SELECTED}</p>;
    }, [parcel!.address]);

    const warehouse = parcel?.warehouse

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'inherit';
        }
    }, [isOpen]);

    return (
        <ParcelCard
            right={
                <Button onClick={() => setIsOpen(true)} isIconOnly type="button" variant="light">
                    <TourIcon />
                </Button>
            }
            icon={GPSIcon}
            title={warehouse ? `${locales.components.ParcelAddressCard.DELIVERY_ADDRESS_TITLE_WITH_WAREHOUSE} ${warehouse.title}` : locales.components.ParcelAddressCard.DELIVERY_ADDRESS_TITLE}
        >
            <div className="mt-6 space-y-6">
                <ListText
                    className={'list-row'}
                    variant="small"
                    left={getLabelByCode('POSTEXPERT_ADDRESS')}
                    right={warehouse ? warehouse.address : locales.components.ParcelAddressCard.UNKNOWN}
                />
                <ListText
                    className={'list-row'}
                    variant="small"
                    left={locales.components.ParcelViewCard.ADDRESS_RUSSIA}
                    right={_getTitleAddress()}
                />
            </div>
        </ParcelCard>
    );
};

export default ParcelAddressCard;
