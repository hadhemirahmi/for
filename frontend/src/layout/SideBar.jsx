import React, { useState } from "react";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiMenu } from "react-icons/fi";
import { sidebarConfig } from "./config/sidebarConfig";

function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role || "student";

  const [collapsed, setCollapsed] = useState(false);

  const links = sidebarConfig[role] || [];

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 260 }}
      className="h-screen bg-gray-900 text-white fixed left-0 top-0 z-50 shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold"
          >
            EduPlatform
          </motion.h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-300 hover:text-white"
        >
          {collapsed ? <FiMenu /> : <FiChevronLeft />}
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-4 space-y-1">
        {links.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 mx-2 rounded-xl transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`
              }
            >
              <Icon size={20} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-sm font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>
    </motion.aside>
  );
}

export default Sidebar;
