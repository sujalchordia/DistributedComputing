import React, {useEffect, useState} from 'react';
import InventoryForm from './InventoryForm';
import InventoryList from './InventoryList';

function App() {
  const [threadID, setThreadID] = useState(null);
  const [server, setServer] = useState(null);
  let flag = false;

  useEffect(() => {
    if (!flag) {
      async function fetchServer() {
        try {
          const response = await fetch(`http://localhost:3050/assign-server`);
          const data = await response.json();
          setServer(data.server);
          setHasFetchedServer(true); // Set the flag to true after fetching server
        } catch (error) {
          console.error('Error fetching server:', error);
        }
      }
      fetchServer();
      flag = true;
    }
  }, []); // Run the effect whenever hasFetchedServer changes

  useEffect(() => {
    if (server) {
      fetch(`http://localhost:300${server}/init-thread`)
        .then(response => response.json())
        .then(data => {
          setThreadID(data.threadId);
          localStorage.setItem('threadId', data.threadId);
          console.log('Thread ID:', data.threadId);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [server]); // Run the effect whenever server changes

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-3/5 p-12 bg-blue-200 shadow-lg flex">
        <div className="w-1/3 pr-4">
          {server && <InventoryList server={server} />}
        </div>
        <div className="w-2/3 pl-4">
          <h1 className="text-2xl font-bold mb-4">Blood Bank Inventory Management</h1>
          {server && <InventoryForm server={server} />}
        </div>
      </div>
      <div>
        <h3>Thread ID: {threadID}</h3>
      </div>
    </div>
  );
}

export default App;
