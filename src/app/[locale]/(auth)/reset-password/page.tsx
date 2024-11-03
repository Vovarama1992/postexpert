'use client'
import React, {useEffect} from 'react';
import {z, ZodType} from "zod";
import {useAuthContext, useTranslationContext} from "@/context";
import {useQueryState} from "nuqs";
import {FormProvider, useForm} from "react-hook-form";
import {confirmReset, ResetPasswordForm} from "@/lib";
import {zodResolver} from "@hookform/resolvers/zod";
import {getSession, signIn} from "next-auth/react";
import {Session} from "next-auth";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {parseErrorsToForm} from "@/utils";
import {Button} from "@nextui-org/button";
import {useRouter} from "@/navigation";
import {InputCustom} from "@/components/custom";

const defaultValues = {
    email: '',
    password: '',
    password_confirmation: ''
}

const Page = () => {

    const {locales} = useTranslationContext()

    const {
        TITLE,
        EMAIL,
        NEW_PASSWORD,
        CONFIRM_NEW_PASSWORD,
        SEND,
        INVALID_EMAIL,
        MIN_LENGTH_PASSWORD,
        PASSWORDS_DO_NOT_MATCH
    } = locales.pages.confirmReset;

    const ResetFormPasswordSchema: ZodType = z
        .object({
            email: z.string().email(INVALID_EMAIL),
            password: z.string().min(8, MIN_LENGTH_PASSWORD),
            password_confirmation: z.string(),
        }).refine((data) => data.password === data.password_confirmation, {
            message: PASSWORDS_DO_NOT_MATCH,
            path: ["password_confirmation"],
        });

    const router = useRouter()
    const {onSignIn} = useAuthContext()
    const [token] = useQueryState('token')
    const methods = useForm<Omit<ResetPasswordForm, 'token'>>({
        resolver: zodResolver(ResetFormPasswordSchema),
        defaultValues,
        mode: 'onBlur'
    })

    const {
        handleSubmit, setError
        , formState: {isValid, isSubmitting}
    } = methods

    const onSubmit = async (data: Omit<ResetPasswordForm, 'token'>) => {
        try {

            if (token) {
                const response = await confirmReset({
                    ...data, token
                })

                const res = await signIn("credentials", {
                    redirect: false,
                    email: data.email,
                    password: data.password,
                })

                if (res?.ok) {
                    const session = await getSession()

                    if (session) {
                        await onSignIn(session as unknown as Session)
                        toast.success(response.message)
                    }

                }
            }

        } catch (e: any | AxiosError) {
            parseErrorsToForm(e, setError)
        }
    }

    useEffect(() => {
        if (!token) {
            router.push('/')
        }
    }, [token]);

    return <>
        <h5 className="mt-[1.125rem] text-[#27272A] text-2xl font-[650]">{TITLE}</h5>
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4 w-full">
                <InputCustom variant="gray" required label={EMAIL} type="email" name="email"/>
                <InputCustom variant="gray" required label={NEW_PASSWORD} type="password" name="password"/>
                <InputCustom variant="gray" required label={CONFIRM_NEW_PASSWORD} type="password"
                             name="password_confirmation"/>
                <Button isLoading={isSubmitting} type="submit" isDisabled={!isValid}
                        className="bg-indigo-500 h-[52px] text-sm font-medium leading-normal"
                        color="primary">
                    {SEND}
                </Button>
            </form>
        </FormProvider>
    </>;
};

export default Page;
