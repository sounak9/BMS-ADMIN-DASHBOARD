import LineChart from "../charts/LineChart";

export default function UserGrowthCard({
  userHistory,
  timeOptions,
  dateFilter,
  setDateFilter,
}) {
  return (
    <div className="lg:col-span-2 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col shadow-2xl">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-slate-100">User Growth</h3>
        <div className="text-sm text-slate-400 flex gap-2">
          {timeOptions.slice(1, 4).map((opt) => (
            <button
              key={opt.value}
              className={`px-2 py-1 rounded-full ${
                dateFilter === opt.value
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-slate-700"
              }`}
              onClick={() => setDateFilter(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64 w-full flex items-center justify-center">
        <LineChart
          labels={userHistory.labels || []}
          data={userHistory.data || []}
        />
      </div>
    </div>
  );
}
