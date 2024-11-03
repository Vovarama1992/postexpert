'use client'
import React, {memo} from 'react';
import {AddCircleIcon} from "@/assets";
import {useFormContext} from "react-hook-form";
import {useTranslationContext} from "@/context";
import {IconButton, SelectCustom} from "@/components/custom";
import {RecipientsSideOver} from "@/components/common/SideOver";
import {FieldWithSideOverType} from "@/components/common/Fields/model/field";

const RecipientsField: FieldWithSideOverType = ({
                                                    isOpen, onClose, onOpen, data
                                                }) => {

    const {locales} = useTranslationContext()

    const {setValue, getValues} = useFormContext();

    const onSuccessRecipient = (data: { data: any[] }) => {
        const defaultRecipient = data.data.find(el => el.is_default);

        if (defaultRecipient && !getValues('recipient_id')) {
            setValue('recipient_id', defaultRecipient.id);
            setValue('recipient', defaultRecipient);
        }
    }

    const emptyRow = (
        <div className="flex gap-2 items-center">
            <span className="text-[14px] text-gray-600">{locales.components.RecipientsField.NO_RECIPIENTS}</span>
            <button type="button" className="text-[14px] text-gray-600 underline" onClick={onOpen}>
                {locales.components.RecipientsField.ADD}
            </button>
        </div>
    );

    return (
        <div className="create-field">
            <SelectCustom
                size="sm"
                onSuccess={onSuccessRecipient}
                emptyRow={emptyRow}
                queryKey={'recipients'}
                labelKey={'name'}
                name={"recipient_id"}
                objectKey={'recipient'}
                placeholder={locales.components.RecipientsField.SELECT_RECIPIENT}
            />
            <IconButton onClick={onOpen} icon={AddCircleIcon}/>
            <RecipientsSideOver address={data} isOpen={isOpen} onClose={onClose}/>
        </div>
    );
};

export default memo(RecipientsField);
