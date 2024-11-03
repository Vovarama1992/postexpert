'use client'
import React from 'react';
import {z, ZodType} from "zod";
import {useAuthContext, useTranslationContext} from "@/context";
import {FormProvider, useForm} from "react-hook-form";
import {register, RegisterForm} from "@/lib";
import {zodResolver} from "@hookform/resolvers/zod";
import {getSession, signIn} from "next-auth/react";
import {Session} from "next-auth";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {parseErrorsToForm} from "@/utils";
import {Button} from "@nextui-org/button";
import {InputCustom} from "@/components/custom";

const defaultValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
}

const Page = () => {

    const {locales} = useTranslationContext()

    const {
        NAME,
        EMAIL,
        PASSWORD,
        PASSWORD_CONFIRMATION,
        GENERATE_PASSWORD,
        REGISTER,
        REQUIRED_FIELD,
        INVALID_EMAIL,
        MIN_LENGTH_PASSWORD,
        PASSWORDS_DO_NOT_MATCH
    } = locales.pages.register;

    const RegisterSchema: ZodType = z
        .object({
            name: z.string().min(3, REQUIRED_FIELD),
            email: z.string().email(INVALID_EMAIL),
            password: z.string().min(8, MIN_LENGTH_PASSWORD),
            password_confirmation: z.string(),
        }).refine((data) => data.password === data.password_confirmation, {
            message: PASSWORDS_DO_NOT_MATCH,
            path: ["password_confirmation"],
        });

    const {onSignIn} = useAuthContext()
    const methods = useForm<RegisterForm>({
        resolver: zodResolver(RegisterSchema),
        defaultValues,
        mode: 'onBlur'
    })

    const {
        handleSubmit, setValue, setFocus, setError
        , formState: {isValid, isSubmitting}
    } = methods

    const onSubmit = async (data: RegisterForm) => {
        try {
            const response = await register(data)

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

        } catch (e: any | AxiosError) {
            parseErrorsToForm({
                response: e
            }, setError, true)
        }
    }

    const onGeneratePassword = () => {
        const randPassword = Math.random().toString(36).slice(-8);

        setValue('password', randPassword)
        setValue('password_confirmation', randPassword)
        setFocus('password')
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4 w-full">
                <InputCustom variant="gray" required label={NAME} name="name"/>
                <InputCustom variant="gray" required label={EMAIL} type="email" name="email"/>
                <InputCustom variant="gray" required label={PASSWORD} type="password" name="password"/>
                <InputCustom variant="gray" required label={PASSWORD_CONFIRMATION} type="password"
                             name="password_confirmation"/>
                <button onClick={onGeneratePassword} type="button"
                        className="text-indigo-500 text-sm font-medium self-start select-none">
                    {GENERATE_PASSWORD}
                </button>
                <Button isLoading={isSubmitting} type="submit" isDisabled={!isValid}
                        className="bg-indigo-500 h-[52px] text-sm font-medium leading-normal"
                        color="primary">
                    {REGISTER}
                </Button>
            </form>
        </FormProvider>
    );
};

export default Page;
