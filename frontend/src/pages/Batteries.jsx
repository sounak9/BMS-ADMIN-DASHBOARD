import { useEffect, useState } from "react";
import Table from "../components/ui/Table";

export default function Batteries() {
  const [latest, setLatest] = useState([]);
  const [all, setAll] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/batteries")
      .then((res) => res.json())
      .then((data) => {
        setLatest(data.latest || []);
        setAll(data.all || []);
      })
      .catch((err) => console.error("Failed to load batteries:", err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Latest Batteries</h2>
      <Table
        headers={[
          "Battery ID",
          "Voltage (V)",
          "Current (A)",
          "Temperature (°C)",
          "Timestamp",
        ]}
        rows={latest.map((b) => [
          b.battery_id,
          b.voltage,
          b.current,
          b.temperature,
          b.timestamp,
        ])}
      />

      <h2 className="text-xl font-semibold mt-8 mb-4">All Battery Records</h2>
      <Table
        headers={[
          "Battery ID",
          "Voltage (V)",
          "Current (A)",
          "Temperature (°C)",
          "Timestamp",
        ]}
        rows={all.map((b) => [
          b.battery_id,
          b.voltage,
          b.current,
          b.temperature,
          b.timestamp,
        ])}
      />
    </div>
  );
}
