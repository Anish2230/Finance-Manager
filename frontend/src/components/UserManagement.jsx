import { useEffect, useState } from "react";
import API from "../services/api";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateUser = async (id, patch) => {
    try {
      await API.patch(`/users/${id}`, patch);
      await loadUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update user");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">User Management</h2>
      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left border-b">Name</th>
              <th className="p-2 text-left border-b">Email</th>
              <th className="p-2 text-left border-b">Role</th>
              <th className="p-2 text-left border-b">Active</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="p-2 border-b">{u.name}</td>
                <td className="p-2 border-b">{u.email}</td>
                <td className="p-2 border-b">
                  <select
                    className="border p-1 rounded"
                    value={u.role}
                    onChange={(e) => updateUser(u.id, { role: e.target.value })}
                  >
                    <option value="VIEWER">Viewer</option>
                    <option value="ANALYST">Analyst</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </td>
                <td className="p-2 border-b">
                  <input
                    type="checkbox"
                    checked={u.isActive}
                    onChange={(e) =>
                      updateUser(u.id, { isActive: e.target.checked })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserManagement;

