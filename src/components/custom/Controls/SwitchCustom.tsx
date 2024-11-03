'use client'
import React from 'react';
import {useController, useFieldArray} from "react-hook-form";
import {Switch} from "@nextui-org/switch";
import {CheckBoxCustomProps} from './model/input';

const SwitchCustom = ({content, name, id}: CheckBoxCustomProps) => {

    const {field} = useController({
        name
    })

    const isChecked = id ? field?.value?.includes(id) : undefined

    const onChangeValue = (value: boolean) => {
        if (id) {
            let values = [...field.value] as number[]

            if (value) {
                field.onChange([...values, id])
            } else {
                field.onChange(values.filter(item => item !== id))
            }
        } else {
            field.onChange(value)
        }
    }

    return (
        <Switch value={field.value} isSelected={isChecked}  className="switch" classNames={{
            startContent: '!bg-indigo-600',
        }} onValueChange={onChangeValue} color="primary">
            {
                typeof content === 'string' ? <span className="text-small-3 !leading-list font-medium text-gray-4">{content}</span> :
                    content
            }
        </Switch>
    );
};

export default SwitchCustom;
