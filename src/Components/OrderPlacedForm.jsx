// src/components/OrderForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const OrderPlacedForm = () => {
  const [buyerQty, setBuyerQty] = useState('');
  const [buyerPrice, setBuyerPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Basic validation
    if (!buyerQty || !buyerPrice) {
      setError('Both fields are required.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(`${url}/api/place-order`, {
        buyer_qty: parseFloat(buyerQty),
        buyer_price: parseFloat(buyerPrice),
      });

      console.log(response);
      
      setBuyerQty('');
      setBuyerPrice('');
      setSuccess(response.data.message);
      window.location.reload(true)
    } catch (error) {
      // Handle error
      setError('Failed to place order.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Place Order</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="buyer_qty" className="block text-gray-700">Quantity</label>
          <input
            id="buyer_qty"
            type="number"
            value={buyerQty}
            onChange={(e) => setBuyerQty(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="buyer_price" className="block text-gray-700">Price</label>
          <input
            id="buyer_price"
            type="number"
            value={buyerPrice}
            onChange={(e) => setBuyerPrice(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default OrderPlacedForm;
