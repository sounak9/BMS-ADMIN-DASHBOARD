import { useEffect, useState } from "react";
import Table from "../components/ui/Table";

export default function Faults() {
  const [faults, setFaults] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/faults")
      .then((res) => res.json())
      .then(setFaults)
      .catch((err) => console.error("Failed to load faults:", err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Fault Logs</h2>
      <Table
        headers={["ID", "Battery", "Type", "Severity", "Detected At", "Note"]}
        rows={faults.map((f) => [
          f.id,
          f.batt_uid,
          f.type,
          f.severity,
          f.detected_at,
          f.note,
        ])}
      />
    </div>
  );
}
