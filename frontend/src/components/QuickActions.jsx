import React from "react";
import {
  PlusCircle,
  Upload,
  Download,
  Settings,
  Bell,
  Users,
  BookOpen,
  Calendar,
  FileText,
  BarChart3,
  Shield,
  HelpCircle,
  Zap,
  Star,
  MessageSquare,
  Globe,
} from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      icon: <PlusCircle size={20} />,
      label: "Ajouter un utilisateur",
      description: "Créer un nouveau compte",
      color: "bg-blue-50 text-blue-600",
      hoverColor: "hover:bg-blue-100",
    },
    {
      icon: <BookOpen size={20} />,
      label: "Créer un cours",
      description: "Nouveau cours interactif",
      color: "bg-green-50 text-green-600",
      hoverColor: "hover:bg-green-100",
    },
    {
      icon: <Calendar size={20} />,
      label: "Planifier une session",
      description: "Session live ou présentiel",
      color: "bg-purple-50 text-purple-600",
      hoverColor: "hover:bg-purple-100",
    },
    {
      icon: <Upload size={20} />,
      label: "Téléverser un document",
      description: "Partager des ressources",
      color: "bg-yellow-50 text-yellow-600",
      hoverColor: "hover:bg-yellow-100",
    },
    {
      icon: <BarChart3 size={20} />,
      label: "Générer un rapport",
      description: "Statistiques détaillées",
      color: "bg-indigo-50 text-indigo-600",
      hoverColor: "hover:bg-indigo-100",
    },
    {
      icon: <Settings size={20} />,
      label: "Paramètres système",
      description: "Configuration avancée",
      color: "bg-gray-50 text-gray-600",
      hoverColor: "hover:bg-gray-100",
    },
  ];

  const systemActions = [
    {
      icon: <Shield size={18} />,
      label: "Sécurité",
      status: "Active",
      color: "text-green-600",
    },
    {
      icon: <Bell size={18} />,
      label: "Notifications",
      status: "12 non lues",
      color: "text-blue-600",
    },
    {
      icon: <Zap size={18} />,
      label: "Performance",
      status: "Optimale",
      color: "text-yellow-600",
    },
    {
      icon: <Globe size={18} />,
      label: "Serveurs",
      status: "Stable",
      color: "text-purple-600",
    },
  ];

  const recentActivities = [
    { time: "2 min", action: "Nouveau cours publié", user: "Prof. Smith" },
    { time: "15 min", action: "Document téléversé", user: "Admin" },
    { time: "1h", action: "Session planifiée", user: "Prof. Johnson" },
    { time: "3h", action: "Utilisateur ajouté", user: "System" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Actions rapides</h3>
            <p className="text-gray-600">Accès rapide aux fonctionnalités</p>
          </div>
          <div className="p-2 bg-blue-50 rounded-lg">
            <Zap size={24} className="text-blue-600" />
          </div>
        </div>
      </div>

      {/* Grille d'actions */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`flex items-center p-4 rounded-xl border border-gray-200 ${action.color} ${action.hoverColor} transition-all hover:shadow-md hover:-translate-y-0.5`}
            >
              <div className="mr-4">{action.icon}</div>
              <div className="text-left">
                <p className="font-semibold">{action.label}</p>
                <p className="text-sm opacity-75">{action.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Statut système */}
        <div className="mb-8">
          <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
            <Settings size={18} className="mr-2" />
            Statut système
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {systemActions.map((sys, index) => (
              <div
                key={index}
                className="bg-gray-50 p-3 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className={sys.color}>{sys.icon}</div>
                  <span className="ml-2 text-sm font-medium">{sys.label}</span>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-white rounded-full">
                  {sys.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activités récentes */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
            <MessageSquare size={18} className="mr-2" />
            Activités récentes
          </h4>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-600">par {activity.user}</p>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer avec boutons */}
      <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <HelpCircle size={18} className="mr-2" />
            Support
          </button>
          <button className="flex-1 flex items-center justify-center px-4 py-3 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition">
            <Download size={18} className="mr-2" />
            Exporter logs
          </button>
          <button className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-gray-800 to-black text-white rounded-lg hover:from-black hover:to-gray-900 transition">
            <Star size={18} className="mr-2" />
            Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
