import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaUserTie,
  FaBook,
  FaEdit,
  FaClipboardList,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

import adminServices from "../../../services/adminServices";

function UpdateSession() {
  const navigate = useNavigate();
  const { id } = useParams(); // session id

  const [formData, setFormData] = useState({
    date: "",
    start_time: "",
    end_time: "",
    type: "",
    group: "",
    teacher_id: "",
    subject: "",
  });

  const [groups, setGroups] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groupsRes, teachersRes, subjectsRes, { data: sessionRes }] =
          await Promise.all([
            adminServices.get_all_groups(),
            adminServices.get_users(),
            adminServices.getAllSubjects(),
            adminServices.get_session_by_id(id),
          ]);

        setGroups(groupsRes);
        setTeachers(
          teachersRes.data.data.filter((el) => el.role === "teacher")
        );
        setSubjects(subjectsRes);

        setFormData({
          date: sessionRes.date?.split("T")[0],
          start_time: sessionRes.start_time,
          end_time: sessionRes.end_time,
          type: sessionRes.type,
          group: sessionRes.group?._id || sessionRes.group,
          teacher_id: sessionRes.teacher_id?._id || sessionRes.teacher_id,
          subject: sessionRes.subject?._id || sessionRes.subject,
        });

        setLoading(false);
      } catch (err) {
        toast.error("Failed to load session data", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await adminServices.update_session(id, formData);
      toast.success("Session updated successfully");
      navigate("/sessions");
    } catch (err) {
      toast.error("Failed to update session", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading session...
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <FaEdit className="text-indigo-600 text-3xl" />
          <h2 className="text-2xl font-bold text-gray-800">Update Session</h2>
        </div>

        {/* Date */}
        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
            <FaCalendarAlt className="text-indigo-500" /> Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 font-medium mb-2">
              <FaClock /> Start Time
            </label>
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 font-medium mb-2">
              <FaClock /> End Time
            </label>
            <input
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Type */}
        <div>
          <label className="flex items-center gap-2 font-medium mb-2">
            <FaClipboardList /> Session Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg bg-white"
          >
            <option value="">Select type</option>
            <option value="course">Course</option>
            <option value="TP">TP</option>
            <option value="TD">TD</option>
            <option value="Exam">Exam</option>
          </select>
        </div>

        {/* Group */}
        <div>
          <label className="flex items-center gap-2 font-medium mb-2">
            <FaUsers /> Group
          </label>
          <select
            name="group"
            value={formData.group}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg bg-white"
          >
            <option value="">Select group</option>
            {groups.map((g) => (
              <option key={g._id} value={g._id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        {/* Teacher */}
        <div>
          <label className="flex items-center gap-2 font-medium mb-2">
            <FaUserTie /> Teacher
          </label>
          <select
            name="teacher_id"
            value={formData.teacher_id}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg bg-white"
          >
            <option value="">Select teacher</option>
            {teachers.map((t) => (
              <option key={t._id} value={t._id}>
                {t.username || t.email}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="flex items-center gap-2 font-medium mb-2">
            <FaBook /> Subject
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg bg-white"
          >
            <option value="">Select subject</option>
            {subjects.map((s) => (
              <option key={s._id} value={s._id}>
                {s.subject_name}
              </option>
            ))}
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Update Session
        </button>
      </form>
    </div>
  );
}

export default UpdateSession;
