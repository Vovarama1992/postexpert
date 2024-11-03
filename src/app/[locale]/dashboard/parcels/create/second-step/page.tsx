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
import { useForm, useWatch, SubmitHandler } from 'react-hook-form';
import { defaultValuesContentStep } from '@/app/[locale]/dashboard/parcels/components/model/defaultValuesStepForm';
import {StepSchema, updateParcelSteps} from '@/lib';
import { useMutation } from '@tanstack/react-query';
import ParcelContentCard from '@/app/[locale]/dashboard/parcels/components/Cards/ParcelContentCard';
import { useTour } from '@reactour/tour';
import useLenisStore from '@/store/lenisStore';
import useParcelStore from '@/store/parcelStore';
import ParcelForm from '../components/ParcelForm';
import ParcelPageLayout from '../components/ParcelPageLayout';
import FormActions from '../components/FormActions';
import {zodResolver} from "@hookform/resolvers/zod";
import {defaultLocales} from "@/defaultLocales";

const SecondPage: React.FC = () => {
    const { step: activeStep, parcel, onSaveProducts, deletedItems } = useParcelContext();
    const { locales, getLabelByCode } = useTranslationContext();
    const { push } = useRouter();
    const setCreatedParcel = useParcelStore((state) => state.setCreatedParcel);

    const methods = useForm({
        defaultValues: defaultValuesContentStep,
        resolver: zodResolver(StepSchema(defaultLocales(getLabelByCode).schemas.stepSchema)),
        mode: 'onSubmit',
    });

    const { tourSteps } = useParcelTourContext();
    const startLenis = useLenisStore((state) => state.resumeLenis);
    const stopLenis = useLenisStore((state) => state.pauseLenis);
    const { setSteps, isOpen } = useTour();

    const { handleSubmit, getValues, control, formState: { isSubmitting } } = methods;

    const products = useWatch({ name: 'products', control });

    const { isPending, mutate: onUpdateParcel } = useMutation({
        mutationFn: async (data: any) => {
            const parcelSteps = {
                [StepsEnum.created]: true,
                [StepsEnum.content]: true,
                [StepsEnum.tracking]: false,
            };

            if (activeStep !== StepsEnum.tracking) {
                await updateParcelSteps(data.id!, parcelSteps);
            }

            const products = getValues('products');
            await onSaveProducts(products, deletedItems);

            return data;
        },
        onSuccess: async (data) => {
            push({

                pathname: `/dashboard/parcels/create/third-step`,
                query: {
                    parcelId: data.id,
                },
            });
        },
    });

    const onPrev = () => {
        push({
            pathname: `/dashboard/parcels/create`,
            query: {
                parcelId: parcel?.id,
            },
        });
    };

    const onSubmit: SubmitHandler<any> = async (data) => {
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
            stopLenis(); // Останавливаем Lenis
        } else {
            startLenis(); // Включаем Lenis
        }
    }, [isOpen, stopLenis, startLenis]);

    useEffect(() => {
        setCreatedParcel({ products });

        return () => {
            setCreatedParcel(null);
        };
    }, [products, setCreatedParcel]);

    return (
        <ParcelLoadingDataProvider value={{ isPending }}>
            <ParcelForm methods={methods} onSubmit={onSubmit}>
                <ParcelPageLayout>
                    <ParcelContentCard />
                    <FormActions
                        onPrev={onPrev}
                        isPending={isPending}
                        isSubmitting={isSubmitting}
                        nextLabel={locales.components.StepForm.NEXT}
                        stepNumber="03"
                    />
                </ParcelPageLayout>
            </ParcelForm>
        </ParcelLoadingDataProvider>
    );
};

export default SecondPage;
