'use client'
import React, {useEffect} from 'react';
import {SideOverType} from "./model/sideOver";
import {FormProvider, useForm} from "react-hook-form";
import {parseErrorsToForm} from "@/utils";
import {RecipientType, RecipientTypeForm} from "@/types";
import {z, ZodType} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addRecipient, updateRecipient} from "@/lib";
import {toast} from "react-toastify";
import {useTranslationContext} from "@/context";
import {InputCustom, SwitchCustom, TextareaCustom} from "@/components/custom";
import {SideOver} from "@/components/common/SideOver/index";

const defaultValues = {
    phone: '',
    email: '',
    name: '',
    additional_information: '',
    is_default: false
}

const RecipientsSideOver = ({
                                isOpen,
                                onClose,
                                address
                            }: SideOverType & {address?: RecipientType}) => {

    const {locales} = useTranslationContext()

    const RecipientSchema: ZodType = z
        .object({
            name: z.string().min(3, locales.components.RecipientsSideOver.REQUIRED_FIELD),
            additional_information: z.string().min(3, locales.components.RecipientsSideOver.REQUIRED_FIELD).optional()
                .or(z.literal('')),
            email: z.string().email(locales.components.RecipientsSideOver.EMAIL_INVALID).optional()
                .or(z.literal('')),
            is_default: z.boolean(),
            phone: z.string().optional()
                .or(z.literal('')),
        });

    const methods = useForm<RecipientTypeForm>({
        defaultValues,
        mode: 'onBlur',
        resolver: zodResolver(RecipientSchema)
    })

    const queryClient = useQueryClient()

    const {
        handleSubmit,
        reset, setError, formState: {isValid}
    } = methods

    const {isPending: isPendingAdd, mutate: onAddRecipient} =
        useMutation({
            mutationFn: addRecipient,
            mutationKey: ['recipients'],
            onError: (e) => parseErrorsToForm({
                response: e
            }, setError, true),
            onSuccess: (data) => {
                toast.success(data.message)
                onClose(data)
                reset(defaultValues)
            },
            onSettled: () => queryClient.invalidateQueries({ queryKey: ['recipients'] }),
        })

    const {isPending: isPendingUpdate, mutate: onUpdateRecipient} =
        useMutation({
            mutationFn: updateRecipient,
            onError: (e) => parseErrorsToForm({
                response: e
            }, setError, true),
            onSuccess: (data) => {
                toast.success(data.message)
                onClose()
                reset(defaultValues)
                queryClient.invalidateQueries({ queryKey: ['recipients'] })
            }
        })

    const onSubmit = async (data: RecipientTypeForm) => {
        if (address) onUpdateRecipient({...data, id: address.id})
        else onAddRecipient(data)
    }

    useEffect(() => {
        if (address && isOpen) {
            reset({
                phone: address?.phone ?? '',
                email: address?.email ?? '',
                name: address?.name ?? '',
                additional_information: address?.additional_information ?? '',
                is_default: address?.is_default ?? false
            })
        } else if (!address && isOpen) {
            reset(defaultValues)
        }
    }, [address, isOpen])

    return (
        <SideOver title={locales.components.RecipientsSideOver.TITLE} isValid={isValid} isSubmitting={isPendingAdd || isPendingUpdate}
                  onSubmit={handleSubmit(onSubmit)} isOpen={isOpen}
                  onClose={onClose}>
            <FormProvider {...methods}>
                <InputCustom required label={locales.components.RecipientsSideOver.NAME_LABEL} name="name"/>
                <div className="side-over-row">
                    <InputCustom label={locales.components.RecipientsSideOver.PHONE_LABEL} name="phone"/>
                    <InputCustom label={locales.components.RecipientsSideOver.EMAIL_LABEL} name="email"/>
                </div>
                <SwitchCustom content={locales.components.RecipientsSideOver.IS_DEFAULT_LABEL} name={'is_default'}/>
                <TextareaCustom name="additional_information" label={locales.components.RecipientsSideOver.ADDITIONAL_INFO_LABEL}/>
            </FormProvider>
        </SideOver>
    );
};

export default RecipientsSideOver;
