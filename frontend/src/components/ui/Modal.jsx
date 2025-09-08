export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800">
        <div className="p-4 border-b border-slate-800 flex justify-between">
          <h2 className="font-semibold">{title}</h2>
          <button
            className="p-2 rounded-xl hover:bg-slate-800 text-slate-300"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
