import Card from "../components/ui/Card";
import LineChart from "../components/charts/LineChart";
import Table from "../components/ui/Table";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const growthLabels = ["Jan", "Feb", "Mar", "Apr"];
  const growthData = [5, 10, 15, 20];

  const interactionLabels = ["Alpha Power", "Beta Energy", "Super Admins"];
  const interactionData = [3, 5, 2];

  const faultLogs = [
    {
      id: 1,
      battery: "#1",
      type: "Overheat",
      severity: "High",
      detected: "2025-09-01 14:22",
      status: "Open",
    },
    {
      id: 2,
      battery: "#3",
      type: "Low Voltage",
      severity: "Medium",
      detected: "2025-09-02 09:15",
      status: "In-Progress",
    },
  ];

  return (
    <div className="flex flex-col h-full w-full space-y-4">
      {/* Stat Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Companies" value="2" hint="Registered clients" />
        <Card title="Users" value="5" hint="Admins & Ops" />
        <Card title="Batteries" value="12" hint="Inventory" />
        <Card title="Active Faults" value="2" hint="Requires attention" />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start w-full">
        <div className="lg:col-span-2 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h3 className="font-semibold mb-3">User Growth</h3>
          <div className="h-64">
            <LineChart labels={growthLabels} data={growthData} />
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h3 className="font-semibold mb-3">User Interaction</h3>
          <div className="h-64">
            <Doughnut
              data={{
                labels: interactionLabels,
                datasets: [
                  {
                    data: interactionData,
                    backgroundColor: ["#6366f1", "#10b981", "#f59e0b"],
                  },
                ],
              }}
              options={{
                plugins: { legend: { labels: { color: "#cbd5e1" } } },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </section>

      {/* Fault Logs Table */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-slate-100">Latest Fault Logs</h3>
          <a
            href="/faults"
            className="px-3 py-2 rounded-xl bg-indigo-600 text-white"
          >
            View All
          </a>
        </div>
        <Table
          headers={["ID", "Battery", "Type", "Severity", "Detected", "Status"]}
          rows={faultLogs.map((f) => [
            f.id,
            f.battery,
            f.type,
            f.severity,
            f.detected,
            f.status,
          ])}
        />
      </section>
    </div>
  );
}
