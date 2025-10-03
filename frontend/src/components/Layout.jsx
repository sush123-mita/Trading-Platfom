// src/components/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar on top */}
        <Navbar onLogout={handleLogout} />

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet /> {/* Here your Dashboard, Prices, Trade etc will render */}
        </main>
      </div>
    </div>
  );
}
