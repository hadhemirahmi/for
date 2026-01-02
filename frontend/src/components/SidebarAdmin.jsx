import React from "react";

const SidebarAdmin = () => {
  const menuItems = [
    { icon: "tachometer-alt", label: "Tableau de bord", active: true },
    { icon: "users", label: "Utilisateurs", link: "/usersAdmin", count: "75k+" },
    { icon: "book", label: "Cours" , link: "/coursesAdmin" },
    { icon: "calendar-alt", label: "Sessions", link: "/sessionsAdmin" },
    { icon: "file-alt", label: "Documents", link: "/documentsAdmin" },
    { icon: "clipboard-list", label: "Examens", link: "/examsAdmin" },
    { icon: "layer-group", label: "Groupes", link: "/groupsAdmin" },
    { icon: "cog", label: "Paramètres", link: "/settingsAdmin" },
  ];

  return (
    <div className="sidebar w-64 bg-white shadow-lg flex flex-col hidden md:flex">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-indigo-700 flex items-center">
          <i className="fas fa-graduation-cap mr-2"></i> EduLearn
        </h1>
        <p className="text-gray-500 text-sm mt-1">Admin Dashboard</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.link || '#'}
            className={`flex items-center px-4 py-3 rounded-lg ${
              item.active
                ? "text-gray-700 bg-indigo-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <i className={`fas fa-${item.icon} mr-3 ${
                item.active ? "text-indigo-600" : ""}`}></i>
            <span className="font-medium">{item.label}</span>
            {item.count && (
              <span className="ml-auto bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
                {item.count}
              </span>
            )}
            
          </a>
        ))}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center">
          <img
            src="https://ui-avatars.com/api/?name=Admin+User&background=667eea&color=fff"
            className="w-10 h-10 rounded-full"
            alt="Admin"
          />
          <div className="ml-3">
            <p className="font-medium">Administrateur</p>
            <p className="text-sm text-gray-500">admin@edulearn.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
