import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderTable = ({ type }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${url}/api/pending-orders`)
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));
  }, [type]);
// console.log(orders);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer Qty</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer Price</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller Qty</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller Price</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map(order => (
            <tr key={order.id}>
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{order.buyer_qty}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{order.buyer_price}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{order.seller_qty}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{order.seller_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
