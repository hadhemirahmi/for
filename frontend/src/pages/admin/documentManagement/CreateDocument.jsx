import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import adminServices from "../../../services/adminServices";
import { useSelector } from "react-redux";
import {
  FaFileAlt,
  FaCalendarAlt,
  FaBook,
  FaLayerGroup,
  FaUpload,
  FaPenFancy,
} from "react-icons/fa";
import teacherServices from "../../../services/teacherServices";

function CreateDocument() {
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    owner: "",
    type: "",
    subject: "",
  });
  const [file, setFile] = useState(null);
  const [allSubjects, setAllSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        adminServices.getAllSubjects().then((result) => {
          setAllSubjects(result.data);
        });
      } catch (err) {
        toast.error(err);
      }
    };
    fetchData();
  }, []);

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
      let data = new FormData();
      data.append("title", formData.title);
      data.append("date", formData.date);
      data.append("owner", user._id);
      data.append("type", formData.type);
      data.append("subject", formData.subject);
      data.append("file", file);
      await teacherServices.add_document(data);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FaFileAlt className="text-indigo-600 text-3xl" />
          <h2 className="text-2xl font-bold text-gray-800">
            Create New Document
          </h2>
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
            placeholder="Enter document title"
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
            onChange={handleChange}
            value={formData.type}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select type</option>
            <option value={"TP"}>TP</option>
            <option value={"Exam"}>Examen</option>
            <option value={"course"}>Cours</option>
            <option value={"TD"}>TD</option>
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
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select subject</option>
            {allSubjects.length > 0 &&
              allSubjects.map((el) => (
                <option key={el._id} value={el._id}>
                  {el.subject_name}
                </option>
              ))}
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <FaUpload className="text-indigo-500" />
            Document
          </label>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-indigo-600 file:text-white
              hover:file:bg-indigo-700 cursor-pointer"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg"
        >
          Upload Document
        </button>
      </form>
    </div>
  );
}

export default CreateDocument;
