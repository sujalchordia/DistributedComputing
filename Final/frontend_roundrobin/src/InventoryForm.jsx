import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InventoryForm({ server }) {
    const [protocol, setProtocol] = useState('');
    const [action, setAction] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [threadId, setThreadId] = useState(null);
    const [accessMessage, setAccessMessage] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const fetchThreadId = async () => {
            try {
                const response = await axios.get(`http://localhost:300${server}/check-access`);
                setThreadId(response.data.threadId);
            } catch (error) {
                console.error('Error fetching thread ID:', error);
            }
        };

        fetchThreadId();
    }, []);

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
                return;
            }

            let endpoint = '';
            if (action === 'add') {
                endpoint = 'add';
            } else if (action === 'update') {
                endpoint = 'update';
            } else if (action === 'delete') {
                endpoint = 'delete';
            }
            let exlcthread = await axios.get(`http://localhost:300${server}/check-access`);
            setThreadId(exlcthread.data.threadId);
            if (threadId === null || threadId === localStorage.getItem('threadId')) {
                try {
                    const resp = await axios.post(`http://localhost:300${server}/grant-access`, { threadId: localStorage.getItem('threadId') });
                    console.log('Response:', resp.data);

                    const response = await axios.post(`http://localhost:300${server}/api/inventory/${endpoint}`, {
                        protocol: protocol,
                        bloodGroup: itemName,
                        quantity: itemQuantity
                    });
                    console.log('Inventory API Response:', response.data);
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                setAccessMessage(`Client ${threadId} has exclusive access. Please wait.`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCheckboxChange = async (event) => {
        if (isChecked) {
            // Revoke exclusive access
            try {
                const response = await axios.post(`http://localhost:300${server}/grant-access`, { threadId: null });
                setAccessMessage('Access revoked');
                setIsChecked(!event.target.checked);
            } catch (error) {
                console.error('Error:', error);
                setAccessMessage('Error revoking access. Please try again later.');
            }
            return;
        }
        try {
            const accessCheckResponse = await axios.get(`http://localhost:300${server}/check-access`);
            console.log(accessCheckResponse.data.threadId);
            setThreadId(accessCheckResponse.data.threadId);
            if (accessCheckResponse.data.threadId === null || accessCheckResponse.data.threadId === localStorage.getItem('threadId')) {
                const grantAccessResponse = await axios.post(`http://localhost:300${server}/grant-access`, { threadId: localStorage.getItem('threadId') });
                setAccessMessage('Access granted');
                setIsChecked(!event.target.checked);
            } else {
                setAccessMessage(`Client ${accessCheckResponse.data.threadId} has exclusive access. Please wait.`);
            }
        } catch (error) {
            console.error('Error:', error);
            setAccessMessage('Error checking access. Please try again later.');
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
                <div className='p-4'>
                    <input
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <label className='ml-2 pb-2'>Enable Exclusive Access</label>
                    <h4>{accessMessage}</h4>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default InventoryForm;
