import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function PrivateLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
