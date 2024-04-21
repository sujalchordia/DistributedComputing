import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests

function InventoryList({server}) {
    const [serverTime, setServerTime] = useState(null);
    const [clientTime, setClientTime] = useState(null);
    const [inventory, setInventory] = useState([]);
    const [serverNumber, setServerNumber] = useState(null);

    useEffect(() => {
        // Fetch inventory data from the backend
        const fetchInventory = async () => {
            try {
                const response = await axios.get(`http://localhost:300${server}/api/inventory`);
                setInventory(response.data.inventory);
                setServerNumber(response.data.serverNumber);
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };

        fetchInventory();

        // Set up interval to fetch server time every second
        const interval = setInterval(() => {
            fetchServerTime(); // Fetch server time every second
        }, 1000);

        fetchServerTime();

        return () => clearInterval(interval);
    }, [clientTime]);

    useEffect(() => {setClientTime(new Date().toISOString())}, []);
    
    // Fetch server time
    const fetchServerTime = async () => {
        try {
            const response = await axios.get(`http://localhost:300${server}/api/time`);
            setServerTime(response.data.time);
        } catch (error) {
            console.error('Error fetching server time:', error);
        }
    };

    // Synchronize client time with server time
    const syncTime = () => {
        setClientTime(serverTime);
    };
    

    return (
        <div>
            <div className='flex flex-col justify-center items-center h-full'>
                <h4>Server Number: {serverNumber}</h4>
                <h2 className="text-2xl font-bold mb-2">Inventory List</h2>
                <ul className='flex flex-col justify-center items-center'>
                    {inventory.map((item) => (
                        <li key={item.id} className='font-bold text-lg'>{item.bloodGroup}: {item.quantity}</li>
                    ))}
                </ul>
            </div>
            <div className='mx-4 font-bold'>
                <h4 className='mb-4 mt-4'>Server Time: {serverTime}</h4>
                <h4>Client Time: {clientTime}</h4>
                <button onClick={syncTime} className='bg-white px-2 py-1 ml-8 mt-2 text-lg rounded-lg'>Sync</button>
            </div>
        </div>
    );
}

export default InventoryList;
