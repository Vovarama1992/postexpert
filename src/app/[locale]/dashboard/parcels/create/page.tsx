'use client';
import React, { useEffect } from 'react';
import {
    ParcelLoadingDataProvider,
    StepsEnum,
    useParcelContext,
    useParcelTourContext,
    useTranslationContext,
} from '@/context';
import { useRouter } from '@/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    StepSchema,
    updateParcel,
    updateParcelSteps,
} from '@/lib';
import { defaultLocales } from '@/defaultLocales';
import { useMutation } from '@tanstack/react-query';
import ParcelBaseCard from '@/app/[locale]/dashboard/parcels/components/Cards/ParcelBaseCard';
import ParcelRecipientCard from '@/app/[locale]/dashboard/parcels/components/Cards/ParcelRecipientCard';
import useLenisStore from '@/store/lenisStore';
import useParcelStore from '@/store/parcelStore';
import {useTour} from "@reactour/tour";
import ParcelForm from './components/ParcelForm';
import ParcelPageLayout from './components/ParcelPageLayout';
import FormActions from './components/FormActions';
import { defaultValuesCreateStep } from '../components/model/defaultValuesStepForm';

const FirstPage = () => {

    const { getLabelByCode } = useTranslationContext();
    const { step: activeStep, parcel } = useParcelContext();
    const { locales } = useTranslationContext();
    const { push } = useRouter();
    const setCreatedParcel = useParcelStore((state) => state.setCreatedParcel);

    const methods = useForm<any>({
        defaultValues: defaultValuesCreateStep,
        resolver: zodResolver(StepSchema(defaultLocales(getLabelByCode).schemas.stepSchema)),
        mode: 'onSubmit',
    });

    const { tourSteps } = useParcelTourContext();
    const startLenis = useLenisStore((state) => state.resumeLenis);
    const stopLenis = useLenisStore((state) => state.pauseLenis);
    const { setSteps, isOpen } = useTour();

    const { reset, watch, formState: {errors} } = methods;

    const { isPending, mutate: onUpdateParcel } = useMutation({
        mutationFn: updateParcel,
        onSuccess: async (data) => {
            const parcelSteps = {
                [StepsEnum.created]: true,
                [StepsEnum.content]: false,
                [StepsEnum.tracking]: false,
            };

            if (activeStep !== StepsEnum.tracking) {
                await updateParcelSteps(data.parcel.id, parcelSteps);
            }

            push({
                pathname: `/dashboard/parcels/create/second-step`,
                query: {
                    parcelId: data.parcel.id,
                },
            });
        },
    });

    const onSubmit = async (data: any) => {
        const updateData = { ...data, id: parcel?.id };
        onUpdateParcel(updateData);
    };

    useEffect(() => {
        if (setSteps) {
            setSteps(
                tourSteps.map((step) => ({
                    content: (
                        <div>
                            <h5 className="font-bold">{step.title}</h5>
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
            stopLenis();
        } else {
            startLenis();
        }
    }, [isOpen, stopLenis, startLenis]);

    useEffect(() => {
        if (parcel) {
            reset({
                address: parcel?.address ?? null,
                address_id: parcel?.address_id ?? '',
                country_id: parcel?.country_id ?? '',
                country: parcel?.country ?? null,
                locality: parcel?.locality ?? '',
                recipient: parcel?.recipient ?? null,
                recipient_id: parcel?.recipient_id ?? '',
                step: StepsEnum.created,
                tariff: parcel?.tariff ?? null,
                tariff_id: parcel?.tariff_id ?? '',
                warehouse: parcel?.warehouse ?? null,
                warehouse_id: parcel?.warehouse_id ?? '',
                weight: parcel?.weight ?? '1',
            });
        }
    }, [parcel, reset]);

    useEffect(() => {
        const subscription = watch((value: any) => setCreatedParcel(value));
        return () => {
            subscription.unsubscribe();
            setCreatedParcel(null);
        };
    }, [watch, setCreatedParcel]);

    return (
        <ParcelLoadingDataProvider value={{ isPending }}>
            <ParcelForm  methods={methods} onSubmit={onSubmit}>
                <ParcelPageLayout >
                    <ParcelBaseCard />
                    <ParcelRecipientCard />
                    <FormActions
                        disabled={true}
                        isPending={isPending}
                        isSubmitting={false}
                        nextLabel={locales.components.StepForm.NEXT}
                        stepNumber="02"
                    />
                </ParcelPageLayout>
            </ParcelForm>
        </ParcelLoadingDataProvider>
    );
};

export default FirstPage;
