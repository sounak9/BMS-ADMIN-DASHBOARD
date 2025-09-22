import DoughnutChart from "../charts/DoughnutChart";

export default function BatteryStatusCard({
  batteryData,
  batteryDetails,
  selectedBattery,
  setSelectedBattery,
}) {
  return (
    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col items-center shadow-2xl">
      <div className="flex items-center justify-between w-full mb-3">
        <h3 className="font-semibold text-slate-100">Battery Status</h3>
        <select
          value={selectedBattery}
          onChange={(e) => setSelectedBattery(e.target.value)}
          className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200 text-sm focus:outline-none"
          style={{ minWidth: 180 }}
        >
          <option value="">All Companies</option>
          {batteryDetails.map((batt) => (
            <option key={batt.battery_id} value={batt.battery_id}>
              Battery {batt.battery_id}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-center w-full">
        <div className="h-64 w-full flex items-center justify-center">
          <DoughnutChart
            normal={batteryData.normal}
            fault={batteryData.fault}
            showLegend={false}
          />
        </div>
        <div className="flex items-center space-x-4 text-sm mt-4">
          <span className="text-emerald-400">
            Normal: <span className="font-bold">{batteryData.normal}</span>
          </span>
          <span className="text-red-400">
            Fault: <span className="font-bold">{batteryData.fault}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
