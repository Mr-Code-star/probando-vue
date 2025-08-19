import { loadStripe } from '@stripe/stripe-js';

// Verifica que la clave esté definida
const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
if (!stripeKey) {
    console.error("❌ Error: La clave pública de Stripe no está definida en las variables de entorno.");
}

// Carga Stripe solo si la clave existe
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

export async function goToCheckout(priceId, customerEmail) {
    if (!stripePromise) {
        throw new Error("Stripe not initialized. Missing public key.");
    }

    try {
        const response = await fetch('http://localhost:3001/api/v1/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                priceId,
                customerEmail // Make sure this matches the backend expectation
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to create payment session");
        }

        const { id: sessionId } = await response.json();
        const stripe = await stripePromise;

        return stripe.redirectToCheckout({ sessionId });
    } catch (error) {
        console.error("Payment process error:", error);
        throw new Error(`Checkout failed: ${error.message}`);
    }
}