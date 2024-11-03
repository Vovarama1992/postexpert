'use client'
import React, {memo} from 'react';
import {useFormContext} from "react-hook-form";
import {useTranslationContext} from "@/context";
import {SelectCustom} from "@/components/custom";

const CountryField = ({isSite}: { isSite?: boolean }) => {

    const {locales, getLabelByCode} = useTranslationContext()

    const {setValue} = useFormContext();

    const onSuccessCountry = (data: { data: any[] }) => {
        if (data.data?.length === 1) {
            setValue('country_id', data.data[0].id);
            setValue('country', data.data[0]);
        }
    }

    return (
        <SelectCustom
            size="md"
            labelKey={'name'} label={getLabelByCode('COUNTRY')}
            onSuccess={onSuccessCountry} labelPlacement="inside"
            objectKey={'country'}
            name={"country_id"}
            placeholder={locales.components.CountryField.PLACEHOLDER}
            queryKey={isSite ? 'countriesSite' : 'countries'}
        />
    );
};

export default memo(CountryField);
