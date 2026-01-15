import React from "react";
import { motion } from "framer-motion";
import { FiLock, FiArrowLeft, FiHome } from "react-icons/fi";
import { useNavigate } from "react-router";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center"
        >
          <FiLock size={36} />
        </motion.div>

        {/* Text */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-500 mb-6">
          You don’t have permission to access this page.
        </p>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
          >
            <FiArrowLeft />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            <FiHome />
            Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Unauthorized;
