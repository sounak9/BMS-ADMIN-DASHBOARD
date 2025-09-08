export default function Topbar() {
  return (
    <header className="sticky top-0 z-20 bg-slate-900/90 border-b border-slate-800">
      <div className="px-4 py-3 flex items-center gap-3">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="ml-auto flex gap-3 items-center">
          <input
            placeholder="Search..."
            className="px-3 py-2 rounded-2xl bg-slate-800 text-slate-200 focus:outline-none"
          />
          <button className="p-2 rounded-2xl hover:bg-slate-800">🔔</button>
          <div className="w-9 h-9 rounded-full bg-slate-700"></div>
        </div>
      </div>
    </header>
  );
}
