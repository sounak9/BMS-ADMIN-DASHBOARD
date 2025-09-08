import { useEffect, useState } from "react";
import userApi from "../api/userApi";
import Table from "../components/ui/Table";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userApi
      .getAll()
      .then((res) => {
        // if backend sends {users: [...]}
        if (res.users) setUsers(res.users);
        // if backend sends just [...]
        else if (Array.isArray(res)) setUsers(res);
      })
      .catch((err) => console.error("Failed to load users:", err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <Table
        headers={["ID", "Username", "Email", "Role"]}
        rows={users.map((u) => [u.u_id || u.id, u.username, u.email, u.role])}
      />
    </div>
  );
}
