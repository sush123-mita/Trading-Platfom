import React, { useState, useEffect } from 'react';
import API from '../services/api';

export default function Navbar({ onLogout }) {
    const [balance, setBalance] = useState(0);
    
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const res = await API.get("/user/balance");
                setBalance(res.data.balance || 0);
            } catch (err) {
                console.error("Error fetching balance:", err);
                setBalance(0);
            }
        };
        fetchBalance();
    }, []);
    
    return (
        <div className="flex items-center justify-between px-6 py-3 bg-gray-800 text-white border-b border-gray-700">
            <div className="flex items-center gap-4">
                <div className="text-xl font-bold">TradeX</div>
                <div className="text-sm text-gray-400">Minimal trading dashboard</div>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="text-sm text-gray-300">
                    Balance: <span className="font-medium">₹{balance.toLocaleString()}</span>
                </div>
                <button 
                    onClick={onLogout} 
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}