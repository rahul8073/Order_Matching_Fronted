// src/components/OrderForm.js
import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    buyer_qty: '',
    buyer_price: '',
    seller_qty: '',
    seller_price: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (Object.values(formData).some(value => value.trim() === '')) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
  

    try {
      const response = await axios.post('http://localhost:5000/api/pending-orders', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response.data);
      setSuccess('Order submitted successfully!');
      setFormData({
        buyer_qty: '',
        buyer_price: '',
        seller_qty: '',
        seller_price: ''
      })
      window.location.reload(true)

    } catch (error) {
      console.error('There was an error!', error);
      setError('There was an error submitting your order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-md mx-auto p-4 bg-white rounded shadow-md'>
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="buyer_qty">
          Buyer Qty
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          id="buyer_qty"
          type="number"
          value={formData.buyer_qty}
          onChange={(e) => setFormData({ ...formData, buyer_qty: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="buyer_price">
          Buyer Price
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          id="buyer_price"
          type="number"
          value={formData.buyer_price}
          onChange={(e) => setFormData({ ...formData, buyer_price: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="seller_qty">
          Seller Qty
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          id="seller_qty"
          type="number"
          value={formData.seller_qty}
          onChange={(e) => setFormData({ ...formData, seller_qty: e.target.value })}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="seller_price">
          Seller Price
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          id="seller_price"
          type="number"
          value={formData.seller_price}
          onChange={(e) => setFormData({ ...formData, seller_price: e.target.value })}
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </form>

    </div>
  );
};

export default OrderForm;
