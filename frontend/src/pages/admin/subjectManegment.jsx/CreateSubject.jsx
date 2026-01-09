import React, { useState } from "react";
import { FaBook, FaAlignLeft, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import adminServices from "../../../services/adminServices.js";

function CreateSubject() {
  const [formData, setFormData] = useState({
    subject_name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminServices.createSubject(formData);
      toast.success("Subject created successfully");
      setFormData({ subject_name: "", description: "" });
    } catch (err) {
      toast.error("Failed to create subject", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-2xl font-bold flex items-center gap-3 text-indigo-600">
          <FaPlus /> Create Subject
        </h2>

        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
            <FaBook /> Subject Name
          </label>
          <input
            type="text"
            name="subject_name"
            value={formData.subject_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter subject name"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
            <FaAlignLeft /> Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter description"
          />
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold">
          Create Subject
        </button>
      </form>
    </div>
  );
}

export default CreateSubject;
