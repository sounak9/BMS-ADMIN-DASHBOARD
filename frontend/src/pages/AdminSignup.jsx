import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Register admin
      await axios.post(`${API_URL}/admin/register`, form, {
        headers: { "Content-Type": "application/json" },
      });

      // Auto login after successful registration
      const res = await axios.post(`${API_URL}/admin/login`, {
        username: form.username,
        password: form.password,
      });

      localStorage.setItem("admin_token", res.data.access_token);
      localStorage.setItem("admin_username", res.data.username);

      // Redirect to dashboard
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err.response?.data);
      setError(err.response?.data?.error || "Signup failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900 text-slate-100">
      <div className="w-full max-w-sm p-6 rounded-2xl bg-slate-800 shadow-lg border border-slate-700">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Admin Sign Up
        </h2>
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
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
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
            Sign Up
          </button>
        </form>

        {/* Back to login link */}
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/admin/login")}
            className="text-indigo-400 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
