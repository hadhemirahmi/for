import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import teacherServices from "../../../services/teacherServices";
import { FaEye, FaTrash, FaEdit, FaFilePdf, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
function ListDocument() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const fetchDocuments = async () => {
    try {
      const res = await teacherServices.get_teacher_documents(user._id);
      setDocuments(res);
    } catch (err) {
      toast.error("Failed to load documents", err);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchDocuments();
    })();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?"))
      return;

    try {
      await teacherServices.delete_document(id);
      toast.success("Document deleted");
      fetchDocuments();
    } catch (err) {
      toast.error("Delete failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">📚 Documents</h1>

      {/* Documents Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <div
            key={doc._id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FaFilePdf className="text-red-500 text-xl" />
                <h3 className="font-semibold text-lg text-gray-800">
                  {doc.title}
                </h3>
              </div>

              <p className="text-sm text-gray-500">
                📅 {new Date(doc.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                📘 {doc.subject?.subject_name}
              </p>
              <p className="text-sm text-gray-500 mt-1">🏷️ {doc.type}</p>
            </div>

            {/* Actions */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setSelectedDoc(doc)}
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                <FaEye /> View
              </button>

              <button
                onClick={() => navigate(`/teacher/documents/update/${doc._id}`)}
                className="flex items-center gap-2 text-yellow-500 hover:text-yellow-600 font-medium"
              >
                <FaEdit /> Edit
              </button>

              <button
                onClick={() => handleDelete(doc._id)}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal PDF Viewer */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-4xl h-[80vh] rounded-xl shadow-xl relative">
            {/* Close */}
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
            >
              <FaTimes size={22} />
            </button>

            <div className="h-full w-full p-4">
             
              <iframe
                src={"http://localhost:8000/" + selectedDoc.file_path}
                title="PDF Viewer"
                className="w-full h-full rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListDocument;
