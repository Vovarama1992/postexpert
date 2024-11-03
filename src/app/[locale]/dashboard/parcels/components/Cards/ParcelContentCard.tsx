'use client'
import React, { useEffect } from 'react';
import { AddCircleIcon, ClipboardIcon, MinusIcon, PlusIcon, TickCircleIcon, TourIcon, TrashIcon } from "@/assets";
import { useFieldArray, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import InputCustom from "@/components/custom/Controls/InputCustom";
import { getParcelStepsItems, updateParcel } from "@/lib";
import {useParcelContext, useTranslationContext} from "@/context";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@nextui-org/button";
import { useTour } from "@reactour/tour";
import {replaceStringIdsWithNumbers} from "@/utils";
import {ParcelCard} from "@/components/ui/Card";
import {AutocompleteCustom, BlackButton, SmallButton, StrokeButton} from "@/components/custom";

const gridRowClassName = "grid grid-cols-[44px_2.5fr_1fr_120px_44px]" +
    " gap-2 max-lg:grid-cols-[44px_3.5fr_1fr] max-sm:grid-cols-[44px_1fr]"

interface ProductType {
    id: string;
    title: string;
    cost: number | null | string;
    quantity: number;
}

const ParcelContentCard: React.FC = () => {

    const {locales, getLabelByCode} = useTranslationContext()

    const { fields, append, replace, remove, update } = useFieldArray<ProductType>({
        // @ts-ignore
        name: 'products'
    });

    const { setIsOpen, isOpen } = useTour();
    const { parcel, onSaveProducts, deletedItems, onSetDeletedItems } = useParcelContext();
    const { getValues, formState: {errors} } = useFormContext();

    const { isPending, mutate: onUpdateParcel } = useMutation({
        mutationFn: updateParcel,
        onError: (e) => {
        },
        onSuccess: (data) => {
            toast.success(data.message);
        }
    });

    useEffect(() => {
        getParcelStepsItems(parcel.id).then(({ data }) => {
            const items = data.map(item => ({
                cost: item.cost,
                quantity: item.quantity,
                id: item.id,
                title: item.name_ru
            }));

            if (items.length) {
                // @ts-ignore
                replace(items);
            }
        });
    }, [parcel, replace]);

    const onAddProduct = () => {
        append({
            // @ts-ignore
            id: uuidv4(),
            title: '',
            cost: '',
            quantity: 1
        });
    };

    const onMinus = (index: number) => () => {
        const products = getValues('products');
        const field = products[index];

        if (field.quantity > 1) {
            update(index, {
                ...field,
                quantity: field.quantity - 1
            });
        }
    };

    const onPlus = (index: number) => () => {
        const products = getValues('products');
        const field = products[index];

        update(index, {
            ...field,
            quantity: field.quantity + 1
        });
    };

    const onDelete = (index: number) => () => {
        const products = getValues('products');
        const product = products[index];

        onSetDeletedItems(prev => [...prev, product.id]);
        remove(index);
    };

    const onSaveDraft = async () => {
        const values = getValues();

        const products = getValues('products');

        await onSaveProducts(products, deletedItems);

        replace(replaceStringIdsWithNumbers(products))

        onUpdateParcel({
            ...values,
            id: parcel?.id
        });
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'inherit';
        }
    }, [isOpen]);

    return (
        <ParcelCard
            id="content"
            right={
                <Button onClick={() => setIsOpen(true)} isIconOnly type="button" variant="light">
                    <TourIcon />
                </Button>
            }
            icon={ClipboardIcon}
            title={locales.components.ParcelContentCard.TITLE}
        >
            <div className="mt-5">
                <div className={gridRowClassName}>
                    <span className="text-small-4 font-medium text-gray-900 pl-2">#</span>
                    <span className="text-small-4 font-medium text-gray-800 pl-5">{locales.components.ParcelContentCard.NAME}</span>
                </div>
                <div className="space-y-4 mt-2">
                    {fields.length ? fields.map((field, index) => (
                        <div key={field.id} className="flex flex-col gap-3 w-full">
                            <div  className={gridRowClassName}>
                                <div className="size-11 rounded-xl flex shadow-sm items-center bg-white justify-center text-small-2 font-medium text-gray-900">
                                    {index + 1}
                                </div>
                                <AutocompleteCustom
                                    classNames={{
                                        base: "!min-h-11 !h-11",
                                    }}
                                    inputProps={{
                                        classNames: {
                                            input: '"!min-h-11 !h-11"',
                                            base: '"!min-h-11 !h-11"',
                                        }
                                    }}
                                    queryKey="products"
                                    placeholder={locales.components.ParcelContentCard.CONTENT_PLACEHOLDER}
                                    name={`products.${index}.title`}
                                />
                                <InputCustom
                                    size="sm"
                                    type="number"
                                    className="max-sm:hidden"
                                    step={0.1}
                                    name={`products.${index}.cost`}
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-gray-800 text-small">€</span>
                                        </div>
                                    }
                                    placeholder={locales.components.ParcelContentCard.COST_PLACEHOLDER}
                                />
                                <div className="flex items-center gap-8 relative max-lg:hidden">
                                    <SmallButton onClick={onMinus(index)} icon={MinusIcon} />
                                    <span className="text-small-4 font-medium text-gray-800 top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 absolute">
                                    {
                                        // @ts-ignore
                                        field.quantity}
                                </span>
                                    <SmallButton onClick={onPlus(index)} icon={PlusIcon} />
                                </div>
                                <SmallButton className="max-lg:hidden" onClick={onDelete(index)} icon={TrashIcon} />
                            </div>
                            <div className="self-end gap-2 max-lg:flex hidden">
                                <InputCustom
                                    size="sm"
                                    type="number"
                                    className="hidden max-sm:flex"
                                    name={`products.${index}.cost`}
                                    step={0.1}
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-gray-800 text-small">€</span>
                                        </div>
                                    }
                                    placeholder={getLabelByCode('COST')}
                                />
                                <div className="flex items-center gap-8 relative ">
                                    <SmallButton onClick={onMinus(index)} icon={MinusIcon} />
                                    <span className="text-small-4 font-medium text-gray-800 top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 absolute">
                                    {
                                        // @ts-ignore
                                        field.quantity}
                                </span>
                                    <SmallButton onClick={onPlus(index)} icon={PlusIcon} />
                                </div>
                                <SmallButton  onClick={onDelete(index)} icon={TrashIcon} />
                            </div>
                        </div>
                    )) : (
                        <p className="text-danger-700 text-small-4 font-medium">
                            {locales.components.ParcelContentCard.NO_PRODUCTS}
                        </p>
                    )}
                </div>
                <div className="mt-6 pb-5">
                    <StrokeButton onClick={onAddProduct} size="sm" endContent={<AddCircleIcon className="size-[17px]" />}>
                        {locales.components.ParcelContentCard.ADD_PRODUCT}
                    </StrokeButton>
                </div>
                <div className="pt-4 border-t border-dashed border-gray-300 flex justify-end">
                    <BlackButton isLoading={isPending} onClick={onSaveDraft} size="sm" endContent={<TickCircleIcon />}>
                        {locales.components.ParcelContentCard.SAVE_DRAFT}
                    </BlackButton>
                </div>
            </div>
        </ParcelCard>
    );
};

export default ParcelContentCard;
