'use client'
import React, {Key, useCallback, useState} from 'react';
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {useController, useFormContext} from "react-hook-form";
import _ from "lodash";
import {getAddresses, SuggestionData} from "./model/getAddress";
import {useToggleState} from "@/hooks";
import {useTranslationContext} from "@/context";

const loadData = async (inputValue: string, setItems: (data: SuggestionData[]) => void, stop: () => void) => {
    if (inputValue.length === 0) {
        setItems([]);
        stop();
        return;
    }

    const data = await getAddresses(inputValue);

    stop();

    setItems(data.suggestions);
};

const debouncedLoadData = _.debounce(loadData, 650);

const Address = () => {

    const {locales} = useTranslationContext()

    const {field, fieldState: {error}} = useController({
        name: 'line1'
    });
    const {setValue} = useFormContext();

    const [items, setItems] = useState<SuggestionData[]>([]);
    const {state: isLoading, open: start, close: stop} = useToggleState(false);

    const onInputChange = useCallback((val: string) => {
        field.onChange(val);
        start();
        debouncedLoadData(val, setItems, stop);
    }, [isLoading, start]);

    const onSelectionChange = useCallback((key: Key) => {
        const find = items.find(el => el.unrestricted_value === key);

        if (find) {
            setValue('country', find.data.country ?? '');
            setValue('region', find.data.region_with_type ?? '');
            setValue('locality', find.data.settlement_with_type ?? find.data.city_with_type ?? '');
            setValue('street', find.data.street_with_type ?? '');
            setValue('house', find.data.house ?? '');
            setValue('building', find.data.block ?? '');
            setValue('apartment', find.data.flat ?? '');
            setValue('zip_code', find.data.postal_code ?? '');
        }
    }, [items]);

    return (
        <Autocomplete
            inputValue={field.value}
            isLoading={isLoading}
            items={items}
            autoFocus
            size="lg"
            classNames={{
                base: 'pb-4 border-grey-300 border-dashed border-b',
            }}
            label={locales.components.Address.LABEL}
            placeholder={locales.components.Address.PLACEHOLDER}
            variant="bordered"
            // @ts-ignore
            onSelectionChange={onSelectionChange}
            onInputChange={onInputChange}
            inputProps={{
                classNames: {
                    label: '!text-gray-500',
                    input: 'text-gray-900 placeholder:!text-gray-900'
                }
            }}
            listboxProps={{
                emptyContent: locales.components.Address.EMPTY_LIST,
            }}
        >
            {(item) => (
                <AutocompleteItem key={item.unrestricted_value} className="capitalize">
                    {item.value}
                </AutocompleteItem>
            )}
        </Autocomplete>
    );
};

export default Address;
