export async function createPaymentIntent(amount: number, currency: string): Promise<string | undefined> {
    try {
        const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount, currency }),
        });

        const data = await response.json();

        if (response.ok) {
            return data.clientSecret;
        } else {
            console.error('Ошибка получения client_secret:', data.error);
        }
    } catch (error) {
        console.error('Ошибка запроса на создание PaymentIntent:', error);
    }
}
