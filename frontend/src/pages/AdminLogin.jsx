import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${API_URL}/admin/login`, form, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("admin_token", res.data.access_token);
      localStorage.setItem("admin_username", res.data.username);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900 text-slate-100">
      <div className="w-full max-w-sm p-6 rounded-2xl bg-slate-800 shadow-lg border border-slate-700">
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
          >
            Login
          </button>
        </form>

        {/* Sign up link */}
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/admin/register")}
            className="text-indigo-400 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
