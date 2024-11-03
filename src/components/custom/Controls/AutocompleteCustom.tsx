'use client'
import React, {Key, memo, useCallback, useState} from 'react';
import {useController} from "react-hook-form";
import {useToggleState} from "@/hooks";
import {autocompleteFnList, AutocompleteCustomProps} from './model/input';
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import _ from "lodash";
import {SuggestionAddressData, SuggestionProductsData} from "@/lib";
import {useTranslationContext} from "@/context";
import useLocaleStore from "@/store/localeStore";

const transformResult = (queryKey: string, data: any) => {

    const locale = useLocaleStore.getState().locale;

    if (queryKey === 'locality') {
        return data.suggestions.map((item: SuggestionAddressData) => {
            return {
                label: item.data.city_with_type,
                value: item.data.city_with_type,
            }
        })
    }

    if (queryKey === 'products') {
        return data.suggestions.map((item: SuggestionProductsData) => {
            return {
                label: locale === 'ru' ? item.data.name_ru : item.data.name_en,
                value: locale === 'ru' ? item.data.name_ru : item.data.name_en,
            }
        })
    }

    return data
}

const loadData = async (queryKey: string, inputValue: string, setItems: (data: any) => void, stop: () => void) => {

    const queryFn = autocompleteFnList[queryKey as keyof typeof autocompleteFnList]

    if (inputValue.length === 0) {
        setItems([])
        stop()
        return;
    }

    const data = await queryFn(inputValue)

    stop()

    setItems(transformResult(queryKey, data))

};

const debouncedLoadData = _.debounce(loadData, 650);


const AutocompleteCustom = ({
                      name, queryKey, ...props
                  }: AutocompleteCustomProps) => {


    const {locales} = useTranslationContext()

    const {field, fieldState: {error}} = useController({
        name
    })

    const [items, setItems] = useState<any[]>([])

    const {
        state: isLoading, open: start, close: stop
    } = useToggleState(false)

    const onInputChange = useCallback((val: string) => {
        field.onChange(val);
        start()
        debouncedLoadData(queryKey, val, setItems, stop);
    }, [isLoading, start, queryKey]);

    const onSelectionChange = useCallback((key: Key) => {
        field.onChange(key as string);
    }, [items]);

    return (
        <Autocomplete
            {...props}
            aria-label="autocomplete"
            inputValue={field.value}
            isLoading={isLoading}
            items={items}
            isInvalid={!!error}
            label={props.label}
            errorMessage={error?.message}
            variant="bordered"
            isClearable={false}
            allowsCustomValue
            allowsEmptyCollection
            // @ts-ignore
            onSelectionChange={onSelectionChange}
            onInputChange={onInputChange} inputProps={{
                classNames: {
                    input: '!text-gray-900 placeholder:!text-gray-900 !text-base',
                }
        }}
            listboxProps={{
                emptyContent: locales.components.AutocompleteCustom.EMPTY_LIST
            }}
        >
            {(item) => (
                <AutocompleteItem key={item.value} className="capitalize">
                    {item.label}
                </AutocompleteItem>
            )}
        </Autocomplete>
    );
};

export default memo(AutocompleteCustom);
