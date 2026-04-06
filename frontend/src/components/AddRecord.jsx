import { useEffect, useState } from "react";
import { createRecord, updateRecord } from "../services/api";
import { getCategoriesForType } from "../constants/recordCategories";

function AddRecord({ refresh, editData, onClose }) {

  const initialForm = {
    amount: "",
    type: "EXPENSE",
    category: "SALARIES",
    note: "",
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editData) {
      setForm({
        amount: editData.amount || "",
        type: editData.type || "EXPENSE",
        category: editData.category || "SALARIES",
        note: editData.note || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [editData]);

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    const categories = getCategoriesForType(newType);
    setForm({
      ...form,
      type: newType,
      category: categories[0]?.value || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMITTING FORM:", form);
    try {
      if (editData) {
        await updateRecord(editData.id, form);
      } else {
        await createRecord(form);
      }
      refresh();
      onClose();
      setForm(initialForm);
    } catch (err) {
      console.error("Error saving record:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="font-bold mb-3">
        {editData ? "Edit Record" : "Add Record"}
      </h2>

      <input
        type="number"
        placeholder="Amount"
        className="border p-2 mr-2"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <select
        className="border p-2 mr-2"
        value={form.type}
        onChange={handleTypeChange}
      >
        <option value="INCOME">Income</option>
        <option value="EXPENSE">Expense</option>
      </select>

      <select
        className="border p-2 mr-2"
        value={form.category || ""}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option value="">Select Category</option>
        {getCategoriesForType(form.type).map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      <input
        placeholder="Note"
        className="border p-2 mr-2"
        value={form.note}
        onChange={(e) => setForm({ ...form, note: e.target.value })}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        {editData ? "Update Record" : "Add Record"}
      </button>
    </form>
  );
}

export default AddRecord;