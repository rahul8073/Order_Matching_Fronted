import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Modal from 'react-modal';
import dayjs from 'dayjs';

Modal.setAppElement('#root');

const PriceChart = () => {
  // Add initial static data
  const initialData = [
    { time: dayjs().subtract(30, 'minute').format('HH:mm'), price: 100 },
    { time: dayjs().subtract(20, 'minute').format('HH:mm'), price: 105 },
    { time: dayjs().subtract(10, 'minute').format('HH:mm'), price: 110 },
    { time: dayjs().format('HH:mm'), price: 115 }
  ];

  const [data, setData] = useState(initialData);  // Use the static data as the initial state
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newPoint, setNewPoint] = useState({ time: '', price: '' });
  const [filter, setFilter] = useState('all');

  const addNewPoint = () => {
    setData([...data, { time: dayjs().format('HH:mm'), price: Number(newPoint.price) }]);
    setIsOpen(false);
  };

  const filteredData = () => {
    const now = dayjs();
    if (filter === '10min') {
      return data.filter(point => dayjs(point.time).isAfter(now.subtract(10, 'minute')));
    } else if (filter === '1hr') {
      return data.filter(point => dayjs(point.time).isAfter(now.subtract(1, 'hour')));
    }
    return data;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Dynamic Commodity Price Chart</h1>
      
      <div className="mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsOpen(true)}>Add New Data Point</button>
      </div>

      <div className="mb-4">
        <select className="border p-2" onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="10min">Last 10 Minutes</option>
          <option value="1hr">Last 1 Hour</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
        <h2 className="text-lg font-bold mb-4">Add New Data Point</h2>
        <input 
          type="number"
          placeholder="Price"
          value={newPoint.price}
          onChange={(e) => setNewPoint({ ...newPoint, price: e.target.value })}
          className="border p-2 mb-4 w-full"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addNewPoint}>Add Point</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded ml-2" onClick={() => setIsOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
};

export default PriceChart;
