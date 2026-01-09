import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaUserTie,
  FaBook,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import adminServices from "../../../services/adminServices";

function SessionList() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  /* ---------------- FETCH SESSIONS ---------------- */
  const loadSessions = async () => {
    try {
      const res = await adminServices.get_all_sessions();
      setSessions(res);
    } catch (err) {
      toast.error("Failed to load sessions", err);
    }
  };

  useEffect(() => {
    (async () => {
      await loadSessions();
    })();
  }, []);

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this session?"))
      return;

    try {
      await adminServices.delete_session(id);
      toast.success("Session deleted");
      loadSessions();
    } catch (err) {
      toast.error("Delete failed", err);
    }
  };

  /* ---------------- HELPERS ---------------- */
  const typeColor = (type) => {
    switch (type) {
      case "course":
        return "bg-blue-100 text-blue-700";
      case "TP":
        return "bg-green-100 text-green-700";
      case "TD":
        return "bg-yellow-100 text-yellow-700";
      case "Exam":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-indigo-100 text-indigo-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "done":
        return "bg-green-100 text-green-700";
      case "postponed":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-indigo-600">
          📅 Sessions Schedule
        </h2>
      </div>

      {/* List */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.length > 0 &&
          sessions.map((s) => (
            <div
              key={s._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 relative"
            >
              {/* Top badges */}
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${typeColor(
                    s.type
                  )}`}
                >
                  {s.type}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                    s.status
                  )}`}
                >
                  {s.status}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-3 text-gray-700 mb-2">
                <FaCalendarAlt className="text-indigo-500" />
                <span>{new Date(s.date).toLocaleDateString("en-GB")}</span>
              </div>

              {/* Time */}
              <div className="flex items-center gap-3 text-gray-700 mb-2">
                <FaClock className="text-indigo-500" />
                <span>
                  {s.start_time} – {s.end_time}
                </span>
              </div>

              {/* Group */}
              <div className="flex items-center gap-3 text-gray-700 mb-2">
                <FaUsers className="text-indigo-500" />
                <span>{s.group?.name || "N/A"}</span>
              </div>

              {/* Teacher */}
              <div className="flex items-center gap-3 text-gray-700 mb-2">
                <FaUserTie className="text-indigo-500" />
                <span>{s.teacher_id?.username || s.teacher_id?.email}</span>
              </div>

              {/* Subject */}
              <div className="flex items-center gap-3 text-gray-700 mb-4">
                <FaBook className="text-indigo-500" />
                <span>{s.subject?.subject_name}</span>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  onClick={() => navigate(`/sessions/update/${s._id}`)}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                >
                  <FaEdit /> Update
                </button>

                <button
                  onClick={() => handleDelete(s._id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Empty state */}
      {sessions.length === 0 && (
        <div className="text-center text-gray-500 mt-20 text-lg">
          No sessions found 📭
        </div>
      )}
    </div>
  );
}

export default SessionList;
