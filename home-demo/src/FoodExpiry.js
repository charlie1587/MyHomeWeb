import React, { useState, useEffect } from 'react';

const FoodExpiry = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Milk', category: 'Dairy', expiry: '2023-10-10' },
    { id: 2, name: 'Bread', category: 'Bakery', expiry: '2023-10-05' },
    { id: 3, name: 'Apple', category: 'Fruit', expiry: '2023-10-15' },
  ]);

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => new Date(a.expiry) - new Date(b.expiry));
    setData(sortedData);
  }, [data]);

  return (
    <div style={{ padding: '20px', backgroundColor: 'white' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>食物保质期</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>序号</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>食物名称</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>类别</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>过期时间</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.category}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.expiry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodExpiry;