import React, { useState, useEffect } from "react";
import { Bell, Search, Menu, User, Calendar, Download } from "lucide-react";

const Header = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [notifications] = useState([
    { id: 1, text: "Nouveau cours ajouté", time: "10 min" },
    { id: 2, text: "3 nouveaux étudiants", time: "1h" },
    { id: 3, text: "Examen planifié", time: "2h" },
  ]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const timeString = now.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const dateString = now.toLocaleDateString("fr-FR", options);
      setCurrentTime(`${dateString} - ${timeString}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Partie gauche */}
          <div className="flex items-center justify-between md:justify-start">
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu size={24} />
            </button>
            <div className="md:ml-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Tableau de bord
              </h1>
              <p className="text-gray-600">{currentTime}</p>
            </div>
          </div>

          {/* Partie droite */}
          <div className="flex items-center space-x-4">
            {/* Barre de recherche */}
            <div className="relative hidden md:block">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Boutons d'action */}
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Calendar size={18} className="mr-2" />
              <span className="hidden md:inline">Nouveau cours</span>
              <span className="md:hidden">+</span>
            </button>

            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download size={18} className="mr-2" />
              <span className="hidden md:inline">Exporter</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell size={22} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 hidden group-hover:block z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 border-b border-gray-100 hover:bg-gray-50"
                    >
                      <p className="text-gray-800">{notification.text}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Il y a {notification.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Profil utilisateur */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <p className="font-medium text-gray-800">Administrateur</p>
                <p className="text-sm text-gray-600">Super Admin</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <User size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <div>
              <p className="text-sm text-gray-600">Utilisateurs actifs</p>
              <p className="text-lg font-bold text-gray-800">1,234</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Cours aujourd'hui</p>
              <p className="text-lg font-bold text-gray-800">12</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Documents</p>
              <p className="text-lg font-bold text-gray-800">456</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Statut système:</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Opérationnel
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
