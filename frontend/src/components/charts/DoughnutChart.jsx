import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({
  normal = 0,
  fault = 0,
  showLegend = false,
}) {
  const data = {
    labels: ["Normal Bat Data", "Fault Batt Data"],
    datasets: [
      {
        data: [normal, fault],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 3,
        hoverBackgroundColor: ["#4ade80", "#f87171"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend, // only show if explicitly enabled
        labels: {
          color: "#cbd5e1",
          font: { size: 14 },
        },
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#22c55e",
        bodyColor: "#fff",
        borderColor: "#ef4444",
        borderWidth: 2,
      },
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-sm h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
