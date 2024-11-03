'use client'
import React from 'react';
import {z} from "zod";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {reset} from "@/lib";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {parseErrorsToForm} from "@/utils";
import {Button} from "@nextui-org/button";
import {useTranslationContext} from "@/context";
import {InputCustom} from "@/components/custom";


const defaultValues = {
    email: '',
}

const Page = () => {

    const {locales} = useTranslationContext()

    const { EMAIL, SEND, INVALID_EMAIL } = locales.pages.reset;

    const ResetSchema = z
        .object({
            email: z.string().email(INVALID_EMAIL),
        });

    const methods = useForm<{ email: string }>({
        resolver: zodResolver(ResetSchema),
        defaultValues,
        mode: 'onBlur'
    })

    const {handleSubmit, setError, formState: {isValid, isSubmitting}} = methods

    const onSubmit = async (data: { email: string }) => {
        try {
            const response = await reset(data)

            toast.success(response.message)

        } catch (e: any | AxiosError) {
            parseErrorsToForm({
                response: e
            }, setError, true)
        }
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4 w-full">
                <InputCustom variant="gray" required label={EMAIL} type="email" name="email"/>
                <Button isLoading={isSubmitting} type="submit" isDisabled={!isValid}
                        className="bg-indigo-500 h-[52px] text-sm font-medium leading-normal"
                        color="primary">
                    {SEND}
                </Button>
            </form>
        </FormProvider>
    );
};

export default Page;
