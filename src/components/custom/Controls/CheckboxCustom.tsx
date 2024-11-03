'use client'
import React from 'react';
import {Checkbox} from "@nextui-org/checkbox";
import {useController} from "react-hook-form";
import {CheckBoxCustomProps} from './model/input';
import {parseStringToNextLink} from "@/utils";

const CheckboxCustom = ({content, name}: CheckBoxCustomProps) => {

    const {field, fieldState: {error}} = useController({
        name
    })

    return (
        <Checkbox className="checkbox" value={field.value} onValueChange={field.onChange} color="primary">
            {
                typeof content === 'string' ?
                    <div className="text-small-3 font-medium text-gray-4">
                        {parseStringToNextLink(content)}
                    </div> :
                    content
            }
        </Checkbox>
    );
};

export default CheckboxCustom;
