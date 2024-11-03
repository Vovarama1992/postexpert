'use client';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Input } from "@nextui-org/input";
import { useController } from "react-hook-form";
import { classNames } from "@/utils";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/assets";
import { InputCustomProps } from './model/input';
import {twMerge} from "tailwind-merge";

// Add CSS for autofill detection
const autofillCss = `
  @keyframes onAutoFillStart { from { } to { } }
  @keyframes onAutoFillCancel { from { } to { } }
  input:-webkit-autofill {
    animation-name: onAutoFillStart;
  }
  input:not(:-webkit-autofill) {
    animation-name: onAutoFillCancel;
  }
`;

const InputCustom = ({
                         label,
                         name,
                         type,
                         required,
                         placeholder,
                         className,
                         variant = 'light',
                         size,
                         endContent,
                         ...other
                     }: InputCustomProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const { field, fieldState: { error } } = useController({ name });
    const inputRef = useRef<HTMLInputElement>(null);

    const toggleVisibility = () => setIsVisible(!isVisible);

    useEffect(() => {
        const styleTag = document.createElement('style');
        styleTag.textContent = autofillCss;
        document.head.appendChild(styleTag);

        const onAnimationStart = (event: AnimationEvent) => {
            if (event.animationName === 'onAutoFillStart') {
                if (inputRef.current) {
                    inputRef.current.style.webkitTextFillColor = "#000";
                    inputRef.current.style.transition = "background-color 5000s ease-in-out 0s";
                }
            }
        };

        const inputElem = inputRef.current;
        if (inputElem) {
            inputElem.addEventListener('animationstart', onAnimationStart);
        }

        return () => {
            document.head.removeChild(styleTag);
            if (inputElem) {
                inputElem.removeEventListener('animationstart', onAnimationStart);
            }
        };
    }, []);

    const inputLabel = (
        <div className="gap-1 flex items-center text-sm group-data-[filled-within=true]:!text-[14px]">
      <span className={classNames("", {
          "!text-gray-500": variant === 'light',
          "!text-gray-700": variant === 'gray',
      })}>{label}</span>
            <span className={classNames("", {
                "!text-gray-500": variant === 'light',
                "!text-gray-700": variant === 'gray',
            })}>*</span>
        </div>
    );

    const inputEndContent = type === 'password' ? (
        <button
            className="focus:outline-none items-center absolute right-2 top-1/2 transform -translate-y-1/2"
            type="button"
            onClick={toggleVisibility}
        >
            {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-gray-700 pointer-events-none" />
            ) : (
                <EyeFilledIcon className="text-2xl text-gray-700 pointer-events-none" />
            )}
        </button>
    ) : endContent;

    return (
        <Input
            autoComplete={type === 'email' ? 'email' : type === 'password' ? 'current-password' : 'off'}
            name={field.name}
            ref={inputRef}
            label={required ? inputLabel : label}
            variant="bordered"
            placeholder={placeholder}
            onBlur={field.onBlur}
            required={required}
            isInvalid={!!error}
            errorMessage={error?.message}
            className={twMerge(
                classNames("placeholder:!text-[#A1A1AA] text-gray-700", {
                    'wrapper-gray': variant === 'gray',
                    'wrapper-light': variant === 'light',
                }, []), className
            )}
            classNames={{
                inputWrapper: classNames('', {
                    '!rounded-xl': size === 'sm',
                }, other?.classNames?.inputWrapper ? [other?.classNames?.inputWrapper as string] : []),
                base: classNames('', {
                    'min-h-11 h-11': size === 'sm',
                    'min-h-14 h-14': size === 'md',
                }, other?.classNames?.base ? [other?.classNames?.base as string] : []),
                label: '!font-regular group-data-[filled-within=true]:!text-[14px]',
                input: classNames('text-base !font-regular', {
                    '!pr-6': !!endContent,
                    'text-gray-900 placeholder:!text-gray-900': variant === 'light',
                    'text-gray-700 placeholder:!text-gray-700': variant === 'gray',
                }, other?.classNames?.input ? [other?.classNames?.input as string] : []),
            }}
            value={field.value}
            onValueChange={field.onChange}
            size={size ?? "md"}
            min={type === 'number' ? 0 : undefined}
            type={(type === 'password' && isVisible) ? 'text' : type}
            endContent={inputEndContent}
            {...other}
        />
    );
};

export default memo(InputCustom);
