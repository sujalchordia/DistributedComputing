import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [bloodType, setBloodType] = useState('');
  const [operation, setOperation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [exclusiveAccess, setExclusiveAccess] = useState(false);
  const [message, setMessage] = useState('');

  const handleOperation = async () => {
    try {
      const response = await axios.post('http://localhost:5000/inventory', {
        blood_type: bloodType,
        operation: operation,
        quantity: quantity,
        exclusive_access: exclusiveAccess
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Blood Bank Inventory Management</h1>
      <label>
        Blood Type:
        <input type="text" value={bloodType} onChange={(e) => setBloodType(e.target.value)} />
      </label>
      <label>
        Operation:
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="">Select Operation</option>
          <option value="read">Read</option>
          <option value="add">Add</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>
      </label>
      {(operation === 'add' || operation === 'update') && (
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </label>
      )}
      <label>
        Exclusive Access:
        <input type="checkbox" checked={exclusiveAccess} onChange={(e) => setExclusiveAccess(e.target.checked)} />
      </label>
      <button onClick={handleOperation}>Perform Operation</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
