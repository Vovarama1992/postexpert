'use client'
import React, {useEffect} from 'react';
import {SideOverType} from "@/components/common/SideOver/model/sideOver";
import SideOver from './SideOver';
import {FormProvider, useForm} from "react-hook-form";
import {parseErrorsToForm} from "@/utils";
import {ProfileForm} from "@/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {updateProfile} from "@/lib";
import {toast} from "react-toastify";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {z, ZodType} from "zod";
import {useTranslationContext, useUserContext} from "@/context";
import {InputCustom, TextareaCustom} from "@/components/custom";

const defaultValues = {
    full_name: '',
    phone: '',
    email: '',
    additional_information: '',
}

const ProfileSideOver = ({
                             isOpen,
                             onClose
                         }: SideOverType) => {

    const {locales} = useTranslationContext()

    const ProfileSchema: ZodType = z
        .object({
            full_name: z.string().min(3, locales.components.ProfileSideOver.REQUIRED_FIELD),
            phone: z.string().min(11, locales.components.ProfileSideOver.REQUIRED_FIELD).optional()
                .or(z.literal('')),
            email: z.string().min(3, locales.components.ProfileSideOver.REQUIRED_FIELD).email(locales.components.ProfileSideOver.INVALID_EMAIL),
            additional_information: z.string().optional()
                .or(z.literal('')),
        });

    const queryClient = useQueryClient()

    const {profile} = useUserContext()

    const methods = useForm<ProfileForm>({
        defaultValues,
        mode: 'onBlur',
        resolver: zodResolver(ProfileSchema)
    })

    const {
        handleSubmit,
        reset, setError , formState: {isValid}
    } = methods

    const {isPending, mutate: onUpdateProfile} =
        useMutation({
            mutationFn: updateProfile,
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

    const onSubmit = async (data: ProfileForm): Promise<void> => {
        onUpdateProfile(data) // здесь try catch не нужен, тк юзается react query (у него другой механизм, catch будет бесполезен)
    }

    useEffect(() => {
        if (profile) {
            reset({
                full_name: profile.full_name ?? '',
                additional_information: profile.additional_information ?? '',
                email: profile.email,
                phone: profile.phone ?? ''
            })
        }
    }, [profile, isOpen])

    return (
        <SideOver title={locales.components.ProfileSideOver.TITLE} isValid={isValid} isSubmitting={isPending}
                  onSubmit={handleSubmit(onSubmit)} isOpen={isOpen}
                  onClose={onClose}>
            <FormProvider {...methods}>
                <InputCustom variant="light" required label={locales.components.ProfileSideOver.FULL_NAME_LABEL} name="full_name"/>
                <div className="side-over-row">
                    <InputCustom variant="light" label={locales.components.ProfileSideOver.PHONE_LABEL} name="phone"/>
                    <InputCustom variant="light" required label={locales.components.ProfileSideOver.EMAIL_LABEL} name="email"/>
                </div>
                <TextareaCustom name="additional_information" label={locales.components.ProfileSideOver.ADDITIONAL_INFO_LABEL}/>
            </FormProvider>
        </SideOver>
    );
};

export default ProfileSideOver;
