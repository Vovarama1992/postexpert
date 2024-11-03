'use client'
import React, {memo} from 'react';
import {AddCircleIcon} from "@/assets";
import {useFormContext} from "react-hook-form";
import {useTranslationContext} from "@/context";
import {IconButton, SelectCustom} from "@/components/custom";
import {AddressSideOver} from "@/components/common/SideOver";
import {FieldWithSideOverType} from "@/components/common/Fields/model/field";

const AddressField: FieldWithSideOverType = ({
                                                 isOpen, onClose, onOpen, data
                                             }) => {

    const {locales} = useTranslationContext()

    const {
        setValue, getValues
    } = useFormContext()

    const onSuccessAddress = (data: { data: any[] }) => {
        const defaultAddress = data.data.find(el => el.is_default)

        if (defaultAddress && !getValues('address_id')) {
            setValue('address_id', defaultAddress.id)
            setValue('address', defaultAddress)
        }
    }

    const emptyRow = <div className="flex gap-2 items-center">
        <span className="text-[14px] text-gray-600">{locales.components.AddressField.NO_ADDRESSES}</span>
        <button type="button" className="text-[14px] text-gray-600 underline" onClick={onOpen}>{locales.components.AddressField.ADD}</button>
    </div>

    return (
        <div className="create-field">
            <SelectCustom
                onSuccess={onSuccessAddress}
                emptyRow={emptyRow}
                size="sm"
                labelKey={item => `${item.locality} ${item.street} ${item.house ? 'д. ' + item.house : ''}`}
                queryKey={'addresses'}
                name={"address_id"} objectKey={'address'} placeholder={locales.components.AddressField.SELECT_ADDRESS}/>
            <IconButton onClick={onOpen} icon={AddCircleIcon}/>
            <AddressSideOver address={data} isOpen={isOpen} onClose={onClose}/>
        </div>
    );
};

export default memo(AddressField);
