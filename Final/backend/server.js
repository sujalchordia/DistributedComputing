// server.js
const fs = require('fs'); // Import the fs module
const cors = require('cors'); // Import CORS middleware
const express = require('express');
const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.get('/api/time', (req, res) => {
  res.json({ time: new Date().toISOString() });
});

// Route to fetch inventory data
app.get('/api/inventory', (req, res) => {
    try {
      // Read inventory data from the file
      const inventoryData = fs.readFileSync('inventory.txt', 'utf8');
      // Parse the JSON data
        const inventory = JSON.parse(inventoryData);
      // Send the inventory data as response
      res.json(inventory);
    } catch (err) {
      console.error('Error reading inventory file:', err);
      res.status(500).send('Internal Server Error');
    }
});
  
// Add inventory
app.post('/api/inventory/add', (req, res) => {
  const {protocol, bloodGroup, quantity} = req.body;
  const newItem = {bloodGroup, quantity};
  const options = {
    scriptPath: `./protocols/${protocol}`, // Path to the protocol-specific Python script
    args: ['addInventory', JSON.stringify(newItem)]
  };
  runPythonScript(protocol, options, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});

// Update inventory
app.post('/api/inventory/update', (req, res) => {
  const { protocol, bloodGroup, quantity} = req.body;
  const newItem = {bloodGroup, quantity};
  
  // Call the runPythonScript function with method name and arguments
  const options = {
    scriptPath: `./protocols/${protocol}`, // Path to the protocol-specific Python script
    args: ['updateInventory', JSON.stringify(newItem)]
  };

  runPythonScript(protocol, options, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});


// Delete inventory
app.post('/api/inventory/delete', (req, res) => {
  const {protocol, bloodGroup} = req.body;
  const options = {
    scriptPath: `./protocols/${protocol}`, // Path to the protocol-specific Python script
    args: ['deleteInventory', bloodGroup]
  };
  
  runPythonScript(protocol, options, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});


// Helper function to run Python scripts
const runPythonScript = (protocol, options, res) => {
  PythonShell.run(`${protocol}_script.py`, options, (err, result) => {
    if (err) {
      console.error('Error executing Python script:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
};

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
