import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FiFileText, FiCalendar, FiDownload, FiX, FiEye } from "react-icons/fi";
import documentServices from "../../services/documentServices";

function SubjectDocuments() {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const { id } = useParams();

  const handleGetSubjectDocuments = async () => {
    try {
      const result = await documentServices.getSubjectDocuments(id);
      setDocuments(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetSubjectDocuments();
  }, []);

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedDoc ? "hidden" : "auto";
  }, [selectedDoc]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        📚 Subject Documents
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc, index) => (
          <motion.div
            key={doc._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.04 }}
            className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                <FiFileText size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{doc.title}</h3>
                <p className="text-sm text-gray-500">{doc.type}</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <FiCalendar />
              {new Date(doc.date).toLocaleDateString()}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedDoc(doc)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
              >
                <FiEye />
                View
              </button>

              <a
                href={`http://localhost:8000/${doc.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 bg-gray-100 hover:bg-gray-200 rounded-xl"
              >
                <FiDownload />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PDF MODAL */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDoc(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-[95%] h-[90%] rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b">
                <h3 className="font-semibold text-lg">{selectedDoc.title}</h3>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="text-gray-600 hover:text-red-500"
                >
                  <FiX size={22} />
                </button>
              </div>

              {/* PDF Viewer */}
              <iframe
                src={`http://localhost:8000/${selectedDoc.file_path}`}
                className="w-full h-full"
                title="PDF Viewer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SubjectDocuments;
