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
        throw new Error("Stripe no se pudo inicializar. Falta la clave pública.");
    }

    try {
        // Llama al backend para crear la sesión de pago
        const response = await fetch('http://localhost:3001/api/v1/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ priceId, customerEmail }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error al crear la sesión de pago");
        }

        const { id: sessionId } = await response.json();
        const stripe = await stripePromise;

        // Redirige al checkout de Stripe
        return stripe.redirectToCheckout({ sessionId });
    } catch (error) {
        console.error("🔴 Error en el proceso de pago:", error);
        throw error; // Propaga el error para manejarlo en el componente
    }
}