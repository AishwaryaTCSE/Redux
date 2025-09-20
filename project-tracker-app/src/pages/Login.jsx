import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="glass p-10 w-96">
        <h1 className="text-2xl font-bold mb-6 text-white text-center">Login</h1>
        {error && <p className="text-red-400 mb-2">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded bg-white/20 text-white placeholder-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded bg-white/20 text-white placeholder-white"
          />
          <button
            type="submit"
            className="bg-white text-purple-700 px-4 py-2 rounded hover:bg-white/90"
          >
            Login
          </button>
        </form>
        <p className="text-white text-sm mt-4 text-center">
          Don't have an account? <span className="underline cursor-pointer" onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}
