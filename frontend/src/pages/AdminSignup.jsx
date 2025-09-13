import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    company_id: "",
    phone: "",
    security_qn: "",
    security_ans: "",
    role: "user", // default role
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("admin_token", data.token); // ✅ fixed
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("admin_user", JSON.stringify(data));
        navigate("/"); // redirect to dashboard
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1A2B5B]">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold text-center mb-4 text-black">
          Register
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          />
          <input
            type="text"
            name="company_id"
            placeholder="Company ID (leave empty for default)"
            value={form.company_id}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          />
          <input
            type="text"
            name="phone" // ✅ fixed
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          />

          {/* Security Question Dropdown */}
          <select
            name="security_qn"
            value={form.security_qn}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          >
            <option value="">-- Select Security Question --</option>
            <option value="pet_name">
              What was the name of your first pet?
            </option>
            <option value="first_school">
              What was the name of your first school?
            </option>
            <option value="birth_city">In what city were you born?</option>
            <option value="childhood_nickname">
              What was your childhood nickname?
            </option>
            <option value="favorite_teacher">
              What is the name of your favorite teacher?
            </option>
          </select>

          <input
            type="text"
            name="security_ans"
            placeholder="Your Answer"
            value={form.security_ans}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-2 text-black">
          Already have an account?{" "}
          <Link to="/admin/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
