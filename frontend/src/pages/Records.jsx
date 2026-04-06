import { useState } from "react";
import RecordList from "../components/RecordList";
import RecordModal from "../components/RecordModal";

function Records() {
  const [refresh, setRefresh] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal (for both add & edit)
  const openModal = (record = null) => {
    setEditData(record);   // null → add mode
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  // After success (add/edit)
  const handleSuccess = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="p-6">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Records</h1>

        {/* ✅ ADD BUTTON */}
        <button
          onClick={() => openModal()} // no record → add mode
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          + Add Record
        </button>
      </div>

      {/* ✅ RECORD LIST */}
      <RecordList
        setEditData={setEditData}
        openModal={openModal}
        refresh={refresh}
        canManage={true}
      />

      {/* ✅ MODAL */}
      <RecordModal
        isOpen={isModalOpen}
        onClose={closeModal}
        refresh={handleSuccess}
        editData={editData}
      />

    </div>
  );
}

export default Records;