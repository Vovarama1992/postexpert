'use client'
import React from 'react';
import {classNames} from "@/utils";
import {CardAddressProps} from "./model/cardAddress";
import {Button} from "@nextui-org/button";
import {AddCircleIcon, BoldEdit2Icon, UserCircleAdd} from "@/assets";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteAddress} from "@/lib";
import {toast} from "react-toastify";
import ChipCustom from "@/components/custom/Chip/ChipCustom";
import {useTranslationContext} from "@/context";
import InfoCustom from "@/components/custom/Info/InfoCustom";
import { confirmDeleteDialog } from '@/components/common/Dialogs/DeleteDialog';
import {BlackButton, DeleteButton} from "@/components/custom";
import {SkeletonWrapper} from "@/components/ui/Skeleton";
import {Card} from "@/components/ui/Card";
import {ListText} from "@/components/ui/ListText";

const AddressCard = ({ready = true, empty, onOpen, data}: CardAddressProps) => {

    const {locales, getLabelByCode} = useTranslationContext()

    const queryClient = useQueryClient();

    const {mutate: onDeleteAddress} = useMutation({
        mutationFn: deleteAddress,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({queryKey: ['addresses']});
        }
    });

    const onDelete = async () => {
        const confirmDelete = await confirmDeleteDialog({
            title: locales.components.AddressCard.DELETE_ADDRESS,
        });

        if (confirmDelete && data) {
            onDeleteAddress(data?.id);
        }
    };

    const actions = empty ? null : (
        <div className="flex items-center gap-4">
            <DeleteButton onClick={onDelete}>
                {locales.components.AddressCard.DELETE}
            </DeleteButton>
            <BlackButton onClick={onOpen(data)} size="lg" className="!rounded-[12px]" endContent={<BoldEdit2Icon height={16} width={16}/>}>
                {locales.components.AddressCard.EDIT}
            </BlackButton>
        </div>
    );

    const renderTop = () => {
        return (
            <div className="card-top">
                <div >
                    <UserCircleAdd width={18} height={18}/>
                    <div className="flex items-center gap-2">
                        <h6 className="card-title">
                            {locales.components.AddressCard.DELIVERY_ADDRESS}
                        </h6>
                        <InfoCustom content={getLabelByCode('DELIVERY_ADDRESS_HELPER')}/>
                    </div>
                </div>
                <Button isIconOnly onClick={!empty ? onOpen(data) : onOpen()} variant="light">
                    {empty ? <AddCircleIcon height={32} width={32} className="text-indigo-600"/> : <BoldEdit2Icon/>}
                </Button>
            </div>
        );
    };

    return (
        <SkeletonWrapper ready={ready} type={'address'}>
            <Card top={renderTop()} actions={actions} mainClassName={classNames('', {'pb-6': empty})}>
                {!empty && (
                    <div className="mt-6">
                        {data?.is_default && <ChipCustom className="mb-2" variant={'teal'}>{locales.components.AddressCard.DEFAULT}</ChipCustom>}
                        <div className="grid grid-cols-2 justify-between ">
                            <div className="flex flex-col">
                                <ListText className="!items-start" left={locales.components.AddressCard.COUNTRY} right={data?.country} variant="middle"/>
                                <ListText left={locales.components.AddressCard.CITY} right={data?.locality} variant="middle"/>
                                <ListText left={locales.components.AddressCard.HOUSE} right={data?.house} variant="middle"/>
                                <ListText left={locales.components.AddressCard.ZIP_CODE} right={data?.zip_code} variant="middle"/>
                            </div>
                            <div className="flex flex-col">
                                <ListText className="!items-start" left={locales.components.AddressCard.REGION} right={data?.region} variant="middle"/>
                                <ListText left={locales.components.AddressCard.STREET} right={data?.street} variant="middle"/>
                                <ListText left={locales.components.AddressCard.APARTMENT} right={data?.apartment} variant="middle"/>
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </SkeletonWrapper>
    );
};

export default AddressCard;
