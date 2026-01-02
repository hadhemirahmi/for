import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Clock,
  FileText,
} from "lucide-react";

const StatsCards = ({ stats }) => {
  const statItems = [
    {
      icon: <Users size={24} />,
      label: "Utilisateurs totaux",
      value: stats.totalUsers.toLocaleString(),
      change: { value: 12.5, direction: "up" },
      description: "Depuis le mois dernier",
      color: "border-blue-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: <BookOpen size={24} />,
      label: "Cours actifs",
      value: stats.activeCourses,
      change: { value: 8.3, direction: "up" },
      description: "12 nouveaux ce mois",
      color: "border-green-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: <Users size={24} />,
      label: "Enseignants",
      value: stats.teachers,
      change: { value: 5.2, direction: "up" },
      description: "3 nouveaux recrutés",
      color: "border-purple-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: <FileText size={24} />,
      label: "Documents",
      value: stats.documents.toLocaleString(),
      change: { value: 15.7, direction: "up" },
      description: "+428 ce mois",
      color: "border-red-500",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      icon: <Clock size={24} />,
      label: "Heures de cours",
      value: "1.2k",
      change: { value: 18.2, direction: "up" },
      description: "+204h ce mois",
      color: "border-yellow-500",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      icon: <TrendingUp size={24} />,
      label: "Engagement",
      value: "89%",
      change: { value: 4.3, direction: "up" },
      description: "Taux de participation",
      color: "border-indigo-500",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          Statistiques globales
        </h3>
        <div className="flex items-center space-x-4">
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Ce mois</option>
            <option>Le mois dernier</option>
            <option>Cette année</option>
            <option>L'année dernière</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Personnaliser
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {statItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            {/* En-tête avec icône et indicateur */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-lg ${item.bgColor} ${item.iconColor}`}
                >
                  {item.icon}
                </div>
                <div
                  className={`flex items-center px-2 py-1 rounded-full ${
                    item.change.direction === "up"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.change.direction === "up" ? (
                    <TrendingUp size={14} className="mr-1" />
                  ) : (
                    <TrendingDown size={14} className="mr-1" />
                  )}
                  <span className="text-sm font-semibold">
                    {item.change.value}%
                  </span>
                </div>
              </div>

              {/* Valeur principale */}
              <div className="mb-2">
                <p className="text-3xl font-bold text-gray-900">{item.value}</p>
                <p className="text-gray-600 font-medium">{item.label}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500">{item.description}</p>

              {/* Barre de progression */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Progression</span>
                  <span>{item.change.value}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.change.direction === "up"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min(item.change.value, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Ligne de couleur en bas */}
            <div className={`h-1 rounded-b-xl ${item.color}`} />
          </div>
        ))}
      </div>

      {/* Résumé des tendances */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              📈 Tendance positive globale
            </h4>
            <p className="text-gray-600">
              Tous les indicateurs montrent une croissance positive ce mois-ci.
              L'engagement des utilisateurs a augmenté de 12.5%.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              +12.5% Engagements
            </div>
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              +8.3% Cours
            </div>
            <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              +5.2% Enseignants
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
