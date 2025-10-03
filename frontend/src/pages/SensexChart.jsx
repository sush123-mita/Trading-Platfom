import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import API from "../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SensexChart({ symbol = "SENSEX" }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await API.get(`/price/${symbol}`);
        const prices = res.data; // assume {timestamps:[], values:[]}

        setChartData({
          labels: prices.timestamps,
          datasets: [
            {
              label: `${symbol} Price`,
              data: prices.values,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              tension: 0.3,
              fill: true,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching price data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [symbol]);

  if (loading) return <p className="text-center text-gray-500">Loading Chart...</p>;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">{symbol} Price Chart</h2>
      <Line data={chartData} />
    </div>
  );
}
