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
            success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:5173/cancel',
            allow_promotion_codes: true
        });

        res.json({ id: session.id, url: session.url }); // también puedes usar redirect by URL
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Stripe server running on http://localhost:${PORT}`));
