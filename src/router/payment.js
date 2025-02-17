const express = require('express')
const base_url = require('../utils/constant')

const paymentRouter = express.Router();

const Stripe = require('stripe');
const { userAuth } = require('../middlewares/authAdmin');
const stripe = Stripe("sk_test_51QtRbr4WaM29ekhpolujWX6OtmM7hdVcOxZlpUZEIay9rbmTF0URi2lqzYXuBcWOZeMI12PhD7bOVSOk2jW6JWj2006fjQp1oK");

const prices = {
    silver: "price_1QtSaI4WaM29ekhpTZRB5jGG", // $9.99
    gold: "price_1QtSai4WaM29ekhpANjXnKjT"  // $19.99
  };

paymentRouter.post('/payment/create', userAuth, async(req, res)=>{
    const { packageType } = req.body;

    const prices = {
        silver: "price_1QtSaI4WaM29ekhpTZRB5jGG", // $9.99
        gold: "price_1QtSai4WaM29ekhpANjXnKjT"  // $19.99
      };

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: prices[packageType], // Use the Price ID directly
          quantity: 1
        }
      ],
      mode: 'subscription', // Using subscription mode
      success_url: `${base_url}/success`,
      cancel_url: `${base_url}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = paymentRouter;