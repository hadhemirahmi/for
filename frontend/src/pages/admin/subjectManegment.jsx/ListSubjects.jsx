import React, { useEffect, useState } from "react";
import { FaBook, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";

import { toast } from "react-toastify";
import adminServices from "../../../services/adminServices";

function ListSubjects() {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  const loadSubjects = async () => {
    try {
      const res = await adminServices.getAllSubjects();
      setSubjects(res);
    } catch {
      toast.error("Failed to load subjects");
    }
  };

  useEffect(() => {
    (async () => {
      await loadSubjects();
    })();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subject?")) return;
    await adminServices.deleteSubject(id);
    toast.success("Subject deleted");
    loadSubjects();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h2 className="text-3xl font-bold text-indigo-600 flex items-center gap-3 mb-6">
        <FaBook /> Subjects
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((s) => (
          <div
            key={s._id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-2">{s.subject_name}</h3>
            <p className="text-gray-600 mb-4">
              {s.description || "No description"}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => navigate(`/update-subject/${s._id}`)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(s._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListSubjects;
