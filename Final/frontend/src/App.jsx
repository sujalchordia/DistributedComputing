import React, {useState} from 'react';
import InventoryForm from './InventoryForm';
import InventoryList from './InventoryList';

function App() {
  var [threadID, setThreadID] = useState(null);
  window.onload = () => {
    fetch('http://localhost:3001/init-thread')
      .then(response => response.json())
      .then(data => {
        // Store the thread ID in local storage
        setThreadID(data.threadId);
        localStorage.setItem('threadId', data.threadId);
        
        // Now you can use the thread ID throughout the session
        console.log('Thread ID:', data.threadId);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-3/5 p-12 bg-blue-200 shadow-lg flex">
        <div className="w-1/3 pr-4">
          <InventoryList />
        </div>
        <div className="w-2/3 pl-4">
          <h1 className="text-2xl font-bold mb-4">Blood Bank Inventory Management</h1>
          <InventoryForm />
        </div>
      </div>
      <div>
          <h3>Thread ID: {threadID}</h3>
      </div>
    </div>
  );
}

export default App;
