import React, { useState } from "react";
import API from "../services/api";

export default function Trade() {
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleTrade = async (type) => {
    try {
      const res = await API.post("/trade", { symbol, amount, type });
      setMessage(res.data.message || "Trade executed!");
    } catch (err) {
      setMessage("Error executing trade");
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Place a Trade</h1>
      <div className="bg-white p-6 rounded-2xl shadow-md space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Symbol (e.g. SENSEX, AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="w-full border rounded-lg p-2"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded-lg p-2"
        />
        <div className="flex gap-4">
          <button
            onClick={() => handleTrade("BUY")}
            className="flex-1 bg-green-600 text-white rounded-lg p-2 hover:bg-green-700"
          >
            Buy
          </button>
          <button
            onClick={() => handleTrade("SELL")}
            className="flex-1 bg-red-600 text-white rounded-lg p-2 hover:bg-red-700"
          >
            Sell
          </button>
        </div>
        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  );
}
