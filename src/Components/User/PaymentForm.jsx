import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (stripeError) {
            setError(stripeError.message);
            setIsProcessing(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            try {
                const response = await axios.post(
                    'http://localhost:4000/api/v1/orders/verify-payment',
                    { paymentIntentId: paymentIntent.id },
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.status === 200) {
                    window.location.href = '/order-success'; // Redirect on success
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Error verifying payment');
            }
        }
        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <CardElement />
            {error && <div className="text-red-500 mt-2">{error}</div>}
            <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-4"
                disabled={isProcessing}
            >
                {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};

const PaymentFormWrapper = ({ clientSecret }) => (
    <Elements stripe={stripePromise}>
        <PaymentForm clientSecret={clientSecret} />
    </Elements>
);

export default PaymentFormWrapper;
