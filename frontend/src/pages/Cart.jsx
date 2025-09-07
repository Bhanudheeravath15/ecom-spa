import React, { useEffect, useState } from 'react';
import API from '../api';

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await API.get('/cart');
        setCart(res.data);
      } catch (err) {
        console.error('Error fetching cart:', err);
        alert('Please login to view your cart.');
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (itemId) => {
    try {
      await API.post('/cart/remove', { itemId });
      setCart((prev) => ({
        ...prev,
        items: prev.items.filter((i) => i.itemId._id !== itemId),
      }));
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.items.map((item) => (
            <li key={item.itemId._id} className="mb-2 border p-2 flex justify-between items-center">
              <div>
                <strong>{item.itemId.name}</strong> - ₹{item.itemId.price} × {item.quantity}
              </div>
              <button
                onClick={() => removeFromCart(item.itemId._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
