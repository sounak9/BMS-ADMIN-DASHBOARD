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
import PrivateLayout from "../components/layout/PrivateLayout";

// Protect routes
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("admin_token");
  return token ? children : <Navigate to="/admin/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes (no layout) */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminSignup />} />

      {/* Protected routes (with PrivateLayout) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <Dashboard />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/companies"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <Companies />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <Users />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/batteries"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <Batteries />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/faults"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <Faults />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <Reports />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <Settings />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}
