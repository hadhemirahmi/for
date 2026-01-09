import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import teacherServices from "../../../services/teacherServices";
import {
  FaClipboardList,
  FaCalendarAlt,
  FaUsers,
  FaFilePdf,
} from "react-icons/fa";
function CreateExam() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    group: "",
    document: "",
  });

  const [groups, setGroups] = useState([]);
  const [documents, setDocuments] = useState([]);
  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groupsRes, docsRes] = await Promise.all([
          teacherServices.get_groups(),
          teacherServices.get_teacher_documents(user._id),
        ]);

        setGroups(groupsRes.data);
        setDocuments(docsRes);
      } catch (err) {
        toast.error("Failed to load data", err);
      }
    };

    fetchData();
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await teacherServices.create_exam({
        title: formData.title,
        date: formData.date,
        owner: user._id,
        group: formData.group,
        document: formData.document,
      });

      toast.success("Exam created successfully");
      navigate("/teacher/exams");
    } catch (err) {
      console.log(err);
      toast.error("Failed to create exam", err);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FaClipboardList className="text-indigo-600 text-3xl" />
          <h2 className="text-2xl font-bold text-gray-800">Create Exam</h2>
        </div>

        {/* Title */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <FaClipboardList className="text-indigo-500" />
            Exam Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter exam title"
          />
        </div>

        {/* Date */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <FaCalendarAlt className="text-indigo-500" />
            Exam Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Group */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <FaUsers className="text-indigo-500" />
            Group
          </label>
          <select
            name="group"
            value={formData.group}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select group</option>
            {groups.map((g) => (
              <option key={g._id} value={g._id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        {/* Document */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <FaFilePdf className="text-indigo-500" />
            Exam Document
          </label>
          <select
            name="document"
            value={formData.document}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select document</option>
            {documents.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.title}
              </option>
            ))}
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg"
        >
          Create Exam
        </button>
      </form>
    </div>
  );
}

export default CreateExam;
