'use client';

import React, { ReactNode, useEffect, useMemo, useState, useCallback } from 'react';
import {ParcelTourDataProvider, useTranslationContext} from "@/context";
import { useToggleState } from "@/hooks"; 
import { TourProvider } from '@reactour/tour'; 
import { getParcelStepsTutorial } from "@/lib";
import { usePathname } from "@/navigation";
import { ParcelStep } from "@/types";
import {IndigoButton, StrokeButton} from "@/components/custom";

interface ParcelTourProviderProps {
    children: ReactNode;
}

const ParcelTourProvider = ({ children }: ParcelTourProviderProps) => {
    const pathname = usePathname();
    const [steps, setSteps] = useState<ParcelStep[]>([]);
    const {
        getLabelByCode
    } = useTranslationContext()

    const {
        state: run,
        open: startRun,
    } = useToggleState(false);

    const onStart = useCallback(() => {
        startRun();
    }, [startRun]);


    const filteredSteps = useMemo(() => {
        if (pathname.includes('/third-step')) {
            return steps.filter((el) => el.step === 3);
        }
        if (pathname.includes('/second-step')) {
            return steps.filter((el) => el.step === 2);
        }
        return steps.filter((el) => el.step === 1);
    }, [pathname, steps]);

    useEffect(() => {
        const loadSteps = async () => {
            const res = await getParcelStepsTutorial();
            setSteps(res.data);
        };

        loadSteps();
    }, []);

    return (
        <TourProvider scrollSmooth
            prevButton={({ currentStep, setCurrentStep, steps }) => {
                const first = currentStep === 0;
                return (
                    <StrokeButton
                        className="!h-10"
                        onClick={() => {
                            if (first) {
                                setCurrentStep((s) => (steps?.length || 0) - 1);
                            } else {
                                setCurrentStep((s) => s - 1);
                            }
                        }}
                    >
                        {getLabelByCode('BACK')}
                    </StrokeButton>
                );
            }}
            nextButton={({
                             currentStep,
                             stepsLength,
                             setIsOpen,
                             setCurrentStep,
                             steps,
                         }) => {
                const last = currentStep === stepsLength - 1;
                return (
                    <IndigoButton
                        className="!h-10"
                        onClick={() => {
                            if (last) {
                                setIsOpen(false);
                            } else {
                                setCurrentStep((s) => (s === (steps?.length || 0) - 1 ? 0 : s + 1));
                            }
                        }}
                    >
                        {getLabelByCode('NEXT')} {currentStep + 1}/{stepsLength}
                    </IndigoButton>
                );
            }}
            defaultOpen={false}
            steps={[]}
        >
            <ParcelTourDataProvider value={{ run, onStart, tourSteps: filteredSteps }}>
                {children}
            </ParcelTourDataProvider>
        </TourProvider>
    );
};

export default ParcelTourProvider;
