import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../constant';

const ComletedOrderTable = ({ type }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${url}/api/completed-orders`)
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));
  }, [type]);
console.log("Completed");

  return (
    <div className='overflow-x-auto'>
    <table className="min-w-full table-auto">
      <thead className='min-w-full divide-y divide-gray-200'>
        <tr className="bg-gray-50">
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {orders.map(order => (
          <tr key={order.id}>
            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{order.qty}</td>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{order.price}</td>
          </tr>
        ))}
      </tbody>
    </table>

    </div>
  );
};

export default ComletedOrderTable;
