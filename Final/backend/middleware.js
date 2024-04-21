const fs = require('fs'); // Import the fs module
const os = require('os'); // Import the os module
const cors = require('cors'); // Import CORS middleware
const express = require('express');
const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');
const app = express();
const {v4: uuidv4} = require('uuid');

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

let clients = 0;

app.get('/assign-server', (req, res) => {
    console.log("new client hit");
    let server = (clients % 4) + 1;
    console.log("Server assigned: ", server);
    clients += 1;
    res.json({server});
});

app.listen(3050, () => {
    console.log(`Server is running on http://localhost:3050`);
    });