import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../src/App.css'; // Import your CSS file

function App() {
  const [inventory, setInventory] = useState({});
  const [bloodType, setBloodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [serverTime, setServerTime] = useState('');

  useEffect(() => {
    fetchInventoryAndServerTime();
  }, []);

  const setQty = (value) => {
    // Check if the value is an empty string or a valid number
    if (value === '' || !isNaN(value)) {
      // Update the state with the parsed integer value or empty string
      setQuantity(value === '' ? '' : parseInt(value));
    }
  };

  const fetchInventoryAndServerTime = async () => {
    try {
      const response = await axios.get('http://localhost:5000/inventory');
      setInventory(response.data.inventory);
      setServerTime(response.data.server_time);
    } catch (error) {
      console.error('Error fetching inventory and server time:', error);
    }
  }
  
  const validBloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const addBlood = async () => {
    if (!validBloodTypes.includes(bloodType)) {
      alert('Error: Not a valid blood type');
      return;
    }

    try {
      await axios.post('http://localhost:5000/add_blood', {
        blood_type: bloodType,
        quantity: quantity
      });
      fetchInventoryAndServerTime();
    } catch (error) {
      console.error('Error adding blood:', error);
    }
  }

  const removeBlood = async () => {
    try {
      const response = await axios.post('http://localhost:5000/remove_blood', {
        blood_type: bloodType,
        quantity: quantity
      });
      fetchInventoryAndServerTime();
    } catch (error) {
      console.error('Error removing blood:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert('Error: ' + error.response.data.error);
      } else {
        alert('An error occurred while removing blood.');
      }
    }
  }

  return (
    <div className="container">
      <h1 className="heading">Blood Bank System</h1>
      <div className="form-group">
        <label>Blood Type:</label>
        <input type="text" value={bloodType} onChange={(e) => setBloodType(e.target.value)} className="input-field" />
      </div>
      <div className="form-group">
        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={(e) => setQty(parseInt(e.target.value))} className="input-field" />
      </div>
      <button onClick={addBlood} className="button">Add Blood</button>
      <button onClick={removeBlood} className="button">Remove Blood</button>

      <div className='cont'>
        <h2 className="heading">Inventory</h2>
        <p>Server Time: {serverTime}</p>
        <ul className="inventory-list">
          {Object.keys(inventory).map((bloodType, index) => (
            <li key={index} className="inventory-item">{bloodType}: {inventory[bloodType]}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
