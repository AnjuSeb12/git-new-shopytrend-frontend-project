import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import PaymentForm from './PaymentForm';

const OrderForm = () => {
    const location = useLocation();
    const [orderItems, setOrderItems] = useState([]);
    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });
    const [clientSecret, setClientSecret] = useState('');
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (location.state?.cartItems) {
            const items = location.state.cartItems.map(item => ({
                productId: item.product._id, // Updated field name
                title: item.product.title,
                image: item.product.image,
                quantity: item.quantity,
                price: item.product.price, // Assuming this field exists in product
                totalPrice: item.totalPrice
            }));
            setOrderItems(items);

            // Calculate total quantity and total price
            const totalQty = items.reduce((acc, item) => acc + item.quantity, 0);
            const totalPrice = items.reduce((acc, item) => acc + item.totalPrice, 0);
            setTotalQuantity(totalQty);
            setTotalPrice(totalPrice);
        }
    }, [location.state?.cartItems]);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const items = [...orderItems];
        items[index][name] = value;
        setOrderItems(items);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:4000/api/v1/orders/add', {
                orderItems,
                shippingAddress
            }, { withCredentials: true });
            setClientSecret(data.clientSecret);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md sm:p-6 md:p-8 lg:p-10">
            <h2 className="text-xl font-bold mb-4 sm:text-2xl md:text-3xl lg:text-4xl text-black">Place Your Order</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {orderItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-auto object-cover rounded-md sm:w-20 sm:h-20 lg:w-24 lg:h-24"
                        />
                        <div className="flex-1">
                            <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-black">{item.title}</h3>
                            <p className="text-xs sm:text-sm lg:text-base text-black">Quantity: {item.quantity}</p>
                            <p className="text-xs sm:text-sm lg:text-base text-black">Total Price: ${item.totalPrice.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                    <input
                        type="text"
                        name="address"
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                        placeholder="Shipping Address"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 sm:px-4 sm:py-3 lg:px-5 lg:py-4"
                    />
                    <input
                        type="text"
                        name="city"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        placeholder="City"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 sm:px-4 sm:py-3 lg:px-5 lg:py-4"
                    />
                    <input
                        type="text"
                        name="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                        placeholder="Postal Code"
                         maxLength="10"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 sm:px-4 sm:py-3 lg:px-5 lg:py-4"
                    />
                    <input
                        type="text"
                        name="country"
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                        placeholder="Country"
                        
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 sm:px-4 sm:py-3 lg:px-5 lg:py-4"
                    />
                </div>
                <div className="font-bold text-lg sm:text-xl lg:text-2xl text-black">
                    <p>Total Quantity: {totalQuantity}</p>
                    <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
                </div>
                <button type="submit" className="w-full px-3 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-200 sm:px-4 sm:py-3 lg:px-5 lg:py-4">
                    Continue to Payment
                </button>
            </form>
            {clientSecret && <PaymentForm clientSecret={clientSecret} />}
        </div>
    );
};

export default OrderForm;
