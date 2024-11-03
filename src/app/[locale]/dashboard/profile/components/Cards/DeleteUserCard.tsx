'use client'
import React from 'react';
import {ProfileDeleteIcon, TrashIcon} from "@/assets";
import {useTranslationContext} from "@/context";
import {deleteUser} from "@/lib";
import {signOut} from "next-auth/react";
import {toast} from "react-toastify";
import {BlackButton} from "@/components/custom";
import {Card} from "@/components/ui/Card";
import {confirmDeleteDialog} from "@/components/common/Dialogs/DeleteDialog";

const DeleteUserCard = () => {

    const {locales, getLabelByCode} = useTranslationContext()

    const onDeleteAccount = async () => {
        const confirmDelete = await confirmDeleteDialog({
            title: getLabelByCode('DELETE_ACCOUNT'),
        });

        if (confirmDelete ) {
            const response =  await deleteUser()

            const toastId = 'toast-delete';

            toast.info(<div dangerouslySetInnerHTML={{
                __html: response.message
            }}>
            </div>, {toastId})

            setTimeout(async () => {
                await signOut({redirect: false})
                window.location.href = '/'
            }, 5000)
        }
    }

    return (
        <Card
            actionsClassName="!bg-gray-100"
            top={
                <div className="card-top">
                    <div >
                        <ProfileDeleteIcon/>
                        <h6 className="card-title">
                            {locales.components.DeleteUserCard.DELETE_ACCOUNT}
                        </h6>
                    </div>
                </div>
            }
        >
            <div className="flex items-center justify-between mt-4">
                <p className="text-small-4 text-gray-700">
                    {locales.components.DeleteUserCard.DELETE_DESCRIPTION}
                </p>
                <BlackButton onClick={onDeleteAccount} color="default" size="lg" className="!rounded-[12px]" endContent={<TrashIcon height={16} width={16}/>}>
                    {locales.components.DeleteUserCard.DELETE}
                </BlackButton>
            </div>
        </Card>
    );
};

export default DeleteUserCard;
