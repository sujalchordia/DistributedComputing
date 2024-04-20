import React from 'react';
import InventoryForm from './InventoryForm';
import InventoryList from './InventoryList';

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>

      </div>
      <div className="max-w-md w-full p-12 bg-blue-200 shadow-lg flex">
        <div className="w-1/2 pr-4">
          <InventoryList />
        </div>
        <div className="w-1/2 pl-4">
          <h1 className="text-2xl font-bold mb-4">Blood Bank Inventory Management</h1>
          <InventoryForm />
        </div>
      </div>
    </div>
  );
}

export default App;
