import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-green-700 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-10">Student Panel</h2>

      <nav className="space-y-4">
        <SidebarItem label="Dashboard" icon="🏠" />
        <SidebarItem label="My Courses" icon="📚" />
        <SidebarItem label="Assignments" icon="📝" />
        <SidebarItem label="Progress" icon="📊" />
        <SidebarItem label="Profile" icon="👤" />
        <SidebarItem label="Logout" icon="🚪" danger />
      </nav>
    </aside>
  );
};

const SidebarItem = ({ label, icon, danger }) => (
  <div
    className={`flex items-center gap-3 p-2 rounded cursor-pointer
      ${danger ? "hover:bg-red-600" : "hover:bg-green-600"}`}
  >
    <span>{icon}</span>
    <span>{label}</span>
  </div>
);

export default Sidebar;
