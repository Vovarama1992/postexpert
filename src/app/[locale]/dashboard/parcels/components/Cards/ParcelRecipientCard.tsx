'use client';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {BoldEdit2Icon, UserTagIcon} from "@/assets";
import {Button} from "@nextui-org/button";
import {useToggleState} from "@/hooks";
import {useWatch, useFormContext} from "react-hook-form";
import {AddressType, PaginationData, RecipientType} from "@/types";
import {useTranslationContext, useUserContext} from "@/context";
import {QueryObserver, useQueryClient} from "@tanstack/react-query";
import _ from "lodash";
import {Transition} from "@headlessui/react";
import {ParcelCard} from "@/components/ui/Card";
import {ListText} from "@/components/ui/ListText";
import {MyAddressSideOver} from "@/components/common/SideOver";
import AddressField from "@/components/common/Fields/AddressField";
import RecipientsField from "@/components/common/Fields/RecipientsField";

const listClassName = "list-row";

const ParcelRecipientCard = () => {

    const {locales} = useTranslationContext()
    const [activeAddress, setActiveAddress] = useState<AddressType | undefined>();
    const [activeRecipient, setActiveRecipient] = useState<RecipientType | undefined>();

    const {state: showAddress, close: closeAddress, open: openAddress} = useToggleState(false);
    const {state: showRecipients, close: closeRecipients, open: openRecipients} = useToggleState(false);
    const {state: showMyAddress, close: closeMyAddress, open: openMyAddress} = useToggleState(false);

    const tariff_id = useWatch({name: 'tariff_id'});
    const address: AddressType | null = useWatch({name: 'address'});
    const recipient: RecipientType | null = useWatch({name: 'recipient'});

    const {profile} = useUserContext();
    const {setValue} = useFormContext();
    const queryClient = useQueryClient();

    const getTitleRecipient = useCallback(() => {
        if (recipient) {
            return <p className="flex-1">{recipient.name}{recipient?.phone ? ', ' : ''}{recipient.phone}</p>;
        }
        return <p className="flex-1">{locales.components.ParcelRecipientCard.NO_DATA}</p>;
    }, [recipient]);

    const getTitleAddress = useCallback(() => {
        if (address) {
            return <p className="flex-1">{address.country}, {address.region}, {address.locality}, {address.street},
                д. {address.house} {address.apartment ? `, кв. ${address.apartment}` : ``} {address.zip_code ? `, ${address.zip_code}` : ``}</p>;
        }
        return <p className="flex-1">{locales.components.ParcelRecipientCard.NO_DATA}</p>;
    }, [address]);

    const getTitleMyAddress = useMemo(() => {
        return [
            <p key={0} className="flex-1 line-clamp-2">{profile?.full_name ?? '-'}, {profile?.phone ?? '-'}</p>,
            <p key={1}
               className="flex-1 line-clamp-2">{profile?.line1 ?? '-'}{profile?.line1 && profile?.zip_code ? ',' : ''} {profile?.zip_code ?? '-'}</p>
        ];
    }, [profile]);

    const onOpenWithRecipient = useCallback(() => {
        if (recipient) {
            setActiveRecipient(recipient);
            openRecipients();
        }
    }, [recipient, openRecipients]);

    const onOpenWithAddress = useCallback(() => {
        if (address) {
            setActiveAddress(address);
            openAddress();
        }
    }, [address, openAddress]);

    const onCloseRecipient = useCallback((data?: any) => {

        console.log('call')

        if (data) {
            setValue('recipient', data);
            setValue('recipient_id', Number(data.id));
        }

        closeRecipients();

    }, []);

    const onCloseAddress = useCallback((data?: any) => {

        if (data) {
            console.log(data)
            setValue('address', data);
            setValue('address_id', Number(data.id));
        }

        closeAddress();

    }, []);

    useEffect(() => {
        const observerRecipients = new QueryObserver(queryClient, {queryKey: ['recipients', 20]});
        const unsubscribe = observerRecipients.subscribe(({data: listenData}) => {
            const data = listenData as PaginationData<RecipientType>;
            if (recipient) {
                const foundRecipient = data?.data?.find((item: RecipientType) => item.id === recipient?.id);
                if (!_.isEqual(foundRecipient, recipient)) {
                    if (foundRecipient) {
                        console.log('foundRecipient', foundRecipient)
                        setValue('recipient', foundRecipient);
                    }
                }
            }
        });
        return () => unsubscribe();
    }, [queryClient, recipient, setValue]);

    useEffect(() => {
        const observerAddress = new QueryObserver(queryClient, {queryKey: ['addresses', 20]});
        const unsubscribe = observerAddress.subscribe(({data: listenData}) => {
            const data = listenData as PaginationData<AddressType>;
            if (address) {
                const foundAddress = data?.data?.find((item: AddressType) => item.id === address.id);
                if (!_.isEqual(foundAddress, address)) {
                    if (foundAddress)
                        setValue('address', foundAddress);
                }
            }
        });
        return () => unsubscribe();
    }, [queryClient, address, setValue]);

    return (
        <Transition show={!!tariff_id} appear>
            <div className="transition duration-300 ease-in data-[closed]:opacity-0">
                <ParcelCard id="recipient" icon={UserTagIcon} title={locales.components.ParcelRecipientCard.TITLE}>
                    <div className="mt-5 side-over-row items-start max-lg:!grid-cols-1 ">
                        <AddressField data={activeAddress} isOpen={showAddress} onClose={onCloseAddress}
                                      onOpen={openAddress}/>
                        <RecipientsField data={activeRecipient} isOpen={showRecipients} onClose={onCloseRecipient}
                                         onOpen={openRecipients}/>
                    </div>
                    <div className="mt-11">
                        <div className="pb-4 border-b border-gray-300 border-dashed space-y-6">
                            <ListText className={listClassName} variant="small"
                                      left={locales.components.ParcelRecipientCard.RECIPIENT}
                                      right={
                                          <div className="flex items-start gap-6">
                                              {getTitleAddress()}
                                              <Button className="max-md:absolute max-md:right-0 max-md:top-0"
                                                      disabled={!address} onClick={onOpenWithAddress} isIconOnly
                                                      variant="light">
                                                  <BoldEdit2Icon/>
                                              </Button>
                                          </div>
                                      }
                            />
                            <ListText className={listClassName} variant="small"
                                      left=""
                                      right={
                                          <div className="flex items-start gap-6 justify-between">
                                              {getTitleRecipient()}
                                              <Button className="max-md:absolute max-md:right-0 max-md:top-0"
                                                      disabled={!recipient} onClick={onOpenWithRecipient} isIconOnly
                                                      variant="light">
                                                  <BoldEdit2Icon/>
                                              </Button>
                                          </div>
                                      }
                            />
                        </div>
                        <div className="pt-4 space-y-6 gap-4">
                            <ListText className={listClassName} variant="small"
                                      left={locales.components.ParcelRecipientCard.SENDER}
                                      right={getTitleMyAddress[0]}
                            />
                            <ListText className={listClassName} variant="small"
                                      left=""
                                      right={
                                          <div className="flex items-start gap-6">
                                              {getTitleMyAddress[1]}
                                              <Button className="max-md:absolute max-md:right-0 max-md:top-0"
                                                      onClick={openMyAddress} isIconOnly variant="light">
                                                  <BoldEdit2Icon/>
                                              </Button>
                                          </div>
                                      }
                            />
                        </div>
                    </div>
                    <MyAddressSideOver isOpen={showMyAddress} onClose={closeMyAddress}/>
                </ParcelCard>
            </div>
        </Transition>
    );
};

export default React.memo(ParcelRecipientCard);
