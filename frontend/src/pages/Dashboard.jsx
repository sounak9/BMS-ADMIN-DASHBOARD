import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import LineChart from "../components/charts/LineChart";
import Table from "../components/ui/Table";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [stats, setStats] = useState({
    companies: 0,
    users: 0,
    batteries: 0,
    faults: 0,
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5000/dashboard/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch((err) => console.error("Failed to load stats:", err));
  }, []);

  return (
    <div className="flex flex-col h-full w-full space-y-4">
      {/* Stat Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Companies"
          value={stats.companies}
          hint="Registered clients"
        />
        <Card title="Users" value={stats.users} hint="Admins & Ops" />
        <Card title="Batteries" value={stats.batteries} hint="Inventory" />
        <Card
          title="Active Faults"
          value={stats.faults}
          hint="Requires attention"
        />
      </section>
    </div>
  );
}
