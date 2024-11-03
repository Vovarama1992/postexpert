'use client'
import React, {useEffect} from 'react';
import {SideOverType} from "./model/sideOver";
import {FormProvider, useForm, useWatch} from "react-hook-form";
import {parseErrorsToForm} from "@/utils";
import {MyAddressForm} from "@/types";
import {z, ZodType} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateMyAddress} from "@/lib";
import {toast} from "react-toastify";
import {useTranslationContext, useUserContext} from "@/context";
import {SideOver} from "@/components/common/SideOver/index";
import {InputCustom, SwitchCustom, TextareaCustom} from "@/components/custom";

const defaultValues = {
    line1: '',
    zip_code: '',
    additional_information: '',
}


const MyAddressSideOver = ({
                               isOpen,
                               onClose
                           }: SideOverType) => {

    const {locales} = useTranslationContext()

    const AddressSchema: ZodType = z
        .object({
            zip_code: z.string().min(3, locales.components.MyAddressSideOver.REQUIRED_FIELD),
            line1: z.string().min(3, locales.components.MyAddressSideOver.REQUIRED_FIELD),
            additional_information: z.string().optional()
                .or(z.literal('')),
        });

    const methods = useForm<MyAddressForm>({
        defaultValues,
        mode: 'onBlur',
        resolver: zodResolver(AddressSchema)
    })

    const queryClient = useQueryClient()

    const {profile} = useUserContext()

    const {
        handleSubmit, control,
        reset, setError, formState: {isValid}
    } = methods

    const additional = useWatch({control, name: 'additional'})

    const {isPending, mutate: onAddAddress} =
        useMutation({
            mutationFn: updateMyAddress,
            onError: (e) => parseErrorsToForm({
                response: e
            }, setError, true),
            onSuccess: (data) => {
                toast.success(data.message)
                onClose()
                reset(defaultValues)
                queryClient.invalidateQueries({ queryKey: ['profile'] })
            }
        })

    const onSubmit = async (data: MyAddressForm) => onAddAddress({...data, email: profile?.email as string})

    useEffect(() => {
        if (profile) {
            reset({
                line1: profile.line1 ?? '',
                additional_information: profile.additional_information ?? '',
                zip_code: profile.zip_code ?? '',
            })
        }
    }, [profile, isOpen])

    return (
        <SideOver title={locales.components.MyAddressSideOver.TITLE} isValid={isValid} isSubmitting={isPending}
                  onSubmit={handleSubmit(onSubmit)} isOpen={isOpen}
                  onClose={onClose}>
            <FormProvider {...methods}>
                <InputCustom variant="light" label={locales.components.MyAddressSideOver.LINE1_LABEL} name="line1"/>
                <div className="side-over-row">
                    <InputCustom variant="light" label={locales.components.MyAddressSideOver.ZIP_CODE_LABEL} name="zip_code"/>
                </div>
                <SwitchCustom content={locales.components.MyAddressSideOver.ADDITIONAL_INFO} name={'additional'}/>
                {
                    additional ? <TextareaCustom name="additional_information" label={locales.components.MyAddressSideOver.ADDITIONAL_INFO}/> : null
                }
            </FormProvider>
        </SideOver>
    );
};

export default MyAddressSideOver;
