import { useEffect, useState } from "react";
import API from "../services/api";
import { getCategoriesForType } from "../constants/recordCategories";

function RecordModal({ isOpen, onClose, refresh, editData }) {

  const getDefaultCategory = (type) => {
    const cats = getCategoriesForType(type);
    return cats[0]?.value || "";
  };

  const [form, setForm] = useState({
    amount: "",
    type: "INCOME",
    category: getDefaultCategory("INCOME"),
    note: "",
  });

  useEffect(() => {
    if (editData) {
      setForm({
        amount: editData.amount || "",
        type: editData.type || "INCOME",
        category: editData.category || getDefaultCategory(editData.type || "INCOME"),
        note: editData.note || "",
      });
    } else {
      setForm({
        amount: "",
        type: "INCOME",
        category: getDefaultCategory("INCOME"),
        note: "",
      });
    }
  }, [editData, isOpen]);

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setForm({
      ...form,
      type: newType,
      category: getDefaultCategory(newType),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMITTING:", form);

    try {
      if (editData) {
        await API.patch(`/records/${editData.id}`, {
          ...form,
          amount: Number(form.amount),
        });
        alert("Updated ✅");
      } else {
        await API.post("/records", {
          ...form,
          amount: Number(form.amount),
        });
        alert("Added ✅");
      }

      refresh();
      onClose();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to save record";
      console.log("SAVE RECORD ERROR:", err.response?.data || err);
      alert(message);
    }
  };

  if (!isOpen) return null;

  const categories = getCategoriesForType(form.type);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-lg font-bold mb-4">
          {editData ? "Edit Record" : "Add Record"}
        </h2>

        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 border mb-2"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <select
          className="w-full p-2 border mb-2"
          value={form.type}
          onChange={handleTypeChange}
        >
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>

        <select
          className="w-full p-2 border mb-2"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        <input
          placeholder="Note"
          className="w-full p-2 border mb-4"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        />

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editData ? "Update" : "Add"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default RecordModal;