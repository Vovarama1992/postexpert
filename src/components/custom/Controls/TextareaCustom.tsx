'use client'
import React, {memo, useState} from 'react';
import {Textarea} from "@nextui-org/input";
import {useController} from "react-hook-form";
import {EyeFilledIcon, EyeSlashFilledIcon,} from "@/assets";
import {classNames} from "@/utils";
import {InputCustomProps} from './model/input';

const TextareaCustom = ({label, name, type, required, placeholder, outerLabel, className, variant}: InputCustomProps & {
    outerLabel?: boolean
}) => {

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const {field, fieldState: {error}} = useController({
        name,
    })

    const InputField = <Textarea
        label={outerLabel ? undefined : required ?
            <div className="gap-1  flex items-center group-data-[filled-within=true]:!text-[14px] text-gray-700 text-normal">
                <span className="">{label}</span>
                <span className="">*</span>
            </div> : label}
        variant="bordered"
        placeholder={placeholder} onBlur={field.onBlur}
        required={required}
        isInvalid={!!error}
        errorMessage={error?.message}
        classNames={{
            input: 'text-gray-900 placeholder:!text-gray-900 text-base', label: '!text-gray-500 group-data-[filled-within=true]:!text-[14px]',
        }}
        className={
            classNames("min-h-14 placeholder:!text-[#A1A1AA] text-gray-700 ", {
                'wrapper-gray': variant === 'gray',
                'wrapper-light': variant === 'light',
            }, [className])
        }
        value={field.value}
        onValueChange={field.onChange}
        size="md"
        type={type === 'password' ? isVisible ? "text" : "password" : type}
        endContent={
            type === 'password' ?
                <button className="focus:outline-none  items-center absolute right-2 top-1/2 transform -translate-y-1/2"
                        type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                    )}
                </button> : undefined
        }
    />

    if (outerLabel) {
        return <div className="flex flex-col gap-1">
            <div className="gap-1 font-medium flex items-center text-sm">
                <span className="text-[#3F3F46]">{label}</span>
                {required ? <span className="text-gray-700">*</span> : null}
            </div>
            {InputField}
        </div>
    }

    return (
        InputField
    );
};

export default memo(TextareaCustom);
