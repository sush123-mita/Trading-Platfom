import React, { useState, useEffect } from "react";
import { Mail, Lock, User } from "lucide-react"; // spelling galat tha tumhare code me

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Signup | MyApp"; // `|` ka use galat tha
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validations
    if (!email.includes("@")) {
      setError("Please enter a valid Email ID");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || "Signup failed"); // tumhare backend me error msg field `msg` hai
      }

      alert("Signup Successful!");
      window.location.href = "/login";
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-500 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-5">
          Create your account!
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name input */}
          <div className="flex items-center border text-black rounded-xl p-3 bg-gray-50">
            <User className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent focus:outline-none"
              required
            />
          </div>

          {/* Email input */}
          <div className="flex items-center border  text-black rounded-xl p-3 bg-gray-50">
            <Mail className="text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent focus:outline-none"
              required
            />
          </div>

          {/* Password input */}
          <div className="flex items-center  text-black border rounded-xl p-3 bg-gray-50">
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

          {/* Confirm Password input */}
          <div className="flex items-center text-black  border rounded-xl p-3 bg-gray-50">
            <Lock className="text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full bg-transparent focus:outline-none"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-black font-semibold rounded-xl shadow-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-800">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-pink-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
