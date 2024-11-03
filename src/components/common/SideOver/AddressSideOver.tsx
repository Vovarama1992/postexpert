'use client'
import React, {useEffect} from 'react';
import {SideOverType} from "./model/sideOver";
import {FormProvider, useForm, useWatch} from "react-hook-form";
import {parseErrorsToForm} from "@/utils";
import {AddressType, AddressTypeForm} from "@/types";
import {z, ZodType} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addAddress, updateAddress} from "@/lib";
import {toast} from "react-toastify";
import {useTranslationContext} from "@/context";
import SideOver from './SideOver';
import Address from "@/components/common/Fields/Address";
import {InputCustom, SwitchCustom, TextareaCustom} from "@/components/custom";

const defaultValues = {
    line1: '',
    title: '',
    country: '',
    zip_code: '',
    additional_information: '',
    additional: false,
    type: '',
    region: '',
    locality: '',
    street: '',
    house: '',
    building: '',
    apartment: '',
    is_default: false
}

const AddressSideOver = ({
                             isOpen,
                             onClose,
                             address
                         }: SideOverType & { address?: AddressType }) => {

    const {locales, getLabelByCode} = useTranslationContext()

     const AddressSchema: ZodType = z
        .object({
            country: z.string().min(3, locales.components.AddressSideOver.REQUIRED_FIELD),
            region: z.string().optional(),
            zip_code: z.string().min(3, locales.components.AddressSideOver.REQUIRED_FIELD),
            locality: z.string().min(3, locales.components.AddressSideOver.REQUIRED_FIELD).optional(),
            is_default: z.boolean()
                .or(z.literal('')),
            additional_information: z.string().optional()
                .or(z.literal('')),
            street: z.string().min(3, locales.components.AddressSideOver.REQUIRED_FIELD).optional()
                .or(z.literal('')),
            house: z.string().min(1, locales.components.AddressSideOver.REQUIRED_FIELD).optional()
                .or(z.literal('')),
            building: z.string().min(1, locales.components.AddressSideOver.REQUIRED_FIELD).optional()
                .or(z.literal('')),
            apartment: z.string().min(1, locales.components.AddressSideOver.REQUIRED_FIELD).optional()
                .or(z.literal('')),
        });

    const methods = useForm<AddressTypeForm>({
        defaultValues,
        mode: 'onBlur',
        resolver: zodResolver(AddressSchema)
    })

    const queryClient = useQueryClient()

    const {
        handleSubmit, control,
        reset, setError, formState: {isValid}
    } = methods

    const additional = useWatch({control, name: 'additional'})

    const {isPending: isPendingAdd, mutate: onAddAddress} =
        useMutation({
            mutationFn: addAddress,
            onSuccess: (data) => {
                // @ts-ignore
                onClose(data?.data)
                reset(defaultValues)
                queryClient.invalidateQueries({queryKey: ['addresses']})
            }
        })

    const {isPending: isPendingUpdate, mutate: onUpdateAddress} =
        useMutation({
            mutationFn: updateAddress,
            mutationKey: ['addresses'],
            onError: (e) => parseErrorsToForm({
                response: e
            }, setError, true),
            onSuccess: (data) => {
                toast.success(data.message)
                onClose()
                reset(defaultValues)
                // queryClient.invalidateQueries({queryKey: ['addresses']})
            },
            onSettled: () => queryClient.invalidateQueries({ queryKey: ['addresses'] }),
        })

    const onSubmit = async (data: AddressTypeForm): Promise<void> => {
        if (address) onUpdateAddress({...data, id: address.id})
        else onAddAddress(data)
    }

    useEffect(() => {
        if (address && isOpen) {
            reset({
                country: address.country ?? '',
                zip_code: address.zip_code ?? '',
                additional_information: address.additional_information ?? '',
                region: address.region ?? '',
                locality: address.locality ?? '',
                street: address.street ?? '',
                house: address.house ?? '',
                building: address.building ?? '',
                apartment: address.apartment ?? '',
                is_default: address.is_default ?? false
            })
        } else if (!address && isOpen) {
            reset(defaultValues)
        }
    }, [address, isOpen])

    return (
        <SideOver title={locales.components.AddressSideOver.TITLE} isValid={isValid} isSubmitting={isPendingAdd || isPendingUpdate}
                  onSubmit={handleSubmit(onSubmit)} isOpen={isOpen}
                  onClose={onClose}>
            <FormProvider {...methods}>
                <Address/>
                <div className="side-over-row">
                    <InputCustom variant="light" label={locales.components.AddressSideOver.COUNTRY} name="country"/>
                    <InputCustom variant="light" label={locales.components.AddressSideOver.REGION} name="region"/>
                </div>
                <div className="side-over-row">
                    <InputCustom variant="light" label={locales.components.AddressSideOver.LOCALITY} name="locality"/>
                    <InputCustom variant="light" label={locales.components.AddressSideOver.STREET} name="street"/>
                </div>
                <div className="side-over-row">
                    <InputCustom variant="light" label={locales.components.AddressSideOver.HOUSE} name="house"/>
                    <InputCustom variant="light" label={locales.components.AddressSideOver.BUILDING} name="building"/>
                    <InputCustom variant="light" label={locales.components.AddressSideOver.APARTMENT} name="apartment"/>
                </div>
                <div className="side-over-row">
                    <InputCustom variant="light" label={locales.components.AddressSideOver.ZIP_CODE}  name="zip_code"/>
                </div>
                <div className="side-over-row">
                    <SwitchCustom content={locales.components.AddressSideOver.SET_DEFAULT} name={'is_default'}/>
                    <SwitchCustom content={locales.components.AddressSideOver.ADDITIONAL_INFO} name={'additional'}/>
                </div>
                {
                    additional ? <TextareaCustom name="additional_information" label={locales.components.AddressSideOver.ADDITIONAL_INFO_LABEL}/> : null
                }
            </FormProvider>
        </SideOver>
    );
};

export default AddressSideOver;
