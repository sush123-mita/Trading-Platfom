import React, { useState, useEffect } from "react";
import {Mail , Lock} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login(){
    const [email,setEmail]=useState("");
    const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Login | MyApp"; // Page title
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Invalid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });

      console.log("Login response:", res.data);
      const data = await res.json();

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }

         console.log("Token saved, navigating to dashboard");
        navigate("/dashboard", { replace: true });
      } else {
        setError("No token received from server");
      }

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      // redirect user here e.g. window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Welcome Back 👋
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex items-center border rounded-xl p-3 text-black bg-gray-50">
            <Mail className="text-black mr-2" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded-xl p-3 text-black bg-gray-50">
            <Lock className="text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent focus:outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

