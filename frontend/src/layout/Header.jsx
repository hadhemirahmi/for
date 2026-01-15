import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";
import { logout } from "../../redux/slices/authSlice"; 

function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-blue-600 text-white flex items-center justify-center rounded-xl font-bold">
          E
        </div>
        <span className="font-bold text-lg text-gray-800">EduPlatform</span>
      </div>

      {/* User menu */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
        >
          <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <FiUser />
          </div>

          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {user?.name}
          </span>

          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FiChevronDown />
          </motion.span>
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border overflow-hidden"
            >
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-sm text-gray-700">
                <FiUser />
                Profile
              </button>

              <button
                onClick={() => dispatch(logout())}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-sm text-red-600"
              >
                <FiLogOut />
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Header;
