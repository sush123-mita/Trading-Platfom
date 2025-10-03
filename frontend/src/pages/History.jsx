import React, { useEffect, useState } from "react";
import API from "../services/api";


export default function History() {
    const [history, setHistory] = useState([]);
  
    useEffect(() => {
      const fetchHistory = async () => {
        try {
          const res = await API.get("/trade/history");
          setHistory(res.data); // e.g. [{symbol, type, amount, date},...]
        } catch (err) {
          console.error(err);
        }
      };
      fetchHistory();
    }, []);


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold mb-6">Trade History</h1>
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3">Symbol</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((t, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-3">{t.symbol}</td>
                    <td className={`p-3 font-bold ${t.type === "BUY" ? "text-green-600" : "text-red-600"}`}>{t.type}</td>
                    <td className="p-3">{t.amount}</td>
                    <td className="p-3">{new Date(t.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    