import React from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import { useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Trade from "./pages/Trade";
import History from "./pages/History";
import Prices from "./pages/Prices";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Navigate } from "react-router-dom";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

       {/* <Route path="/" element={<Navigate to="/dashboard" replace />} />*/}

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="trade" element={<Trade />} />
          <Route path="history" element={<History />} />
          <Route path="prices" element={<Prices />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
