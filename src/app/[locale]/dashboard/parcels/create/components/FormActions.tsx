import React, { memo } from 'react';
import { ArrowLeftIcon } from "@/assets";
import {useTranslationContext} from "@/context";
import {useFormContext} from "react-hook-form";
import {IndigoButton, StrokeButton} from "@/components/custom";

interface FormActionsProps {
    onPrev?: () => void ;
    disabled?: boolean;
    isPending: boolean;
    isSubmitting: boolean;
    nextLabel: string;
    stepNumber: string;
}

const FormActions: React.FC<FormActionsProps> = memo(({ onPrev, isPending, disabled, isSubmitting, nextLabel, stepNumber }) => {

    const {
        formState: {
            errors
        }
    } = useFormContext()

    const {
        getLabelByCode
    } = useTranslationContext()

    return (
        <div className="w-full grid grid-cols-2 gap-4">
            <StrokeButton onClick={onPrev} disabled={disabled} startContent={<ArrowLeftIcon />}>
                {getLabelByCode('BACK')}
            </StrokeButton>
            <IndigoButton
                disabled={!!Object.keys(errors).length}
                type="submit"
                isLoading={isPending || isSubmitting}
                endContent={
                    <div className="size-6 rounded-full bg-white flex items-center justify-center">
                        <span className="font-semibold text-[10px] leading-[20px] text-gray-900">{stepNumber}</span>
                    </div>
                }
            >
                {nextLabel}
            </IndigoButton>
        </div>
    )
});

export default FormActions;
