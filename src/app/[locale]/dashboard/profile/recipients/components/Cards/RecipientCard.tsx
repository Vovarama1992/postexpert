'use client'
import React from 'react';
import {classNames} from "@/utils";
import {CardRecipientProps} from "./model/cardRecipient";
import {AddCircleIcon, BoldEdit2Icon, UserCircleAdd} from "@/assets";
import {Button} from "@nextui-org/button";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteRecipient} from "@/lib";
import {toast} from "react-toastify";
import ChipCustom from "@/components/custom/Chip/ChipCustom";
import {useTranslationContext} from "@/context";
import InfoCustom from "@/components/custom/Info/InfoCustom";
import { confirmDeleteDialog } from '@/components/common/Dialogs/DeleteDialog';
import {BlackButton, DeleteButton} from "@/components/custom";
import {SkeletonWrapper} from "@/components/ui/Skeleton";
import {Card} from "@/components/ui/Card";
import {ListText} from "@/components/ui/ListText";

const RecipientCard = ({ready = true, empty, onOpen, data}: CardRecipientProps) => {

    const {locales, getLabelByCode} = useTranslationContext()

    const queryClient = useQueryClient();

    const {mutate: onDeleteRecipient} = useMutation({
        mutationFn: deleteRecipient,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({queryKey: ['recipients']});
        }
    });

    const onDelete = async () => {
        const confirmDelete = await confirmDeleteDialog({
            title: locales.components.RecipientCard.DELETE_RECIPIENT,
        });

        if (confirmDelete && data) {
            onDeleteRecipient(data.id);
        }
    };

    const actions = empty ? null : (
        <div className="flex items-center gap-4">
            <DeleteButton onClick={onDelete}>{locales.components.RecipientCard.DELETE}</DeleteButton>
            <BlackButton onClick={onOpen(data)} size="lg" className="!rounded-[12px]"
                         endContent={<BoldEdit2Icon height={16} width={16}/>}>
                {locales.components.RecipientCard.EDIT}
            </BlackButton>
        </div>
    );

    const renderTop = () => (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <UserCircleAdd width={18} height={18}/>
                <div className="flex items-center gap-2">
                    <h6 className="card-title">{locales.components.RecipientCard.RECIPIENT}</h6>
                    <InfoCustom content={getLabelByCode('RECIPIENT_HELPER')}/>
                </div>
            </div>
            <Button isIconOnly onClick={!empty ? onOpen(data) : onOpen()} variant="light">
                {empty ? <AddCircleIcon height={32} width={32} className="text-indigo-600"/> : <BoldEdit2Icon/>}
            </Button>
        </div>
    );

    return (
        <SkeletonWrapper ready={ready} type={'recipient'}>
            <Card
                top={renderTop()}
                actions={actions}
                mainClassName={classNames('', {'pb-6': empty})}
            >
                {!empty && (
                    <div className="flex flex-col mt-6">
                        {data?.is_default &&
                            <ChipCustom className="mb-2" variant="teal">{locales.components.RecipientCard.DEFAULT}</ChipCustom>}
                        <ListText left={locales.components.RecipientCard.FULL_NAME} right={data?.name}
                                  variant="middle"/>
                        <ListText left={locales.components.RecipientCard.EMAIL} right={data?.email} variant="middle"/>
                        <ListText left={locales.components.RecipientCard.PHONE} right={data?.phone} variant="middle"/>
                    </div>
                )}
            </Card>
        </SkeletonWrapper>
    );
};

export default RecipientCard;
