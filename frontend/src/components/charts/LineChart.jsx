import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function LineChart({ labels, data }) {
  return (
    <div className="w-full h-64">
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Users",
              data,
              borderColor: "#6366f1",
              backgroundColor: "rgba(99,102,241,0.3)",
              pointBackgroundColor: [
                "#f59e42",
                "#22c55e",
                "#6366f1",
                "#ef4444",
                "#eab308",
              ],
              pointBorderColor: "#fff",
              pointRadius: 6,
              pointHoverRadius: 8,
              fill: true,
              tension: 0.4,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: "#cbd5e1" } },
            tooltip: {
              backgroundColor: "#1e293b",
              titleColor: "#f59e42",
              bodyColor: "#fff",
              borderColor: "#6366f1",
              borderWidth: 2,
            },
          },
          scales: {
            x: {
              ticks: { color: "#9ca3af" },
              grid: { color: "#334155" },
            },
            y: {
              ticks: { color: "#9ca3af" },
              grid: { color: "#334155" },
            },
          },
        }}
      />
    </div>
  );
}
