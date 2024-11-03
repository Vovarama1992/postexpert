'use client';
import React, {memo, ReactNode, useMemo, useCallback, useEffect} from 'react';
import { ArrowMiniIcon, CardsIcon, ChevronIcon, TickCircleIcon } from "@/assets";
import InfoCustom from "@/components/custom/Info/InfoCustom";
import { useFormContext, useWatch } from "react-hook-form";
import {Parcel, TarrifType, WarehousesType} from "@/types";
import {classNames, getInsuranceValue, getPrice, replaceStringIdsWithNumbers} from "@/utils";
import { getServices, updateParcel } from "@/lib";
import { useMutation, useQuery } from "@tanstack/react-query";
import { StepsEnum, useParcelContext, useParcelLoadingContext, useTranslationContext } from "@/context";
import { toast } from "react-toastify";
import { useLocale } from "next-intl";
import usePayStore from "@/store/payStore";
import { useToggleState } from "@/hooks";
import { twMerge } from "tailwind-merge";
import {debounce} from "lodash";
import {IndigoButton, StrokeButton} from "@/components/custom";

const ParcelResultCardRow = memo(({ left, right }: { left: string, right: ReactNode }) => {
    return (
        <div className="w-full py-2 flex items-center justify-between px-4">
            <span className="text-gray-700 text-small">{left}:</span>
            <div className="flex items-center gap-1 text-gray-800 text-small font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]">
                {right}
            </div>
        </div>
    );
});

const useDebouncedUnmountEffect = (callback: () => void, delay: number, deps: any[]) => {
    useEffect(() => {
        const debouncedCallback = debounce(callback, delay);

        return () => {
            debouncedCallback();
        };
    }, deps);
};

const ParcelInfoCard = ({ view = false, className }: { view?: boolean, className?: string }) => {
    const { parcel, step, onSaveProducts, deletedItems, onSaveImages } = useParcelContext();
    const { isPending: isPendingUpdate } = useParcelLoadingContext();
    const { state: show, toggle } = useToggleState(false);

    const { data: services } = useQuery({
        queryKey: ['services'],
        queryFn: getServices,
    });

    const {
        formState: {
            errors, isSubmitting
        },
        setError,
        clearErrors
    } = useFormContext()

    const { locales, getLabelByCode } = useTranslationContext();
    const locale = useLocale();
    const warehouse: WarehousesType | null = useWatch({ name: 'warehouse' });
    const tariff: TarrifType | null = useWatch({ name: 'tariff' });
    const weight: string = useWatch({ name: 'weight' });
    const sent_weight: string = useWatch({ name: 'sent_weight' });
    const service_ids: any[] = useWatch({ name: 'service_ids' });
    const onPay = usePayStore((state) => state.onPay);

    const { isPending, mutate: onUpdateParcel } = useMutation({
        mutationFn: updateParcel,
        onSuccess: async (data) => {

            const toastId = 'update-unique-toast-id';

            toast.success(data.message, {
                toastId
            });
        }
    });

    const { getValues, setValue, formState: { isValid } } = useFormContext();

    const getWeight = useMemo(() => {
        if (sent_weight) {
            return sent_weight;
        }
        if (parcel?.sent_weight) {
            return parcel?.sent_weight;
        }
        if (weight) {
            return weight;
        }
        if (parcel?.weight) {
            return parcel?.weight;
        }
        return 0;
    }, [sent_weight, parcel?.sent_weight, weight, parcel?.weight]);

    const price = useMemo(() => {
        return getPrice(getWeight, tariff, parcel);
    }, [getWeight, tariff, parcel]);

    const onSaveDraft = useCallback(async () => {
        const values = getValues();

        if (step === StepsEnum.content) {
            const products = getValues('products');

            await onSaveProducts(products, deletedItems);

            setValue('products', replaceStringIdsWithNumbers(products))
        }

        onUpdateParcel({
            ...values,
            id: parcel?.id
        });
    }, [step, getValues, onSaveProducts, deletedItems, onSaveImages, onUpdateParcel, parcel?.id]);

    const getWarehouse = useMemo(() => {
        if (warehouse) {
            return warehouse ? warehouse.country : locales.components.ParcelInfoCard.WAREHOUSE;
        }
        if (parcel?.warehouse) {
            return parcel?.warehouse ? parcel?.warehouse.country : locales.components.ParcelInfoCard.WAREHOUSE;
        }
        return locales.components.ParcelInfoCard.WAREHOUSE;
    }, [warehouse, parcel?.warehouse]);

    const getTariffTitle = useMemo(() => {
        if (tariff) {
            return <span className="capitalize">{tariff.title}</span>;
        }
        if (parcel?.tariff) {
            return <span className="capitalize">{parcel?.tariff.title}</span>;
        }
        return locales.components.ParcelInfoCard.TARIFF;
    }, [tariff, parcel?.tariff]);

    const getInsurance = useMemo(() => {
        return getInsuranceValue(service_ids, parcel, price, services)
    }, [service_ids, parcel?.service_ids, services, price]);

    useEffect(() => {

        if (parcel?.tariff) {
            if (parcel?.tariff.max_weigth < Number(sent_weight)) {
                setError('sent_weight', {
                    type: 'max_weight',
                    message: getLabelByCode('EXCEEDED_WEIGHT_TARIFF'),
                });
            } else {
                if (errors?.sent_weight && errors?.sent_weight?.type === "max_weight" && parcel?.tariff.max_weigth >= Number(weight)) {
                    clearErrors('sent_weight');
                }
            }
        }
    }, [sent_weight, parcel?.tariff, errors])

    const content = (
        <div className={classNames("border-card parcel-info bg-gray-100 border-gray-200 px-6 max-lg:rounded-none", {}, [className])}>
            <h2 className="text-title-1 font-semibold">
                {locales.components.ParcelInfoCard.CALCULATION}
            </h2>
            <div className="mt-7 flex items-center gap-2 w-full">
                <div className="rounded-lg bg-gray-200 flex items-center h-[42px] pl-[18px] flex-1">
                    <span className="text-gray-800 text-small-1 !text-[14px] truncate font-medium whitespace-nowrap text-ellipsis overflow-hidden">{getWarehouse}</span>
                </div>
                <ArrowMiniIcon />
                <div className="rounded-lg bg-gray-200 flex items-center h-[42px] pl-[18px] flex-1">
                    <span className="text-gray-800 text-small-1 !text-[14px] truncate font-medium">{locale === 'ru' ? 'Россия' : 'Russia'}</span>
                </div>
            </div>
            <div className="flex flex-col gap-3 my-3 w-full">
                <div className="flex flex-col gap-3 w-full rounded-xl bg-white py-3">
                    <ParcelResultCardRow left={locales.components.ParcelInfoCard.WEIGHT} right={`${getWeight} ${getLabelByCode('KG')}`} />
                </div>
                <div className="flex flex-col gap-3 w-full rounded-xl bg-white py-3">
                    <ParcelResultCardRow left={locales.components.ParcelInfoCard.TARIFF} right={getTariffTitle} />
                    <ParcelResultCardRow left={locales.components.ParcelInfoCard.DELIVERY_TIME} right={<>
                        {tariff ? tariff.deleivery_time : parcel?.tariff?.deleivery_time ? parcel?.tariff?.deleivery_time : '-'}
                        <InfoCustom content={getLabelByCode('DELIVERY_TIME_HELPER')} />
                    </>} />
                    <ParcelResultCardRow left={locales.components.ParcelInfoCard.INSURANCE}
                                         right={`${getInsurance.toFixed(2)} €`} />
                </div>
                <div className="px-4 py-3 flex items-center justify-between w-full">
                    <span className="text-gray-900 text-center font-semibold">{locales.components.ParcelInfoCard.TOTAL}</span>
                    <span className="text-gray-900 text-center font-semibold">{(price + getInsurance).toFixed(2)} €</span>
                </div>
            </div>
            {!view ? (
                <div className="flex gap-3 flex-col w-full">
                    <IndigoButton isLoading={step === StepsEnum.tracking && isPendingUpdate}
                                  type="submit"
                                  disabled={!isValid || step !== StepsEnum.tracking}
                                  size="md"
                                  endContent={<CardsIcon />}>
                        {locales.components.ParcelInfoCard.PAY}
                    </IndigoButton>
                    <StrokeButton isLoading={isPending} onClick={onSaveDraft} size="md" endContent={<TickCircleIcon />}>
                        {locales.components.ParcelInfoCard.SAVE_DRAFT}
                    </StrokeButton>
                </div>
            ) : <div className="w-full">
                {
                    parcel?.payment?.status !== 'paid' ? <IndigoButton onClick={() => {
                        if (parcel.price)
                            onPay(parcel.price, parcel.id)
                    }}
                                                                       type="button"
                                                                       size="md" className="w-full"
                                                                       endContent={<CardsIcon />}>
                        {locales.components.ParcelInfoCard.PAY}
                    </IndigoButton> : null
                }
            </div>}
        </div>
    )

    const autoSave = async (parcel: Parcel, view?: boolean, step?: string, isSubmitting?: boolean) => {
        if (parcel.status === 'draft' && !view && step !== StepsEnum.created && !isSubmitting) {

            if (step === StepsEnum.content) {
                const products = getValues('products');

                await onSaveProducts(products, deletedItems);

                setValue('products', replaceStringIdsWithNumbers(products))
            }

        }
    }

    useEffect(() => {
        return () => {
            autoSave(parcel, view, step, isSubmitting)
        }
    }, [isSubmitting, view, parcel, step]);

    return (
        <>
            <div className={twMerge(
                "max-lg:fixed bg-transparent max-lg:flex inset-0 w-full z-[21] hidden flex-col top-auto transition-[max-height] duration-500 ease-in-out overflow-hidden",
                show ? "max-h-[1000px] bg-transparent" : "max-h-[48px]"
            )}>
                <div className="w-full bg-indigo-600 h-12 rounded-t-[18px]">
                    <div onClick={toggle} className="cursor-pointer w-full flex items-center justify-between container h-full">
                        <div className="flex h-full items-center gap-2">
                            <h6 className="text-bottom text-white">
                                {locales.components.ParcelInfoCard.TOTAL}:
                            </h6>
                            <h6 className="text-bottom text-white">
                                {(price + getInsurance).toFixed(2)} €
                            </h6>
                        </div>
                        <button type="button" className={twMerge(
                            "w-6 h-6 items-center justify-center flex rounded-3xl bg-black/10 transition-transform duration-300 ease-in-out",
                            show ? "rotate-90" : "-rotate-90"
                        )}>
                            <ChevronIcon className="text-white w-[10px] h-[6px]" />
                        </button>
                    </div>
                </div>
                <div className={twMerge(
                    "w-full transition-[max-height] duration-500 ease-in-out overflow-hidden",
                    show ? "max-h-[1000px]" : "max-h-0"
                )}>
                    {content}
                </div>
            </div>
            <div className="max-lg:hidden xl:w-1/3 flex flex-1">
                {content}
            </div>
        </>
    );
};

export default memo(ParcelInfoCard);
