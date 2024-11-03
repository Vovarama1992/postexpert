'use client'
import React, {useCallback, useEffect} from 'react';
import {BoldEdit2Icon, BoxIcon, DropdownIcon, Link2Icon} from "@/assets";
import {classNames, declOfNum} from "@/utils";
import {useToggleState} from "@/hooks";
import ParcelTable from "@/components/common/Tables/ParcelTable";
import Image from "next/image";
import {useParcelContext, useTranslationContext} from "@/context";
import {getParcelImages, getServices} from "@/lib";
import Lightbox from "yet-another-react-lightbox";
import {useQuery} from "@tanstack/react-query";
import {useLocale} from "next-intl";
import useParcelStore from "@/store/parcelStore";
import {Button} from "@nextui-org/button";
import DialogTrackingEdit from "@/app/[locale]/dashboard/parcels/components/Dialogs/DialogTrackingEdit";
import { ListText } from '@/components/ui/ListText';
import {ParcelCard} from "@/components/ui/Card";

const listClassName = "gap-4 !items-start grid grid-cols-[200px_1fr] max-lg:grid-cols-[1fr_5fr] max-md:grid-cols-1"

const ParcelViewTable = () => {

    const {locales} = useTranslationContext()
    const { parcel } = useParcelContext();
    const locale = useLocale()
    const createdParcel = useParcelStore(state => state.createdParcel);
    const { state: show, toggle } = useToggleState(false);

    return (
        <div className="flex flex-col gap-y-[18px]">
            <ListText className={classNames(listClassName, {}, ['!items-center'])} variant="small"
                      left={locales.components.ParcelViewCard.CONTENT}
                      right={
                          <button onClick={toggle} className="flex h-8 justify-between items-center w-full">
                              {createdParcel?.products ? createdParcel?.products.length : parcel.items.length} {declOfNum(createdParcel?.products ? createdParcel?.products.length : parcel.items.length,
                              locale === 'en' ? ['position', 'positions', 'positions'] : ['позиция', 'позиции', 'позиций'])}
                              <DropdownIcon className={classNames('h-8 w-8 transition-transform', {
                                  '-rotate-90': show
                              })} />
                          </button>
                      }
            />
            <ParcelTable show={show} />
        </div>
    );
};

const ParcelViewCard = ({preview = false}: {preview?: boolean}) => {

    const {locales, getLabelByCode} = useTranslationContext()

    const { state: show, close, open } = useToggleState(false);

    const { state: showEdit, close: closeEdit, open: openEdit } = useToggleState(false);

    const { data: services } = useQuery({
        queryKey: ['services'],
        queryFn: () => getServices(),
    });

    const createdParcel = useParcelStore(state => state.createdParcel);

    const [images, setImages] = React.useState<string[]>([]);

    const { parcel } = useParcelContext();

    const _getTitleAddress = useCallback(() => {
        const address = createdParcel?.address ?? parcel.address

        if (address) {
            return <p className="flex-1 max-w-[509px]">{address?.country}, {address?.region}, {address?.locality}, {address?.street}, д. {address?.house}</p>;
        }
        return <p className="flex-1">{locales.components.ParcelViewCard.NO_RECIPIENT_SELECTED}</p>;
    }, [parcel.address, createdParcel]);

    const _getInsurance = () => {
        let listServices: any[] = [];
        const servicesArray = parcel?.service_ids;

        for (let i = 0; i < servicesArray.length; i++) {
            const service = services?.data?.find(el => el.id === servicesArray[i]);
            if (service) {
                listServices = [...listServices, `${service.title} - ${service.percentage}%`];
            }
        }

        return listServices.join(', ');
    };

    useEffect(() => {
        getParcelImages(parcel?.id).then(res => {
            setImages(res.data.map(image => image.src));
        });
    }, [parcel]);

    return (
        <ParcelCard className="bg-white border-gray-500" icon={BoxIcon} title={getLabelByCode('PARCEL_DATA')}>
            <div className="mt-6 space-y-[18px] pl-3 pb-[26px] border-b border-gray-200 border-dashed">
                <ListText className={listClassName} variant="small"
                          left={locales.components.ParcelAddressCard.RECIPIENT}
                          right={createdParcel?.warehouse?.recipient ?? parcel?.warehouse?.recipient} />
                <ListText className={listClassName} variant="small"
                          left={locales.components.ParcelViewCard.ADDRESS_POSTEXPERT}
                          right={<p className="max-w-[204px] max-sm:max-w-full">{
                              createdParcel?.warehouse ? createdParcel?.warehouse.address :
                              parcel?.warehouse ? parcel?.warehouse.address : locales.components.ParcelViewCard.NO_ADDRESS_SELECTED}</p>} />
                <ListText className={listClassName} variant="small"
                          left={locales.components.ParcelViewCard.ADDRESS_RUSSIA}
                          right={_getTitleAddress()} />
                <ListText className={listClassName} variant="small"
                          left={locales.components.ParcelViewCard.RECIPIENT_RUSSIA}
                          right={createdParcel?.recipient ?  `${createdParcel?.recipient?.name}, ${createdParcel?.recipient?.phone}` :
                              parcel?.recipient ? `${parcel?.recipient?.name}, ${parcel?.recipient?.phone}` : locales.components.ParcelViewCard.NO_RECIPIENT_SELECTED} />
                <ListText className={listClassName} variant="small"
                          left={locales.components.ParcelViewCard.TARIFF}
                          right={
                              <div className="flex items-center gap-2">
                                  {createdParcel?.tariff?.title ?? parcel?.tariff?.title ?? locales.components.ParcelViewCard.NO_ADDRESS_SELECTED}
                                  <Link2Icon />
                              </div>
                          } />
                <ListText className={listClassName} variant="small"
                          left={locales.components.ParcelViewCard.DELIVERY_METHOD}
                          right={`Postexpert ${createdParcel?.warehouse?.title ?? parcel?.warehouse?.title}`} />
            </div>
            <div className="py-[26px] pl-3 border-b border-gray-200 border-dashed">
                <ParcelViewTable />
            </div>
            <div className="py-[26px] pl-3 border-b border-gray-200 border-dashed">
                <ListText className={listClassName} variant="small"
                          left={locales.components.ParcelViewCard.ADDITIONAL_SERVICES}
                          right={_getInsurance()} />
            </div>
            <div className="flex items-start justify-between pt-[26px]">
                <div className=" pl-3 space-y-[18px]">
                    <ListText className={listClassName} variant="small"
                              left={locales.components.ParcelViewCard.TRACKING_NUMBER}
                              right={createdParcel?.tracking_code ?? parcel?.tracking_code ?? locales.components.ParcelViewCard.NO_TRACKING_NUMBER} />
                    <ListText className={listClassName} variant="small"
                              left={locales.components.ParcelViewCard.WEIGHT}
                              right={`${createdParcel?.sent_weight ?? parcel?.sent_weight ?? parcel?.weight} ${getLabelByCode('KG')}`} />
                </div>
                {
                    parcel.status === 'confirmed' && parcel.payment?.status === 'pending' ? <Button isIconOnly onClick={openEdit} variant="light">
                        <BoldEdit2Icon/>
                    </Button> : null
                }
            </div>
            {
                (!preview && images?.length) ? <div className="flex items-center gap-2 mt-[18px] flex-wrap">
                    {images.map((image, index) => (
                        <Image onClick={open} key={index} quality={100} className="rounded-xl cursor-pointer" src={image} alt={'order'} width={120} height={120} />
                    ))}
                </div> : null
            }
            <Lightbox
                open={show}
                close={close}
                slides={images.map(value => ({ src: value }))}
            />
            <DialogTrackingEdit isOpen={showEdit} onClose={closeEdit} />
        </ParcelCard>
    );
};

export default ParcelViewCard;
