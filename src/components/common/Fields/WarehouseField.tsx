'use client'
import React, {memo} from 'react';
import {useFormContext} from "react-hook-form";
import {useTranslationContext} from "@/context";
import {SelectCustom} from "@/components/custom";

const WarehouseField = () => {

    const {locales} = useTranslationContext()

    const {setValue} = useFormContext();

    const onSuccessWarehouse = (data: { data: any[] }) => {
        const defaultWarehouse = data.data.find(el => el.default);

        if (defaultWarehouse) {
            setValue('warehouse_id', defaultWarehouse.id);
            setValue('warehouse', defaultWarehouse);
        }
    }

    return (
        <SelectCustom
            size="md"
            onSuccess={onSuccessWarehouse}
            labelKey={'title'}
            queryKey={'warehouses'}
            name={"warehouse_id"}
            objectKey={'warehouse'}
            placeholder={locales.components.WarehouseField.PLACEHOLDER}
        />
    );
};

export default memo(WarehouseField);
