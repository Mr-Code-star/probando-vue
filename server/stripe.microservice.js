import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Crea una sesión de Checkout para suscripción
app.post('/api/v1/create-checkout-session', async (req, res) => {
    try {
        const { priceId, customerEmail } = req.body; // price_... desde tu db.json
        if (!priceId) return res.status(400).json({ error: 'priceId is required' });

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            line_items: [{ price: priceId, quantity: 1 }],
            customer_email: customerEmail, // opcional si ya lo tienes
            success_url: 'http://localhost:5173/login',
            cancel_url: 'http://localhost:5173/cancel',
            allow_promotion_codes: true
        });

        res.json({ id: session.id, url: session.url }); // también puedes usar redirect by URL
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
// En stripe.microservice.js
app.post('/api/v1/webhook', express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Aquí podrías actualizar el usuario en tu base de datos
        // con la información de la suscripción
        console.log('Payment succeeded for session:', session.id);
    }

    res.json({received: true});
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Stripe server running on http://localhost:${PORT}`));
