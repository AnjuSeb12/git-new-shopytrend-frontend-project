import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md text-center">
            <h2 className="text-xl font-bold mb-4 text-black">Order Successful</h2>
            <p className="text-gray-600 mb-4">Thank you for your order! Your payment has been processed successfully.</p>
            <Link to="/" className="text-green-500 hover:underline">
                Return to Home
            </Link>
        </div>
    );
};

export default OrderSuccess;
