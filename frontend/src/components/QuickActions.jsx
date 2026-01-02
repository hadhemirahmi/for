import React from "react";

const QuickActions = () => {
  const actions = [
    {
      icon: "plus-circle",
      label: "Ajouter un nouveau cours",
      color: "indigo",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
      hoverColor: "hover:bg-indigo-100",
    },
    {
      icon: "user-plus",
      label: "Inviter un enseignant",
      color: "green",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      hoverColor: "hover:bg-green-100",
    },
    {
      icon: "upload",
      label: "Téléverser un document",
      color: "blue",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      hoverColor: "hover:bg-blue-100",
    },
    {
      icon: "calendar-plus",
      label: "Planifier une session",
      color: "purple",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      hoverColor: "hover:bg-purple-100",
    },
    {
      icon: "chart-bar",
      label: "Générer un rapport",
      color: "red",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      hoverColor: "hover:bg-red-100",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full">
      <h4 className="text-xl font-bold text-gray-800 mb-6">Actions rapides</h4>

      <div className="space-y-4">
        {actions.map((action, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center p-3 rounded-lg transition ${action.bgColor} ${action.textColor} ${action.hoverColor}`}
          >
            <i className={`fas fa-${action.icon} mr-3`}></i>
            <span>{action.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
