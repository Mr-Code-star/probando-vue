import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/api/v1/create-checkout-session', async (req, res) => {
    try {
        const { priceId, customerEmail } = req.body;
        if (!priceId) return res.status(400).json({ error: 'priceId is required' });

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            line_items: [{ price: priceId, quantity: 1 }],
            customer_email: customerEmail,
            success_url: 'http://localhost:5173/setup-profile?payment=success&session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:5173/subscriptions', // Volver a suscripciones
            allow_promotion_codes: true
        });

        res.json({ id: session.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Stripe server running on http://localhost:${PORT}`));
