export default function Badge({ text, type = "default" }) {
  const styles = {
    default: "bg-slate-800 text-slate-300",
    success: "bg-emerald-900/40 text-emerald-300",
    warning: "bg-amber-800/40 text-amber-300",
    info: "bg-indigo-900/40 text-indigo-300",
  };
  return (
    <span className={`px-2 py-1 rounded-lg text-xs ${styles[type]}`}>
      {text}
    </span>
  );
}
