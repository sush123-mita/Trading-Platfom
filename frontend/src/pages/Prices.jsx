import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function Prices() {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const res = await API.get("/market");
        setMarkets(res.data); // e.g. [{symbol:"AAPL", price:...},...]
      } catch (err) {
        console.error(err);
      }
    };
    fetchMarkets();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Live Market Prices</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {markets.map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">{item.symbol}</h3>
            <p className="text-green-600 text-xl font-bold">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
