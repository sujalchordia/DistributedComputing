import React, { useState } from 'react';
import axios from 'axios'; // You might need to install axios for HTTP requests

function InventoryForm() {
    const [protocol, setProtocol] = useState('');
    const [action, setAction] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');

    const handleProtocolChange = (event) => {
        setProtocol(event.target.value);
    };

    const handleActionChange = (event) => {
        setAction(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (protocol === '' || action === '') {
                // Handle error if protocol or action is not selected
                return;
            }
            
            // Sending POST request to the appropriate endpoint based on selected action
            let endpoint = '';
            if (action === 'add') {
                endpoint = 'add';
            } else if (action === 'update') {
                console.log("update");
                endpoint = 'update';
            } else if (action === 'delete') {
                endpoint = 'delete';
            }

            const response = await axios.post(`http://localhost:3001/api/inventory/${endpoint}`, {
                protocol: protocol,
                bloodGroup: itemName,
                quantity: itemQuantity
            });
            
            // Handle success response
            console.log(response.data);
        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    };

    return (
        <div className="mt-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Select Protocol:</label>
                    <select
                        className="block appearance-none w-full border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                        value={protocol}
                        onChange={handleProtocolChange}
                    >
                        <option value="">Select Protocol</option>
                        <option value="rpc">RPC</option>
                        <option value="rmi">RMI</option>
                        <option value="socket">Socket</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Select Action:</label>
                    <select
                        className="block appearance-none w-full border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                        value={action}
                        onChange={handleActionChange}
                    >
                        <option value="">Select Action</option>
                        <option value="add">Add</option>
                        <option value="update">Update</option>
                        <option value="delete">Delete</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Blood group:</label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Units of blood:</label>
                    <input
                        type="number"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={itemQuantity}
                        onChange={(e) => setItemQuantity(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default InventoryForm;
