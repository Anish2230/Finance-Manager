import { useCallback, useEffect, useState } from "react";
import API from "../services/api";
import {
  getAllCategories,
  getCategoryLabel,
} from "../constants/recordCategories";

function RecordList({ setEditData, openModal, refresh, canManage = false }) {
  const [records, setRecords] = useState([]);

  const [filters, setFilters] = useState({
    type: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  // 🔹 Fetch records (NO backend filtering)
  const fetchRecords = useCallback(async () => {
    try {
      const res = await API.get("/records");
      setRecords(res.data || []);
    } catch (err) {
      console.log("ERROR:", err?.response?.data || err.message);
    }
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [refresh, fetchRecords]);

  // 🔹 Delete
  const handleDelete = async (id) => {
    try {
      await API.delete(`/records/${id}`);
      alert("Deleted ✅");

      setRecords((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.log(err?.response?.data);
      alert("Delete failed");
    }
  };

  // 🔹 Frontend Filtering
  const filteredRecords = records.filter((r) => {
    return (
      (filters.type ? r.type === filters.type : true) &&
      (filters.category ? r.category === filters.category : true) &&
      (filters.startDate
        ? new Date(r.date) >= new Date(filters.startDate)
        : true) &&
      (filters.endDate
        ? new Date(r.date) <= new Date(filters.endDate)
        : true)
    );
  });

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-3">All Records</h2>

      {/* 🔹 FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
        
        {/* TYPE */}
        <select
          className="border p-2 rounded"
          value={filters.type}
          onChange={(e) =>
            setFilters({ ...filters, type: e.target.value })
          }
        >
          <option value="">All Types</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>

        {/* CATEGORY */}
        <select
          className="border p-2 rounded"
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">All Categories</option>
          {getAllCategories().map((cat) => (
            <option key={`${cat.value}-filter`} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* START DATE */}
        <input
          type="date"
          className="border p-2 rounded"
          value={filters.startDate}
          onChange={(e) =>
            setFilters({ ...filters, startDate: e.target.value })
          }
        />

        {/* END DATE */}
        <input
          type="date"
          className="border p-2 rounded"
          value={filters.endDate}
          onChange={(e) =>
            setFilters({ ...filters, endDate: e.target.value })
          }
        />
      </div>

      {/* 🔹 TABLE */}
      {filteredRecords.length === 0 ? (
        <p>No records found</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left border-b">Amount</th>
              <th className="p-3 text-left border-b">Type</th>
              <th className="p-3 text-left border-b">Category</th>
              <th className="p-3 text-left border-b">Note</th>
              <th className="p-3 text-left border-b">Date</th>
              {canManage && (
                <th className="p-3 text-left border-b">Action</th>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredRecords.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="p-3 border-b">₹ {r.amount}</td>
                <td className="p-3 border-b">{r.type}</td>
                <td className="p-3 border-b">
                  {getCategoryLabel(r.category)}
                </td>
                <td className="p-3 border-b">{r.note}</td>
                <td className="p-3 border-b">
                  {new Date(r.date).toLocaleDateString()}
                </td>

                {canManage && (
                  <td className="p-3 border-b flex gap-2">
                    <button
                      onClick={() => openModal(r)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(r.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecordList;