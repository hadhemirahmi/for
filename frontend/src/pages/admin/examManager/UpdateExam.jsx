import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import teacherServices from "../../../services/teacherServices";
import {
  FaClipboardList,
  FaCalendarAlt,
  FaUsers,
  FaFilePdf,
  FaEdit,
} from "react-icons/fa";

function UpdateExam() {
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams(); // exam id
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    group: "",
    document: "",
  });

  const [groups, setGroups] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groupsRes, docsRes, examRes] = await Promise.all([
          teacherServices.get_groups(),
          teacherServices.get_teacher_documents(user._id),
          teacherServices.get_teacher_exam_by_id(id),
        ]);

        setGroups(groupsRes.data);
        setDocuments(docsRes);
        console.log(examRes);
        setFormData({
          title: examRes.data.title,
          date: examRes.data.date?.split("T")[0], // format for input date
          group: examRes.data.group?._id || "",
          document: examRes.data.document?._id || "",
        });

        setLoading(false);
      } catch (err) {
        toast.error("Failed to load exam data", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user._id]);

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
      await teacherServices.update_exam(id, {
        title: formData.title,
        date: formData.date,
        group: formData.group,
        document: formData.document,
      });

      toast.success("Exam updated successfully");
      navigate("/list_exams");
    } catch (err) {
      toast.error("Failed to update exam", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading exam...</p>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FaEdit className="text-indigo-600 text-3xl" />
          <h2 className="text-2xl font-bold text-gray-800">Update Exam</h2>
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
          Update Exam
        </button>
      </form>
    </div>
  );
}

export default UpdateExam;
