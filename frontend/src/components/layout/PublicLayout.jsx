export default function PublicLayout({ children }) {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-slate-900 text-slate-100">
      {children}
    </div>
  );
}
