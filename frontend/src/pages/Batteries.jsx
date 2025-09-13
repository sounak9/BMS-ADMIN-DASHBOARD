import { useEffect, useState } from "react";
import Table from "../components/ui/Table";

export default function Batteries() {
  const [batteries, setBatteries] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/batteries")
      .then((res) => res.json())
      .then(setBatteries)
      .catch((err) => console.error("Failed to load batteries:", err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Batteries (Live Data)</h2>
      <Table
        headers={[
          "Battery ID",
          "Voltage (V)",
          "Current (A)",
          "Temperature (°C)",
          "Timestamp",
        ]}
        rows={batteries.map((b) => [
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
