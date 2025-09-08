export default function Card({ title, value, hint }) {
  return (
    <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-soft">
      <div className="text-slate-400 text-sm">{title}</div>
      <div className="text-3xl font-bold mt-1 text-white">{value}</div>
      {hint && <div className="text-xs text-slate-500 mt-1">{hint}</div>}
    </div>
  );
}
