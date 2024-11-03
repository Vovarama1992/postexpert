'use client'
import React, {useEffect} from 'react';
import {FilterIcon, SearchIcon} from "@/assets";
import {FormProvider, useForm} from "react-hook-form";
import _ from "lodash";
import {parseAsInteger, useQueryState} from "nuqs";
import {useTranslationContext} from "@/context";
import {InputCustom} from "@/components/custom";

interface SearchPanelWidgetProps {
    label: string;
    name: string;
}

const SearchPanelWidget = ({label, name}: SearchPanelWidgetProps) => {

    const {locales} = useTranslationContext()

    const methods = useForm({})

    const [query, setQuery] = useQueryState(name, {clearOnDefault: true})
    const [__, setCurrentPage] = useQueryState('page', parseAsInteger)

    const {watch} = methods

    useEffect(() => {
        const debouncedCb = _.debounce(async (formValue) => {

            await setQuery(formValue[name])
            await setCurrentPage(1)

        }, 600);

        const subscription = watch(debouncedCb);

        return () => subscription.unsubscribe();
    }, [watch])

    useEffect(() => {
        if (query) {
            methods.reset({[name]: query})
        }
    }, [query]);

    return (
        <FormProvider {...methods}>
            <div
                className="border-card flex-row border-gray-200 bg-gray-100 w-full lg:px-8 flex gap-x-4 items-center">
                <div className="flex items-center gap-2">
                    <FilterIcon className="text-gray-900"/>
                    <span className="text-base font-semibold text-gray-800">{locales.components.SearchPanelWidget.SEARCH}</span>
                </div>
                <InputCustom  endContent={
                    <div
                        className="focus:outline-none  items-center absolute right-2 top-1/2 transform -translate-y-1/2">
                        <SearchIcon className="text-black" height={18} width={18}/>
                    </div>
                } className="min-h-12 h-12 max-w-[280px]" placeholder={label} name={name}/>
            </div>
        </FormProvider>
    );
};

export default SearchPanelWidget;
