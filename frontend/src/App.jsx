import { useLocation } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const location = useLocation();
  const hideLayout =
    location.pathname.startsWith("/admin/login") ||
    location.pathname.startsWith("/admin/signup");

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      {!hideLayout && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {!hideLayout && <Topbar />}
        <main className="flex-1 p-4 lg:p-6 w-full">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}
