import React, { useEffect, useState } from 'react';
import API from '../api';

const Products = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await API.get('/items', {
          params: { category, price },
        });
        setItems(res.data);
      } catch (err) {
        console.error('Error fetching items:', err);
      }
    };

    fetchItems();
  }, [category, price]);

  const addToCart = async (itemId) => {
    try {
      await API.post('/cart/add', { itemId, quantity: 1 });
      alert('Item added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Please login first.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2"
        />
      </div>
      <ul>
        {items.map((item) => (
          <li key={item._id} className="mb-2 border p-2 flex justify-between items-center">
            <div>
              <strong>{item.name}</strong> - ₹{item.price}
            </div>
            <button
              onClick={() => addToCart(item._id)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
