import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    // Function to fetch orders
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/orders/allorders');
            console.log(response.data.orders)
            setOrders(response.data.orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    // Fetch orders on component mount and set up polling
    useEffect(() => {
        fetchOrders();
        const intervalId = setInterval(fetchOrders, 30000); // Refresh every 30 seconds

        // Cleanup on component unmount
        return () => clearInterval(intervalId);
    }, [setOrders]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-semibold text-center mb-8">Your Orders</h1>
            {orders.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {orders.map((order) => (
                        <div key={order._id} className="border rounded-lg shadow-lg p-4">
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>
                                <p className="text-gray-600">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p className="text-gray-600">Total Items: {order.orderItems.length}</p>
                                <p className={`font-bold ${order.paymentStatus === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>
                                    Payment Status: {order.paymentStatus}
                                </p>
                                {order.user && (
                                    <div className="mt-4">
                                        <p className="text-gray-600">User: {order.user.firstName} ({order.user.email})</p>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-4">
                                {order.orderItems.map((item) => (
                                    <div key={item.productId} className="flex items-center">
                                        <img
                                            src={item.productId.image}
                                            alt={item.productId.title}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold">{item.productId.title}</h3>
                                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                                            <p className="text-gray-600">Price: ₹{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No orders found.</p>
            )}
        </div>
    );
};

export default OrderList;
