'use client';
import React from 'react';
import {Send2Icon} from "@/assets";
import {FormProvider, useForm} from "react-hook-form";
import {useTranslationContext} from "@/context";
import {z, ZodType} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {FeedbackFields} from "@/types/contact";
import {$api} from "@/lib";
import {useLocale} from "next-intl";
import {ResponseData} from "@/types";
import {toast} from "react-toastify";
import {CheckBoxCustom, IndigoButton, InputCustom, TextareaCustom} from "@/components/custom";

const defaultValues = {
    name: '',
    phone: '',
    email: '',
    text: '',
    agree: false,
}

const ContactForm = ({fields}: { fields: FeedbackFields }) => {

    const {locales} = useTranslationContext()

    const locale = useLocale()

    const {MESSAGE, AGREE_POLICY, SEND} = locales.pages.support;

    const SupportSchema: ZodType = z
        .object({
            name: z.string().min(3, locales.components.ProfileSideOver.REQUIRED_FIELD),
            phone: z.string().min(3, locales.components.ProfileSideOver.REQUIRED_FIELD).optional()
                .or(z.literal('')),
            text: z.string({required_error: MESSAGE, invalid_type_error: MESSAGE}).min(5, MESSAGE).optional(),
            email: z.string().min(3, locales.components.ProfileSideOver.REQUIRED_FIELD).email(locales.components.ProfileSideOver.INVALID_EMAIL),
            // @ts-ignore
            agree: z.boolean().refine((value) => value, {
                message: AGREE_POLICY,
                invalid_type_error: AGREE_POLICY,
            })
        });

    type FormValues = z.infer<typeof SupportSchema>;

    const methods = useForm<FormValues>({
        resolver: zodResolver(SupportSchema),
        defaultValues,
        mode: 'onBlur'
    })

    const {
        handleSubmit, formState: {isSubmitting, isValid, errors}
    } = methods

    const onSubmit = async (data: FormValues) => {
        const res = await $api.post<ResponseData>('/site/send-contacts', {
            email: data.email,
            name: data.name,
            message: data.text,
            phone: data.phone,
        }, {
            headers: {
                locale
            }
        })

        toast.success(res.data.message)

    }

    return (
        <FormProvider {...methods} >
            <form className="border-card gap-[18px]"
                  onSubmit={handleSubmit(onSubmit)}>
                <InputCustom variant="light" label={fields.name} name="name"/>
                <InputCustom label={fields.phone} name="phone"/>
                <InputCustom variant="light" label={fields.email} type="email" name="email"/>
                <TextareaCustom variant="light" label={fields.message} name={'text'}/>
                <CheckBoxCustom content={fields.consent_to_security_policy} name={'agree'}/>
                <IndigoButton type="submit" disabled={!isValid || isSubmitting} endContent={<Send2Icon/>} isLoading={isSubmitting}>
                    {SEND}
                </IndigoButton>
            </form>
        </FormProvider>
    );
};

export default ContactForm;
