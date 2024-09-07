// src/App.js
import React from 'react';
import OrderTable from './Components/OrderTable';
import OrderForm from './Components/OrderForm';
import OrderPlacedForm from './Components/OrderPlacedForm';
import ComletedOrderTable from './Components/CompletedOrder';
import PriceChart from './Components/PriceChart';

function App() {
  return (
    <div className="container bg-gray-500 mx-auto p-4  ">
      <h1 className="text-2xl font-bold my-4">Order Matching System</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        <div className="my-4">
          <OrderForm />
        </div>
        <div className="my-4">
          <OrderPlacedForm />
        </div>
        <div className="my-4">
          <h2 className="text-xl font-bold">Pending Orders</h2>
          <OrderTable />
        </div>
        <div className="my-4">
          <h2 className="text-xl font-bold">Completed Orders</h2>
          <ComletedOrderTable />
        </div>
        <div className="my-4 md:col-span-2">
          <PriceChart />
        </div>

      </div>
    </div>
  );
}

export default App;
