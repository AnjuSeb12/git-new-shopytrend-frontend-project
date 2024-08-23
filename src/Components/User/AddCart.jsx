
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCart = ({ product, quantity = 1, disabled }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (productId) => {
    setIsAdding(true);
    try {
      await axios.post(
        `http://localhost:4000/api/v1/cart/addcart/${productId}`,
        { quantity },
        { withCredentials: true }
      );
      toast.success('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add item to cart.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link to="/user/cart">
      <button
        onClick={() => handleAddToCart(product._id)}
        className={`bg-green-800 text-white text-sm py-2 px-4 rounded transition-transform transform hover:scale-105 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled || isAdding}
      >
        {isAdding ? 'Adding...' : 'ADD TO CART'}
      </button>
    </Link>
  );
};

export default AddCart;
