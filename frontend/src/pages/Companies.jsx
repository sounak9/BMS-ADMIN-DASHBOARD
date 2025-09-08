import { useEffect, useState } from "react";
import companyApi from "../api/companyApi";
import Table from "../components/ui/Table";

export default function Companies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    companyApi
      .getAll()
      .then((res) => {
        // if backend sends {companies: [...]}
        if (res.companies) setCompanies(res.companies);
        // if backend sends just [...]
        else if (Array.isArray(res)) setCompanies(res);
      })
      .catch((err) => console.error("Failed to load companies:", err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Companies</h2>
      <Table
        headers={["ID", "Name"]}
        rows={companies.map((c) => [c.c_id || c.id, c.name])}
      />
    </div>
  );
}
