import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/ui/Table";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/users") // direct API call
      .then((res) => {
        console.log("Users API response:", res.data);
        setUsers(res.data.users || []);
        setTotal(res.data.total || 0);
      })
      .catch((err) => console.error("Failed to load users:", err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Users (Total: {total})</h2>
      <Table
        headers={[
          "ID",
          "Username",
          "Email",
          "Phone",
          "Role",
          "Company",
          "Created At",
          "Last Login",
        ]}
        rows={users.map((u) => [
          u.u_id,
          u.username,
          u.email,
          u.phone || "-",
          u.role || "-",
          u.company_id || "-",
          u.created_at ? new Date(u.created_at).toLocaleString() : "-",
          u.last_login ? new Date(u.last_login).toLocaleString() : "-",
        ])}
      />
    </div>
  );
}
