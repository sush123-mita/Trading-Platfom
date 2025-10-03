import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'
import { Wallet, TrendingUp, BarChart3, Activity } from "lucide-react"
import SensexChart from './SensexChart'

export default function Dashboard() {
    const [balance, setBalance] = useState(0)
    const [markets, setMarkets] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get user balance
                const resBal = await API.get("/user/balance")
                console.log("Balance API response:", resBal.data)
                setBalance(resBal.data.balance || 0)

                // Get top market prices
                const resMarket = await API.get("/market")
                setMarkets(resMarket.data?.slice(0, 4) || [])
            } catch (err) {
                console.error("Dashboard fetch error:", err)
                setBalance(0)
                setMarkets([])
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-white text-lg">Loading dashboard...</div>
            </div>
        )
    }

    return (
        <div className="p-6">
            {/* Welcome Heading */}
            <h1 className="text-3xl font-extrabold text-gray-100 mb-6">
                Welcome to Your Trading Dashboard
            </h1>

            {/* Balance & Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Balance Card */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-4">
                        <Wallet size={36} />
                        <div>
                            <h2 className="text-lg">Account Balance</h2>
                            <p className="text-2xl font-bold">
                                ₹{balance.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="grid grid-cols-3 gap-4">
                    <button
                        onClick={() => navigate('/trade')}
                        className="flex flex-col items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition hover:scale-105"
                    >
                        <TrendingUp className="text-green-500 mb-2" size={28} />
                        <span className="font-medium text-gray-700">Trade</span>
                    </button>
                    <button
                        onClick={() => navigate('/prices')}
                        className="flex flex-col items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition hover:scale-105"
                    >
                        <BarChart3 className="text-blue-500 mb-2" size={28} />
                        <span className="font-medium text-gray-700">Prices</span>
                    </button>
                    <button
                        onClick={() => navigate('/history')}
                        className="flex flex-col items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition hover:scale-105"
                    >
                        <Activity className="text-purple-500 mb-2" size={28} />
                        <span className="font-medium text-gray-700">History</span>
                    </button>
                </div>
            </div>

            {/* Market Overview */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-100 mb-4">
                    Top Markets
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {markets.length > 0 ? (
                        markets.map((item, i) => (
                            <div
                                key={i}
                                className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105"
                            >
                                <h3 className="text-lg font-bold text-gray-800">{item.symbol || `Stock ${i + 1}`}</h3>
                                <p
                                    className={`text-xl font-semibold ${
                                        item.change >= 0 ? "text-green-600" : "text-red-600"
                                    }`}
                                >
                                    ₹{item.price || '0'}
                                </p>
                                <span
                                    className={`text-sm ${
                                        item.change >= 0 ? "text-green-500" : "text-red-500"
                                    }`}
                                >
                                    {item.change >= 0 ? "+" : ""}
                                    {item.change || 0}%
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-4 text-center py-8 text-gray-400">
                            No market data available
                        </div>
                    )}
                </div>
            </div>

            {/* Sensex Chart */}
            <div className="bg-white rounded-2xl shadow p-4 mb-6">
                <SensexChart symbol="SENSEX" />
            </div>
        </div>
    )
}