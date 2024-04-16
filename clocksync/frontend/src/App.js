// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [serverTime, setServerTime] = useState(null);
  const [clientTime, setClientTime] = useState(null);
  const [syncTime, setSyncTime] = useState(null);

  useEffect(() => {
    // Fetch server time
    axios.get('http://localhost:5000/time') // Update the URL to match your Flask server
      .then(response => {
        const serverTime = response.data.time;
        setServerTime(serverTime);
        const clientTime = new Date().getTime() / 1000; // Convert to seconds
        setClientTime(clientTime);
        const syncTime = clientTime - serverTime;
        setSyncTime(syncTime);
      })
      .catch(error => {
        console.error('Error fetching server time:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Server Time: {serverTime}</h1>
      <h1>Client Time: {clientTime}</h1>
      <h1>Time Difference: {syncTime}</h1>
    </div>
  );
}

export default App;
