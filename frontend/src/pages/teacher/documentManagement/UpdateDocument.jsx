import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import adminServices from "../../../services/adminServices.js";
import teacherServices from "../../../services/teacherServices.js";
import {
  FaFileAlt,
  FaCalendarAlt,
  FaBook,
  FaLayerGroup,
  FaUpload,
  FaPenFancy,
  FaArrowLeft,
} from "react-icons/fa";

function UpdateDocument() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    type: "",
    subject: "",
  });

  const [file, setFile] = useState(null);
  const [allSubjects, setAllSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsRes, docRes] = await Promise.all([
          adminServices.getAllSubjects(),
          teacherServices.get_document_by_id(id),
        ]);

        setAllSubjects(subjectsRes.data);

        setFormData({
          title: docRes.data.title,
          date: docRes.data.date?.substring(0, 10),
          type: docRes.data.type,
          subject: docRes.data.subject?._id,
        });

        setLoading(false);
      } catch (err) {
        console.log(err)
        toast.error("Failed to load document", err);
      }
    };

    fetchData();
  }, [id]);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("date", formData.date);
      data.append("type", formData.type);
      data.append("subject", formData.subject);

      if (file) {
        data.append("file", file);
      }

      await teacherServices.update_document(id, data);

      toast.success("Document updated successfully");
      navigate("/teacher/documents");
    } catch (err) {
      toast.error("Update failed", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
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
          <FaFileAlt className="text-indigo-600 text-3xl" />
          <h2 className="text-2xl font-bold text-gray-800">Update Document</h2>
        </div>

        {/* Title */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <FaPenFancy className="text-indigo-500" />
            Titre
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Date */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <FaCalendarAlt className="text-indigo-500" />
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Type */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <FaLayerGroup className="text-indigo-500" />
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select type</option>
            <option value="TP">TP</option>
            <option value="Exam">Examen</option>
            <option value="course">Cours</option>
            <option value="TD">TD</option>
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <FaBook className="text-indigo-500" />
            Matière
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select subject</option>
            {allSubjects.map((el) => (
              <option key={el._id} value={el._id}>
                {el.subject_name}
              </option>
            ))}
          </select>
        </div>

        {/* File */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <FaUpload className="text-indigo-500" />
            Replace Document (optional)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-indigo-600 file:text-white
              hover:file:bg-indigo-700 cursor-pointer"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg"
          >
            Update Document
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            <FaArrowLeft />
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateDocument;
