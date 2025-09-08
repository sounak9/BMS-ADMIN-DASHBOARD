export default function Button({ children, onClick, variant = "primary" }) {
  const base =
    "px-4 py-2 rounded-2xl shadow-soft transition font-medium text-sm";
  const styles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500",
    secondary: "bg-slate-800 text-slate-300 hover:bg-slate-700",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}
