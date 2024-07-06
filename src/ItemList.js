import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const API_URL = 'https://fakestoreapi.com/products';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: '', price: '', description: '', image: '', category: '' });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchItems(); 
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addItem = async () => {
    try {
      const response = await axios.post(API_URL, newItem);
      setItems([...items, response.data]);
      setNewItem({ title: '', price: '', description: '', image: '', category: '' });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const updateItem = async () => {
    try {
      const response = await axios.put(`${API_URL}/${editItem.id}`, editItem);
      setItems(items.map(item => (item.id === editItem.id ? response.data : item)));
      setEditItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="ItemList">
      <h1>Item List</h1>
      <div>
        <h2>{editItem ? 'Edit Item' : 'Add New Item'}</h2>
        <form>
          <input
            type="text"
            placeholder="Title"
            value={editItem ? editItem.title : newItem.title}
            onChange={(e) => (editItem ? setEditItem({ ...editItem, title: e.target.value }) : setNewItem({ ...newItem, title: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Price"
            value={editItem ? editItem.price : newItem.price}
            onChange={(e) => (editItem ? setEditItem({ ...editItem, price: e.target.value }) : setNewItem({ ...newItem, price: e.target.value }))}
          />
          <textarea
            placeholder="Description"
            value={editItem ? editItem.description : newItem.description}
            onChange={(e) => (editItem ? setEditItem({ ...editItem, description: e.target.value }) : setNewItem({ ...newItem, description: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={editItem ? editItem.image : newItem.image}
            onChange={(e) => (editItem ? setEditItem({ ...editItem, image: e.target.value }) : setNewItem({ ...newItem, image: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Category"
            value={editItem ? editItem.category : newItem.category}
            onChange={(e) => (editItem ? setEditItem({ ...editItem, category: e.target.value }) : setNewItem({ ...newItem, category: e.target.value }))}
          />
          <button type="button" onClick={editItem ? updateItem : addItem}>{editItem ? 'Update' : 'Add'} Item</button>
        </form>
      </div>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Category: {item.category}</p>
            <img src={item.image} alt={item.title} />
            <button onClick={() => setEditItem(item)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
