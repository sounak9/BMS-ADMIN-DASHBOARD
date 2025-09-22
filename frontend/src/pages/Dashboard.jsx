import { useEffect, useState } from "react";

import BatteryStatusCard from "../components/charts/BatteryStatusCard";
import UserGrowthCard from "../components/charts/UserGrowthCard";

export default function Dashboard() {
  const [stats, setStats] = useState({
    companies: 0,
    users: 0,
    batteries: 0,
    faults: 0,
  });
  const [userHistory, setUserHistory] = useState({ labels: [], data: [] });
  const [batteryData, setBatteryData] = useState({ normal: 0, fault: 0 });
  const [batteryDetails, setBatteryDetails] = useState([]);
  const [selectedBattery, setSelectedBattery] = useState("");
  const [dateFilter, setDateFilter] = useState("30");

  // Fetch dashboard stats
  useEffect(() => {
    fetch("http://127.0.0.1:5000/dashboard/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch((err) => console.error("Failed to load stats:", err));
  }, []);

  // Fetch user history (line chart)
  useEffect(() => {
    fetch("http://127.0.0.1:5000/users")
      .then((res) => res.json())
      .then((data) => {
        const counts = {};
        data.users.forEach((u) => {
          const date = u.created_at ? u.created_at.slice(0, 10) : "Unknown";
          counts[date] = (counts[date] || 0) + 1;
        });

        const sortedDates = Object.keys(counts).sort();
        const today = new Date();
        const filteredDates = sortedDates.filter((d) => {
          const dt = new Date(d);
          return (
            !isNaN(dt) &&
            (today - dt) / (1000 * 60 * 60 * 24) <= parseInt(dateFilter)
          );
        });

        setUserHistory({
          labels: filteredDates,
          data: filteredDates.map((d) => counts[d]),
        });
      })
      .catch((err) => console.error("Failed to load user history:", err));
  }, [dateFilter]);

  // Fetch batteries and faults
  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:5000/batteries").then((res) => res.json()),
      fetch("http://127.0.0.1:5000/faults").then((res) => res.json()),
    ])
      .then(([battRes, faultRes]) => {
        const batteryMap = {};
        battRes.all.forEach((rec) => {
          const id = rec.battery_id;
          if (!batteryMap[id]) batteryMap[id] = { normal: 0, fault: 0 };

          const isFault = faultRes.some(
            (f) =>
              f.batt_uid === id &&
              new Date(f.detected_at).getTime() ===
                new Date(rec.timestamp).getTime()
          );

          if (isFault) {
            batteryMap[id].fault += 1;
          } else {
            batteryMap[id].normal += 1;
          }
        });

        const detailsArr = Object.entries(batteryMap).map(([id, counts]) => ({
          battery_id: id,
          ...counts,
        }));
        setBatteryDetails(detailsArr);

        if (!selectedBattery && detailsArr.length > 0) {
          setSelectedBattery(detailsArr[0].battery_id);
        }
      })
      .catch((err) => console.error("Failed to load battery/fault data:", err));
  }, []);

  // Update doughnut chart when selection changes
  useEffect(() => {
    if (batteryDetails.length > 0 && selectedBattery) {
      const selected = batteryDetails.find(
        (b) => b.battery_id === selectedBattery
      );
      if (selected) {
        setBatteryData({ normal: selected.normal, fault: selected.fault });
      }
    }
  }, [selectedBattery, batteryDetails]);

  // Time filter options
  const timeOptions = [
    { value: "7", label: "7 days" },
    { value: "30", label: "30 days" },
    { value: "90", label: "90 days" },
    { value: "365", label: "1 year" },
    { value: "9999", label: "All" },
  ];

  return (
    <div className="flex flex-col h-full w-full space-y-6 bg-[#16244c] px-8 py-6">
      {/* Stat Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-[#1b2a4b] rounded-2xl shadow p-6 flex flex-col items-center justify-center border border-[#22305a]">
          <div className="text-slate-400 text-sm mb-1">Companies</div>
          <div className="text-4xl font-bold text-white mb-1">
            {stats.companies}
          </div>
          <div className="text-slate-500 text-xs">Registered clients</div>
        </div>
        <div className="bg-[#1b2a4b] rounded-2xl shadow p-6 flex flex-col items-center justify-center border border-[#22305a]">
          <div className="text-slate-400 text-sm mb-1">Users</div>
          <div className="text-4xl font-bold text-white mb-1">
            {stats.users}
          </div>
          <div className="text-slate-500 text-xs">Admins & Ops</div>
        </div>
        <div className="bg-[#1b2a4b] rounded-2xl shadow p-6 flex flex-col items-center justify-center border border-[#22305a]">
          <div className="text-slate-400 text-sm mb-1">Batteries</div>
          <div className="text-4xl font-bold text-white mb-1">
            {stats.batteries}
          </div>
          <div className="text-slate-500 text-xs">Inventory</div>
        </div>
        <div className="bg-[#1b2a4b] rounded-2xl shadow p-6 flex flex-col items-center justify-center border border-[#22305a]">
          <div className="text-slate-400 text-sm mb-1">Active Faults</div>
          <div className="text-4xl font-bold text-white mb-1">
            {stats.faults}
          </div>
          <div className="text-slate-500 text-xs">Requires attention</div>
        </div>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <BatteryStatusCard
          batteryData={batteryData}
          batteryDetails={batteryDetails}
          selectedBattery={selectedBattery}
          setSelectedBattery={setSelectedBattery}
        />
        <UserGrowthCard
          userHistory={userHistory}
          timeOptions={timeOptions}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
      </section>

      {/* Fault logs */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-slate-100">Latest Fault Logs</h3>
          <button className="px-3 py-2 rounded-xl bg-indigo-600 text-white">
            View All
          </button>
        </div>
        <div className="bg-[#1b2a4b] rounded-2xl shadow p-6 border border-[#22305a]">
          <div className="text-slate-400">No fault logs to display.</div>
        </div>
      </section>
    </div>
  );
}
