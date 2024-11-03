'use client';

import React, { useEffect, useMemo } from 'react';
import {
    ParcelLoadingDataProvider,
    StepsEnum,
    useParcelContext,
    useParcelTourContext,
    useTranslationContext,
} from '@/context';
import { useRouter } from '@/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { defaultValuesTrackingStep } from '@/app/[locale]/dashboard/parcels/components/model/defaultValuesStepForm';
import {getParcelImages, getServices, paymentParcel, StepSchema, updateParcel} from '@/lib';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ParcelAddressCard from '@/app/[locale]/dashboard/parcels/components/Cards/ParcelAddressCard';
import ParcelTrackingCard from '@/app/[locale]/dashboard/parcels/components/Cards/ParcelTrackingCard';
import ParcelAdditionalCard from '@/app/[locale]/dashboard/parcels/components/Cards/ParcelAdditionalCard';
import { base64ToBlob, getInsuranceValue, getPrice } from '@/utils';
import { useQueryState } from 'nuqs';
import { useTour } from '@reactour/tour';
import useLenisStore from '@/store/lenisStore';
import useParcelStore from '@/store/parcelStore';
import ParcelForm from '../components/ParcelForm';
import ParcelPageLayout from '../components/ParcelPageLayout';
import FormActions from '../components/FormActions';
import {zodResolver} from "@hookform/resolvers/zod";
import {defaultLocales} from "@/defaultLocales";
import usePayStore from "@/store/payStore";

const ThirdPage: React.FC = () => {
    const { parcel } = useParcelContext();
    const { push } = useRouter();
    const { tourSteps } = useParcelTourContext();
    const startLenis = useLenisStore((state) => state.resumeLenis);
    const stopLenis = useLenisStore((state) => state.pauseLenis);
    const { setSteps, isOpen } = useTour();
    const [parcelId] = useQueryState('parcelId');
    const { getLabelByCode } = useTranslationContext();
    const queryClient = useQueryClient();

    const methods = useForm<any>({
        defaultValues: defaultValuesTrackingStep,
        resolver: zodResolver(StepSchema(defaultLocales(getLabelByCode).schemas.stepSchema)),
        mode: 'onSubmit',
    });

    const { handleSubmit, getValues, control, setValue, reset, watch } = methods;

    const { data: services } = useQuery({
        queryKey: ['services'],
        queryFn: getServices,
    });

    const tariff = useWatch({ name: 'tariff', control });
    const weight = useWatch({ name: 'weight', control });
    const sentWeight = useWatch({ name: 'sent_weight', control });
    const serviceIds = useWatch({ name: 'service_ids', control });
    const onPay = usePayStore((state) => state.onPay);

    const getWeight = useMemo(() => {
        if (sentWeight) return sentWeight;
        if (parcel?.sent_weight) return parcel.sent_weight;
        if (weight) return weight;
        return parcel?.weight || 0;
    }, [sentWeight, parcel?.sent_weight, weight, parcel?.weight]);

    const setCreatedParcel = useParcelStore((state) => state.setCreatedParcel);

    const price = useMemo(() => {
        return getPrice(getWeight, tariff, parcel);
    }, [getWeight, tariff, parcel]);

    const insuranceValue = useMemo(() => {
        return getInsuranceValue(serviceIds, parcel, price, services);
    }, [serviceIds, parcel, services, price]);

    const { isPending, mutate: onUpdateParcel } = useMutation({
        mutationFn: updateParcel,
        onSuccess: async (data) => {

            await queryClient.invalidateQueries({ queryKey: ['parcelOne'] });

            paymentParcel(data.parcel.id).then((res) => {
                console.log(res.data)
                if (res.data.parcel.price)
                    onPay(res.data.parcel.price, parcel.id)
            });
        },
    });

    const onPrev = () => {
        push({
            pathname: `/dashboard/parcels/create/second-step`,
            query: {
                parcelId: parcel?.id,
            },
        });
    };

    const onSubmit = async (data: any) => {
        const updateData = { ...data, id: parcel?.id, price: price + insuranceValue };
        onUpdateParcel(updateData);
    };

    useEffect(() => {
        if (parcelId && parcel) {
            setTimeout(() => {
                getParcelImages(parcel.id).then((res) => {
                    const images = res.data.map((imageData: any) => {
                        const file = base64ToBlob(imageData.src);
                        return {
                            file,
                            id: imageData.id,
                            originalId: imageData.id,
                            url: URL.createObjectURL(file),
                        };
                    });
                    // @ts-ignore
                    setValue('images', images);
                });

                reset({
                    address: parcel?.address ?? null,
                    address_id: parcel?.address_id ?? '',
                    country_id: parcel?.country_id ?? '',
                    country: parcel?.country ?? null,
                    locality: parcel?.locality ?? '',
                    recipient: parcel?.recipient ?? null,
                    recipient_id: parcel?.recipient_id ?? '',
                    items: parcel?.items ?? [],
                    step: StepsEnum.tracking,
                    tariff: parcel?.tariff ?? null,
                    tariff_id: parcel?.tariff_id ?? '',
                    warehouse: parcel?.warehouse ?? null,
                    warehouse_id: parcel?.warehouse_id ?? '',
                    weight: parcel?.weight ?? '1',
                    tracking_code: parcel?.tracking_code ?? '',
                    sent_weight: parcel?.sent_weight ?? '',
                    service_ids: parcel?.service_ids ?? [],
                });
            }, 100);
        }
    }, [parcelId, parcel, reset, setValue]);

    useEffect(() => {
        if (setSteps) {
            setSteps(
                tourSteps.map((step) => ({
                    content: (
                        <div>
                            <p>{step.title}</p>
                            <p>{step.description}</p>
                        </div>
                    ),
                    selector: step.selector,
                }))
            );
        }
    }, [tourSteps, setSteps]);

    useEffect(() => {
        if (isOpen) {
            stopLenis(); // Останавливаем Lenis
        } else {
            startLenis(); // Включаем Lenis
        }
    }, [isOpen, stopLenis, startLenis]);

    useEffect(() => {
        const subscription = watch((value) => setCreatedParcel(value));
        return () => {
            subscription.unsubscribe();
            setCreatedParcel(null);
        };
    }, [watch, setCreatedParcel]);

    return (
        <ParcelLoadingDataProvider value={{ isPending }}>
            <ParcelForm methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <ParcelPageLayout>
                    <ParcelAddressCard />
                    <ParcelTrackingCard />
                    <ParcelAdditionalCard />
                    <FormActions
                        onPrev={onPrev}
                        isPending={isPending}
                        isSubmitting={methods.formState.isSubmitting}
                        nextLabel={getLabelByCode('PAY')}
                        stepNumber="03"
                    />
                </ParcelPageLayout>
            </ParcelForm>
        </ParcelLoadingDataProvider>
    );
};

export default ThirdPage;
