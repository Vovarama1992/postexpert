'use client'
import React from 'react';
import {z, ZodType} from "zod";
import {useAuthContext, useTranslationContext} from "@/context";
import {FormProvider, useForm} from "react-hook-form";
import {LoginForm} from "@/lib";
import {zodResolver} from "@hookform/resolvers/zod";
import {getSession, signIn} from "next-auth/react";
import {Session} from "next-auth";
import {Button} from "@nextui-org/button";
import {useRouter} from "@/navigation";
import {toast} from "react-toastify";
import {InputCustom} from "@/components/custom";


const defaultValues = {
    email: '',
    remember: false,
    password: ''
}

const Page = () => {

    const {locales} = useTranslationContext()

    const {
        EMAIL,
        PASSWORD,
        FORGOT_PASSWORD,
        LOGIN,
        INVALID_EMAIL,
        MIN_LENGTH_PASSWORD,
    } = locales.pages.login;

    const {onSignIn} = useAuthContext()

    const router = useRouter()

    const LoginSchema: ZodType = z
        .object({
            email: z.string().email(INVALID_EMAIL),
            remember: z.boolean(),
            password: z.string().min(8, MIN_LENGTH_PASSWORD),
        });

    const methods = useForm<LoginForm>({
        resolver: zodResolver(LoginSchema),
        defaultValues,
        mode: 'onBlur'
    })

    const {
        handleSubmit, setError,
        formState: {isValid, isSubmitting}
    } = methods

    const onReset = () => {
        router.push('/reset')
    }

    const onSubmit = async (data: LoginForm) => {
        const res = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
            remember: true,
        })

        if (res?.ok) {
            const session = await getSession()

            if (session) {
                await onSignIn(session as unknown as Session)
            }

        } else if (res?.error) {

            toast.error(res?.error)
        }
    }

    return (
        <FormProvider {...methods}>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4 w-full">
                <InputCustom variant="gray" required label={EMAIL} type="email" name="email"/>
                <InputCustom variant="gray" required label={PASSWORD} type="password" name="password"/>
                <div className="flex items-center ">
                    <button onClick={onReset} type="button"
                            className="text-indigo-500 text-small-3 font-medium ">{FORGOT_PASSWORD}</button>
                </div>
                <Button isLoading={isSubmitting} type="submit" isDisabled={!isValid}
                        className="bg-indigo-500 h-[52px] text-sm font-medium leading-normal"
                        color="primary">
                    {LOGIN}
                </Button>
            </form>
        </FormProvider>
    );
};

export default Page;
