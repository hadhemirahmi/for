import React, { useEffect, useState } from "react";
import { FaBook, FaAlignLeft, FaEdit } from "react-icons/fa";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import adminServices from "../../../services/adminServices";

function UpdateSubject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subject_name: "",
    description: "",
  });

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await adminServices.getSubjectById(id);
        setFormData(res);
      } catch (err) {
        toast.error("Failed to load subject", err);
      }
    };
    fetchSubject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminServices.updateSubject(id, formData);
      toast.success("Subject updated successfully");
      navigate("/subjects");
    } catch (err) {
      toast.error("Update failed", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-2xl font-bold flex items-center gap-3 text-indigo-600">
          <FaEdit /> Update Subject
        </h2>

        <div>
          <label className="flex items-center gap-2 font-medium mb-2">
            <FaBook /> Subject Name
          </label>
          <input
            type="text"
            name="subject_name"
            value={formData.subject_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 font-medium mb-2">
            <FaAlignLeft /> Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold">
          Update Subject
        </button>
      </form>
    </div>
  );
}

export default UpdateSubject;
