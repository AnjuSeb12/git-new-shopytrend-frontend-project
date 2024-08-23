import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentForm from './PaymentForm';

const OrderForm = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [orderItems, setOrderItems] = useState([]);
    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        if (location.state?.product) {
            const { product } = location.state;
            setOrderItems([{
                productId: product._id,
                image: product.image,
                title: product.title,
                quantity: 1,
                price: product.price,
                totalPrice: product.price
            }]);
        }
    }, [location.state?.product]);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const items = [...orderItems];
        items[index][name] = value;

        if (name === 'quantity') {
            items[index].totalPrice = items[index].price * value;
        }

        setOrderItems(items);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { data } = await axios.post('http://localhost:4000/api/v1/orders/add', {
            orderItems: orderItems.map(item => ({
                productId: item.productId,
                title: item.title,
                image: item.image,
                quantity: item.quantity,
                price: item.price,
                totalPrice: item.totalPrice
            })),
            shippingAddress
        },
        { withCredentials: true });
        setClientSecret(data.clientSecret);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Place Your Order</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {orderItems.map((item, index) => (
                    <div key={index} className="space-y-2">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-64 object-cover rounded-md mb-2"
                        />
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                name="quantity"
                                value={item.quantity}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="Quantity"
                                className="w-20 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                            <p>Price: ₹{item.price.toFixed(2)}</p>
                            <p>Total:₹{item.totalPrice.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                    <input
                        type="text"
                        name="address"
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                        placeholder="Address"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-2"
                    />
                    <input
                        type="text"
                        name="city"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        placeholder="City"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-2"
                    />
                    <input
                        type="text"
                        name="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                        placeholder="Postal Code"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-2"
                    />
                    <input
                        type="text"
                        name="country"
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                        placeholder="Country"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Place Order
                </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 mt-2"
                >
                    Cancel
                </button>
            </form>
            {clientSecret && (
                <PaymentForm clientSecret={clientSecret} />
            )}
        </div>
    );
};

export default OrderForm;
