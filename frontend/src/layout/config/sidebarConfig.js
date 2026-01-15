import {
  FiHome,
  FiBook,
  FiUsers,
  FiFileText,
  FiSettings,
  FiShield,
} from "react-icons/fi";

export const sidebarConfig = {
  admin: [
    { label: "Dashboard", icon: FiHome, path: "/admin/dashboard" },
    { label: "Users", icon: FiUsers, path: "/admin/users" },
    { label: "Subjects", icon: FiBook, path: "/admin/subjects" },
    { label: "Documents", icon: FiFileText, path: "/admin/documents" },
    { label: "Settings", icon: FiSettings, path: "/admin/settings" },
  ],
  teacher: [
    { label: "Dashboard", icon: FiHome, path: "/teacher/dashboard" },
    { label: "My Subjects", icon: FiBook, path: "/teacher/subjects" },
    { label: "Documents", icon: FiFileText, path: "/teacher/documents" },
  ],
  student: [
    { label: "Home", icon: FiHome, path: "/home" },
    { label: "Subjects", icon: FiBook, path: "/subjects" },
    { label: "Documents", icon: FiFileText, path: "/documents" },
  ],
};
