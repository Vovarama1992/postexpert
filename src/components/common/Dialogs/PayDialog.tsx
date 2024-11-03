'use client';

import React, {useEffect, useState} from 'react';
import { ModalBody, ModalContent, ModalHeader, Spinner} from "@nextui-org/react";
import {loadStripe, StripeElementLocale} from "@stripe/stripe-js";
import {Elements, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import usePayStore from "@/store/payStore";
import {toast} from "react-toastify";
import {paymentParcelClose, paymentParcelOpen} from "@/lib";
import {useToggleState} from "@/hooks";
import {useParcelContext} from "@/context";
import ModalCustom from "@/components/custom/Modal/ModalCustom";
import {useStore} from "@/store/store";
import useLocaleStore from "@/store/localeStore";
import {usePathname, useRouter} from "@/navigation";
import {IndigoButton} from "@/components/custom";

const fetchPaymentIntent = async (amount: number) => {
    const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({amount, currency: 'eur'}),
    });

    const data = await response.json();

    return data.clientSecret;
};

const PayModal = () => {
    const stripe = useStripe();
    const elements = useElements();
    const loading = usePayStore((state) => state.loading);
    const parcelId = usePayStore((state) => state.parcelId);
    const closePay = usePayStore((state) => state.closePay);
    const {
        state: isLoading,
        open: start,
    } = useToggleState(false)
    const {fetchParcel} = useParcelContext()

    const {
        getLabelByCode
    } = useStore()

    const pathname = usePathname()
    const {push} = useRouter()

    const [isValid, setIsValid] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            console.error('Stripe.js не загружен или clientSecret отсутствует');
            return;
        }

        const paymentElement = elements.getElement(PaymentElement);
        if (!paymentElement) {
            console.error('PaymentElement не смонтирован');
            return;
        }

        start();

        const {error, paymentIntent} = await stripe.confirmPayment({
            elements,
            confirmParams: {

            },
            redirect: 'if_required'
        });

        if (error) {
            toast.error(`${getLabelByCode('PAYMENT_ERROR')}: ${error.message}`);
        } else if (paymentIntent?.status === 'succeeded') {
            toast.success(getLabelByCode('PAYMENT_SUCCESS'));
        }

        if (paymentIntent && parcelId) {
            paymentParcelClose(parcelId, {
                id: paymentIntent.id,
                status: paymentIntent.status,
            }).then(() => {
                if (pathname.includes('/create/')) {
                    closePay()
                    // @ts-ignore
                    push(`/dashboard/parcels/view/${parcelId}`);
                } else {
                    fetchParcel(String(parcelId)).then(() => {
                        closePay()
                    });
                }
            });
        }
    };

    return (
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <PaymentElement
                onChange={(event) => {
                    setIsValid(event.complete);
                }}
            />
            <IndigoButton size="sm" className="mt-4 ml-auto" type="submit" isLoading={isLoading}
                          disabled={!stripe || loading || !isValid}>
                {loading ? getLabelByCode('AWAIT') : getLabelByCode('PAY')}
            </IndigoButton>
        </form>
    );
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

const PayDialog = () => {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const isOpen = usePayStore((state) => state.isOpen);
    const amount = usePayStore((state) => state.amount);
    const parcelId = usePayStore((state) => state.parcelId);
    const setLoading = usePayStore((state) => state.setLoading);
    const loading = usePayStore((state) => state.loading);
    const closePay = usePayStore((state) => state.closePay);
    const {getLabelByCode} = useStore()
    const pathname = usePathname()
    const locale = useLocaleStore.getState().locale;
    const {push} = useRouter()

    const onClose = () => {
        if (isOpen && amount && parcelId) {
            paymentParcelClose(parcelId, null).then(() => {
                closePay();
                if (pathname.includes('/create/')) {
                    // @ts-ignore
                    push(`/dashboard/parcels/view/${parcelId}`);
                }
            });
        }
    };

    useEffect(() => {
        if (isOpen && amount && parcelId) {
            const amountInCents = Math.round(amount * 100); // конвертируем в евроценты

            setLoading(true);
            paymentParcelOpen(parcelId, amount).then(() => {
                fetchPaymentIntent(amountInCents).then(r => {
                    setClientSecret(r);
                    setLoading(false);
                });
            });
        }
    }, [isOpen, amount, parcelId]);

    const payContent = (
        clientSecret ? <Elements stripe={stripePromise} options={{clientSecret, locale: locale as StripeElementLocale}}>
            <PayModal/>
        </Elements> : null
    );

    return (
        <ModalCustom
            isOpen={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    onClose();
                }
            }}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">{getLabelByCode('PAYMENT')}</ModalHeader>
                <ModalBody>
                    {
                        loading ? <div className="py-4 flex w-full justify-center items-center">
                            <Spinner  size="lg"/>
                        </div> : clientSecret ? payContent : null
                    }
                </ModalBody>
            </ModalContent>
        </ModalCustom>
    );
};

export default PayDialog;
