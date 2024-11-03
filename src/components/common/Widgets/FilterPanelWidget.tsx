'use client'
import React, {memo, useEffect} from 'react';
import {FilterIcon, SearchIcon} from "@/assets";
import {FormProvider, useForm} from "react-hook-form";
import _ from "lodash";
import {parseAsInteger, useQueryState} from "nuqs";
import {useTranslationContext} from "@/context";
import useStatusStore from "@/store/statusesStore";
import {InputCustom, SelectCustom} from "@/components/custom";

const defaultValues = {
    number: '',
    status: '',
}

const FilterPanelWidget = () => {

    const {locales} = useTranslationContext()

    const methods = useForm({
        defaultValues
    })

    const statuses = useStatusStore(state => state.statuses)

    const [number, setNumber] = useQueryState('number', {clearOnDefault: true})
    const [status, setStatus] = useQueryState('status', {clearOnDefault: true})
    const [__, setCurrentPage] = useQueryState('page', parseAsInteger)

    const {watch} = methods

    useEffect(() => {
        const debouncedCb = _.debounce(async (formValue) => {

            if (number !== formValue?.number) {
                await setNumber(formValue?.number || null)
            }

            if (status !== String(formValue?.status)) {
                await setStatus(formValue?.status || null)
            }

            await setCurrentPage(1)

        }, 600);

        const subscription = watch(debouncedCb);

        return () => subscription.unsubscribe();

    }, [watch, number, status])

    useEffect(() => {
        if (number !== watch('number')) {
            methods.setValue('number', number ?? '')
        }
    }, [])

    useEffect(() => {

        if (status !== watch('status')) {
            methods.setValue('status', status ?? '')
        }
    }, [])

    return (
        <FormProvider {...methods}>
            <div
                className="border-card border-gray-200 bg-gray-100 w-full lg:px-8 gap-x-4 gap-y-4 lg:flex-row">
                <div className="flex items-center gap-2">
                    <FilterIcon className="text-gray-900"/>
                    <span className="text-base font-semibold text-gray-800">{locales.components.FilterPanelWidget.FILTERS}:</span>
                </div>
                <InputCustom classNames={{
                    input: "placeholder:!text-gray-700",
                }} endContent={
                    <div
                        className="focus:outline-none  items-center absolute right-2 top-1/2 transform -translate-y-1/2">
                        <SearchIcon className="text-black" height={18} width={18}/>
                    </div>
                } className="max-lg:max-w-full min-h-12 h-12 max-w-[358px]" placeholder={locales.components.FilterPanelWidget.ENTER_NUMBER} name={"number"} defaultValue={watch('number') || ''}/>
                <SelectCustom
                    labelKey="label"
                    placeholder={locales.components.FilterPanelWidget.STATUS}
                    size="sm"
                    className={'w-[358px] max-lg:w-full '}
                    rows={
                        statuses.map(el => {
                            return {
                                id: el.code, label: el.title
                            }
                        })
                    }
                    name={"status"} />
            </div>
        </FormProvider>
    );
};

export default memo(FilterPanelWidget);
