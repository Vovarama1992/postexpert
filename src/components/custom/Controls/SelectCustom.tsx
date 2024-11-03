'use client'
import React, { ChangeEvent, memo, useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { useController, useFormContext } from "react-hook-form";
import { classNames } from "@/utils";
import { useToggleState } from "@/hooks";
import { queryFnList, SelectCustomProps } from './model/input';
import { Select, SelectItem } from "@nextui-org/select";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useQuery } from "@tanstack/react-query";

interface ExtendedSelectCustomProps extends SelectCustomProps {
    onSuccess?: (data: { data: any[] }) => void;
}

const SelectCustom = ({
                          name, classNames: classes, required, placeholder, className, size,
                          endContent, labelKey, queryKey, objectKey, emptyRow, rows, variant = 'light',
                          onSuccess, ...other
                      }: ExtendedSelectCustomProps) => {
    const { state: isOpen, close, open } = useToggleState(false);
    const { field, fieldState: { error } } = useController({ name });
    const selectRef = useRef<HTMLSelectElement>(null);
    const { setValue } = useFormContext();
    const [perPage, setPerPage] = useState(20);
    const [values, setValues] = useState<any>(new Set([]));
    const queryFn = queryFnList[queryKey as keyof typeof queryFnList];

    const { data: options, isLoading, isSuccess } = useQuery({
        queryKey: [queryKey, perPage],
        // @ts-ignore
        queryFn: () => queryFn(1, null, perPage),
    });

    useEffect(() => {
        if (isSuccess && onSuccess && !field.value) {
            onSuccess(options);
        }
    }, [isSuccess, onSuccess, options, field]);

    const onLoadMore = () => setPerPage(prev => prev + 10);

    const onChangeValue = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = !isNaN(Number(e.target.value)) ? Number(e.target.value) : e.target.value;
        const find = options?.data?.find((item: any) => item.id === value);
        if (objectKey)
            setValue(objectKey as string, find ?? null);
        field.onChange(value);
    };

    const getTitle = useCallback((item: any) => (
        typeof labelKey === 'function' ? labelKey(item) : item[labelKey as keyof typeof item]
    ), [labelKey]);

    const hasMore = options?.meta ? options?.meta?.last_page > options?.meta?.current_page : false;
    const [, scrollerRef] = useInfiniteScroll({ hasMore, isEnabled: isOpen, shouldUseLoader: true, onLoadMore });

    useLayoutEffect(() => {
        if (selectRef.current && field.value) {
            setValues(new Set([String(field.value)]));
        }
    }, [field.value, selectRef.current]);

    return (
        <div className="flex flex-col gap-2">
            <Select
                ref={selectRef}
                aria-label="select"
                scrollRef={scrollerRef}
                variant="bordered"
                placeholder={placeholder}
                required={required}
                isInvalid={!!error}
                errorMessage={error?.message}
                isLoading={rows?.length ? false : isLoading}
                items={rows?.length ? rows : options?.data ?? []}
                selectionMode="single"
                onOpenChange={isOpen ? close : open}
                className={classNames("rhf-select placeholder:!text-[#A1A1AA] text-gray-700 overflow-x-hidden", {}, [className])}
                selectedKeys={values}
                onSelectionChange={setValues}
                classNames={{
                    ...classes,
                    base: classNames('', {
                        'min-h-14 h-14': !size || size === 'md',
                        'min-h-12 h-12': size === 'sm',
                        '!h-auto': !!error
                    }),
                    trigger: classNames('!rounded-xl px-3', {
                        '!min-h-14 !h-14': !size || size === 'md',
                        ' !bg-gray-100  ': variant === 'dark',
                        '!min-h-12 !h-12': size === 'sm', '!h-auto': !!error
                    }, [classes?.trigger as string]),
                    value: classNames(' text-base', {
                        'text-gray-700 ': variant === 'light',
                        'text-gray-700': variant === 'dark',
                    }, [classes?.value as string]),
                }}
                value={field.value}
                onChange={onChangeValue}
                size={size ?? "md"}
                listboxProps={{ className: 'listbox' }}
                endContent={endContent}
                {...other}
            >
                {(item) => (
                    <SelectItem
                        // @ts-ignore
                        key={item.id} value={item.id}>
                        {getTitle(item)}
                    </SelectItem>
                )}
            </Select>
            {isSuccess && options?.data?.length === 0 ? emptyRow : null}
        </div>
    );
};

export default memo(SelectCustom);
