import React from "react";

const StatsCards = ({ stats }) => {
  const statItems = [
    {
      icon: "users",
      label: "Utilisateurs totaux",
      value: stats.totalUsers,
      change: "+12.5%",
      color: "blue",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      icon: "book",
      label: "Cours actifs",
      value: stats.activeCourses,
      change: "+8.3%",
      color: "green",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      icon: "chalkboard-teacher",
      label: "Enseignants",
      value: stats.teachers,
      change: "+5.2%",
      color: "purple",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      icon: "file-alt",
      label: "Documents",
      value: stats.documents,
      change: "+15.7%",
      color: "red",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-6 card-hover transition hover:shadow-lg"
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${item.bgColor} ${item.textColor}`}>
              <i className={`fas fa-${item.icon} text-2xl`}></i>
            </div>
            <div className="ml-4">
              <p className="text-gray-500">{item.label}</p>
              <p className="text-2xl font-bold">
                {item.value.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="text-green-500 text-sm font-medium">
              <i className="fas fa-arrow-up mr-1"></i> {item.change}
            </span>
            <span className="text-gray-500 text-sm ml-2">
              depuis le mois dernier
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
