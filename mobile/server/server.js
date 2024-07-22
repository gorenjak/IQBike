import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config'

const app = express();
const port = 3000;
const PUBLISHABLE_KEY = process.env.STRIPE_API_KEY;
const SECRET_KEY = process.env.STRIPE_API_SECRET_KEY;

import Stripe from "stripe";
const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-11-15" });

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening at http://192.168.0.38:${port}`);
});

app.post('/create-customer', async (req, res) => {
  try {
    console.log(req.body);
    const { email } = req.body;

    // Create a new customer using the Stripe API
    const customer = await stripe.customers.create({
      email: email,
      // You can add more customer details here if needed
    });
    console.log('Customer ID:', customer.id);
    res.send({ customer: customer });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Error creating customer' });
  }
});

app.delete('/delete-customer/:customerId', async (req, res) => {
  try {
    const customerId = req.params.customerId;

    await stripe.customers.del(customerId);
    console.log("uspešno izbrisan uporabnik")
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Error deleting customer' });
  }
});

app.post('/create-subscription', async (req, res) => {
  const customerId = req.body.customerId;
  const priceId = req.body.priceId;

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
    });

    if (subscriptions.data.length > 0) {
      return res.status(400).json({ error: { message: 'Customer already has an active subscription.' } });
    }

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{
        price: priceId,
      }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    const clientSecret = subscription.latest_invoice.payment_intent.client_secret;
    console.log("uspešna registracija")
    res.json({ message: 'Payment initiated', clientSecret });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

app.post('/cancel-subscription', async (req, res) => {
  try {
    const { subscriptionId } = req.body;

    // Cancel the subscription using the Stripe API
    const canceledSubscription = await stripe.subscriptions.del(subscriptionId);

    res.json({ canceledSubscription });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({ error: 'Error canceling subscription' });
  }
});

app.post('/default-payment', async (req, res) => {
  const customerId = req.body.customerId;
  try {
    const paymentMethod = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card', // You can also fetch other types of payment methods if needed
    });
    const paymentMethodObject = JSON.parse(JSON.stringify(paymentMethod));
    const firstPaymentMethodId = paymentMethodObject.data[0].id;

    console.log('First Payment Method ID:', firstPaymentMethodId);

    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: firstPaymentMethodId,
      },
    });
    console.log("uspešno default plačilo")
    res.json({ message: 'Payment initiated' });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

app.get('/subscriptions/:id', async (req, res) => {
  const customerId = req.params.id;
  console.log(customerId)
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
    expand: ['data.default_payment_method'],
  });

  res.json({ subscriptions });
});

app.get('/get-default-payment/:id', async (req, res) => {
  const customerId = req.params.id;
  console.log(customerId);
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });
    console.log(paymentMethods)
    res.json({ paymentMethods });
  } catch (error) {
    console.error('Error fetching default payment method:', error);
    res.status(500).json({ message: 'An error occurred while fetching default payment method.' });
  }
});

app.get('/get-receipts/:id', async (req, res) => {
  const customerId = req.params.id;
  try {
    const receipts = await stripe.invoices.list({
      customer: customerId,
    });
    res.json({ receipts });
  } catch (error) {
    console.error('Error fetching receipts:', error);
    res.status(500).json({ message: 'An error occurred while fetching receipts.' });
  }
});