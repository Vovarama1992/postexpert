'use client'
import React, {memo} from 'react';
import {PopoverContent, PopoverTrigger} from "@nextui-org/react";
import {Popover} from "@nextui-org/popover";
import {InfoFillIcon} from "@/assets";
import {Button} from "@nextui-org/button";
import {sendVerificationLink} from "@/lib";
import {toast} from "react-toastify";
import {useMutation} from "@tanstack/react-query";
import {useTranslationContext} from "@/context";

const EmailPopover = () => {

    const {locales} = useTranslationContext()

    const {isPending, mutate: onSendVerificationLink} = useMutation({
        mutationFn: sendVerificationLink,
        onError: () => {},
        onSuccess: ({data}) => {
            toast.success(data.message);
        }
    });

    const onSend = () => {
        onSendVerificationLink();
    }

    const content = (
        <PopoverContent className="bg-gray-800 !p-4 !rounded-xl flex flex-col max-w-[200px] gap-3">
            <p className="text-white text-small-1 font-medium">
                {locales.components.EmailPopover.NOT_VERIFIED}
            </p>
            <Button
                onClick={onSend}
                isLoading={isPending}
                type="button"
                className="bg-indigo-500 h-9 text-small-1 font-medium text-gray-100 rounded-lg w-full"
                color="primary"
            >
                {locales.components.EmailPopover.SEND}
            </Button>
        </PopoverContent>
    );

    return (
        <Popover size="md" placement="right-start" color="secondary">
            <PopoverTrigger>
                <button className="focus:outline-none">
                    <InfoFillIcon className="text-rose-400"/>
                </button>
            </PopoverTrigger>
            {content}
        </Popover>
    );
};

export default memo(EmailPopover);