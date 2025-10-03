import React from 'react';

export default function Navbar({ onLogout }) {
    const balance = 0; // You can pass this as prop if needed
    
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