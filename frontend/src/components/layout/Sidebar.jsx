import { NavLink, useNavigate } from "react-router-dom";

const routes = [
  { path: "/", label: "Dashboard" },
  { path: "/companies", label: "Companies" },
  { path: "/users", label: "Users" },
  { path: "/batteries", label: "Batteries" },
  { path: "/faults", label: "Fault Logs" },
  { path: "/reports", label: "Reports" },
  { path: "/settings", label: "Settings" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_username");
    navigate("/admin/login");
  };

  return (
    <aside className="hidden md:flex flex-col justify-between w-72 bg-slate-950/60 border-r border-slate-800 p-4">
      {/* Top: Logo + Nav */}
      <div>
        <div className="font-bold text-lg mb-6">BMS ADMIN</div>
        <nav className="space-y-2">
          {routes.map((r) => (
            <NavLink
              key={r.path}
              to={r.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-xl hover:bg-slate-800 ${
                  isActive ? "bg-slate-800 text-indigo-400" : ""
                }`
              }
            >
              {r.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom: Logout */}
      <div className="pt-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 rounded-xl bg-red-600 text-white hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
