import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-06-20',
});

interface PaymentRequestBody {
    amount: number;
    currency: string;
}

export async function POST(request: Request) {
    try {
        const { amount, currency } = (await request.json()) as PaymentRequestBody;

        if (!amount || typeof amount !== 'number' || !currency || typeof currency !== 'string') {
            return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card'],
        });

        const response = NextResponse.json({ clientSecret: paymentIntent.client_secret });
        response.headers.set('Cache-Control', 'no-store, max-age=0');

        return response;
    } catch (error: any) {
        console.error('Ошибка создания PaymentIntent:', error);
        const response = NextResponse.json({ error: error.message }, { status: 500 });
        response.headers.set('Cache-Control', 'no-store, max-age=0');
        
        return response;
    }
}
