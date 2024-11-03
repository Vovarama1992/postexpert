import React, { ReactNode } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import {ScrollToFieldError} from "@/components/common/Form";

interface ParcelFormProps {
    methods: UseFormReturn<any>;
    onSubmit: (data: any) => void;
    children: ReactNode;
}

const ParcelForm: React.FC<ParcelFormProps> = ({ methods, onSubmit, children }) => {
    const { handleSubmit } = methods;

    return (
        <FormProvider {...methods}>
            <form className="order-row" onSubmit={handleSubmit(onSubmit)}>
                {children}
            </form>
            <ScrollToFieldError/>
        </FormProvider>
    );
};

export default ParcelForm;
