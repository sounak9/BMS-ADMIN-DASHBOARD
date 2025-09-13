import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminSignup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    company_id: "",
    phone: "",
    security_qn: "",
    security_ans: "",
    role: "user",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      // ✅ After successful signup, go to login
      navigate("/admin/login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-3 p-3 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-3 p-3 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-3 p-3 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="text"
          name="company_id"
          placeholder="Company ID (leave empty for default)"
          value={formData.company_id}
          onChange={handleChange}
          className="w-full mb-3 p-3 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full mb-3 p-3 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          name="security_qn"
          value={formData.security_qn}
          onChange={handleChange}
          className="w-full mb-3 p-3 rounded bg-gray-700 border border-gray-600 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">-- Select Security Question --</option>
          <option value="What is your pet’s name?">
            What is your pet’s name?
          </option>
          <option value="What is your mother’s maiden name?">
            What is your mother’s maiden name?
          </option>
          <option value="What was your first school?">
            What was your first school?
          </option>
        </select>

        <input
          type="text"
          name="security_ans"
          placeholder="Your Answer"
          value={formData.security_ans}
          onChange={handleChange}
          className="w-full mb-3 p-3 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded bg-gray-700 border border-gray-600 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-500 transition-colors"
        >
          Register
        </button>

        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <span
            className="text-indigo-400 cursor-pointer hover:underline"
            onClick={() => navigate("/admin/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
