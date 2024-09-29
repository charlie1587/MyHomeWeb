import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [newItemCategory, setNewItemCategory] = useState('');
  const [groupByCategory, setGroupByCategory] = useState(false); // 控制是否按类别分组
  const [editingItem, setEditingItem] = useState(null); // 控制编辑状态

  useEffect(() => {
    axios.get('/api/shopping-list')
      .then(response => {
        const fetchedItems = Array.isArray(response.data.data) ? response.data.data : [];
        setItems(fetchedItems);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const addItem = () => {
    if (newItemName.trim() === '' || newItemCategory.trim() === '') return;

    const newItem = {
      id: Date.now(),
      name: newItemName,
      quantity: parseInt(newItemQuantity, 10),
      category: newItemCategory,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    clearForm();

    axios.post('/api/shopping-list', { items: updatedItems })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error("Error updating data:", error);
      });
  };

  const removeItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);

    axios.post('/api/shopping-list', { items: updatedItems })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error("Error updating data:", error);
      });
  };

  const clearForm = () => {
    setNewItemName('');
    setNewItemQuantity(1);
    setNewItemCategory('');
    setEditingItem(null); // 清空编辑状态
  };

  const editItem = (item) => {
    setEditingItem(item);
    setNewItemName(item.name);
    setNewItemQuantity(item.quantity);
    setNewItemCategory(item.category);
  };

  const updateItem = () => {
    if (!editingItem || newItemName.trim() === '' || newItemCategory.trim() === '') return;

    const updatedItems = items.map(item =>
      item.id === editingItem.id
        ? { ...item, name: newItemName, quantity: newItemQuantity, category: newItemCategory }
        : item
    );

    setItems(updatedItems);
    clearForm();

    axios.post('/api/shopping-list', { items: updatedItems })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error("Error updating data:", error);
      });
  };

  const renderItems = () => {
    const sortedItems = groupByCategory
      ? items.sort((a, b) => a.category.localeCompare(b.category))
      : items;

    const groupedItems = groupByCategory
      ? sortedItems.reduce((acc, item) => {
          (acc[item.category] = acc[item.category] || []).push(item);
          return acc;
        }, {})
      : { all: sortedItems };

    return groupByCategory
      ? Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="mb-6">
            <h3 className="text-xl font-semibold mb-4">{category}</h3>
            {items.map(renderItem)}
          </div>
        ))
      : sortedItems.map(renderItem);
  };

  const renderItem = (item) => (
    <div key={item.id} className="flex justify-between items-center p-4 mb-4 bg-gray-50 rounded-lg shadow">
      <div>
        <h3 className="text-xl font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
        <p className="text-sm text-gray-600">Category: {item.category}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => editItem(item)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => removeItem(item.id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
      {/* Return Button Section */}
      <div className="mb-6">
        <Link to="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Return to Home
          </button>
        </Link>
      </div>

      {/* Add or Edit Item Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Item Name"
            className="border rounded-lg px-4 py-2 w-1/3"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            min="1"
            className="border rounded-lg px-4 py-2 w-1/6"
            value={newItemQuantity}
            onChange={(e) => setNewItemQuantity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            className="border rounded-lg px-4 py-2 w-1/3"
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value)}
          />
          {editingItem ? (
            <button
              onClick={updateItem}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Update Item
            </button>
          ) : (
            <button
              onClick={addItem}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Add Item
            </button>
          )}
        </div>
      </div>

      {/* Group by Category Toggle */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            checked={groupByCategory}
            onChange={() => setGroupByCategory(!groupByCategory)}
          />
          <span className="ml-2 text-lg">Group by Category</span>
        </label>
      </div>

      {/* Shopping List Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Shopping List</h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {items.length > 0 ? (
            renderItems()
          ) : (
            <p className="text-center text-lg text-gray-500">Your shopping list is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingList;
