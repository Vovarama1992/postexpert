'use client'
import {useEffect} from 'react';
import {FieldError, useFormContext} from "react-hook-form";

const ScrollToFieldError = () => {
    const {
        formState: { errors, isSubmitting },
    } = useFormContext();

    useEffect(() => {
        const firstErrorKey = Object.keys(errors)[0];
        if (firstErrorKey) {
            const error = errors[firstErrorKey];

            // @ts-ignore
            if (error?.ref?.name) {
                // @ts-ignore
                const element = document.querySelector(`[name="${error?.ref?.name}"]`);

                if (element instanceof HTMLElement && !isSubmitting) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                    element.focus({ preventScroll: true });
                }
            }
        }

    }, [errors, isSubmitting]);

    return null;
};

export default ScrollToFieldError;
