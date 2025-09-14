import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Companies from "../pages/Companies";
import Users from "../pages/Users";
import Batteries from "../pages/Batteries";
import Faults from "../pages/Faults";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import AdminLogin from "../pages/AdminLogin";
import AdminSignup from "../pages/AdminSignup";

// Protect routes
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("admin_token");
  return token ? children : <Navigate to="/admin/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminSignup />} />

      {/* Protected routes (no layouts) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/companies"
        element={
          <ProtectedRoute>
            <Companies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/batteries"
        element={
          <ProtectedRoute>
            <Batteries />
          </ProtectedRoute>
        }
      />
      <Route
        path="/faults"
        element={
          <ProtectedRoute>
            <Faults />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}
