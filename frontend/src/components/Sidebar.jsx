import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, TrendingUp, BarChart3, History } from 'lucide-react';

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { path: '/', icon: Home, label: 'Dashboard' },
        { path: '/trade', icon: TrendingUp, label: 'Trade' },
        { path: '/prices', icon: BarChart3, label: 'Prices' },
        { path: '/history', icon: History, label: 'History' },
    ];

    return (
        <div className="w-64 bg-gray-800 border-r border-gray-700">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-white">TradeX</h1>
            </div>
            
            <nav className="mt-6">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                                isActive 
                                    ? 'bg-indigo-600 text-white' 
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                        >
                            <Icon size={20} className="mr-3" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}