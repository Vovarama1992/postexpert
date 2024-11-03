'use client'
import React from 'react';
import {parseErrorsToForm} from "@/utils";
import {
    KeySquareIcon,
    TickCircleIcon,
} from "@/assets";
import {z, ZodType} from "zod";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {PasswordUpdateForm, updatePassword} from "@/lib";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {useTranslationContext} from "@/context";
import {Card} from "@/components/ui/Card";
import {BlackButton, InputCustom} from "@/components/custom";


const PasswordCard = () => {

    const {locales} = useTranslationContext()

    const PasswordSchema: ZodType = z.object({
        password: z.string().min(8, locales.components.PasswordCard.MIN_LENGTH),
        password_old: z.string().min(8, locales.components.PasswordCard.MIN_LENGTH),
    });

    const defaultValues = {
        password: '',
        password_old: '',
    }

    const top = (
        <div className="card-top">
            <div>
                <KeySquareIcon/>
                <h6 className="card-title">
                    {locales.components.PasswordCard.CHANGE_PASSWORD}
                </h6>
            </div>
        </div>
    );

    const methods = useForm<PasswordUpdateForm>({
        resolver: zodResolver(PasswordSchema),
        defaultValues,
        mode: 'onBlur'
    });

    const {handleSubmit, setError, setFocus, setValue, formState: {isValid, isSubmitting}} = methods;

    const onSubmit = async (data: PasswordUpdateForm) => {
        try {
            const response = await updatePassword(data);
            toast.success(response.message);
        } catch (e: any | AxiosError) {
            parseErrorsToForm(e, setError);
        }
    }

    const onGeneratePassword = () => {
        const randPassword = Math.random().toString(36).slice(-8);
        setValue('password', randPassword);
        setFocus('password');
    }

    return (
        <Card mainClassName="pb-[14.5px] pt-6"   top={top}
              actions={
                  <BlackButton disabled={!isValid} isLoading={isSubmitting} size="lg"
                               onClick={handleSubmit(onSubmit)}
                               className="!rounded-[12px]"
                               endContent={<TickCircleIcon className="text-white" height={18} width={18}/>}>
                      {locales.components.PasswordCard.SAVE}
                  </BlackButton>
              }
        >
            <FormProvider {...methods}>
                <form className="side-over-row">
                    <InputCustom required label={locales.components.PasswordCard.ENTER_OLD_PASSWORD} type="password"
                                 name="password_old"/>
                    <InputCustom required label={locales.components.PasswordCard.NEW_PASSWORD} type="password"
                                 name="password"/>
                </form>
                <button onClick={onGeneratePassword} type="button"
                        className="text-indigo-500 mt-[14.5px] text-sm font-medium self-start select-none">
                    {locales.components.PasswordCard.GENERATE_PASSWORD}
                </button>
            </FormProvider>
        </Card>
    );
};

export default PasswordCard;
