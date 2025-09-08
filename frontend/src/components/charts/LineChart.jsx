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
    <Line
      data={{
        labels,
        datasets: [
          {
            label: "Users",
            data,
            borderColor: "#6366f1",
            backgroundColor: "rgba(99,102,241,0.3)",
            fill: true,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: { legend: { labels: { color: "#cbd5e1" } } },
        scales: {
          x: { ticks: { color: "#9ca3af" } },
          y: { ticks: { color: "#9ca3af" } },
        },
      }}
    />
  );
}
