import React from "react";

const FeatureCards = () => {
  const features = [
    {
      title: "Cours Étudiants",
      description: "Outils interactifs et expérience d'apprentissage moderne.",
      icon: "graduation-cap",
      color: "blue",
      stats: "245 nouveaux étudiants ce mois-ci",
      linkColor: "text-blue-600 hover:text-blue-800",
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
    },
    {
      title: "Tableau de bord Enseignant",
      description: "Outils interactifs et expérience d'enseignement moderne.",
      icon: "chalkboard-teacher",
      color: "green",
      stats: "42 enseignants actifs cette semaine",
      linkColor: "text-green-600 hover:text-green-800",
      bgColor: "bg-green-50",
      textColor: "text-green-800",
    },
    {
      title: "Cours en Direct",
      description:
        "Outils interactifs et expérience d'apprentissage en temps réel.",
      icon: "video",
      color: "purple",
      stats: "78 sessions en direct ce mois-ci",
      linkColor: "text-purple-600 hover:text-purple-800",
      bgColor: "bg-purple-50",
      textColor: "text-purple-800",
    },
    {
      title: "Gestion Admin",
      description: "Outils interactifs et expérience de gestion moderne.",
      icon: "cogs",
      color: "red",
      stats: "12,345 actions de gestion ce mois-ci",
      linkColor: "text-red-600 hover:text-red-800",
      bgColor: "bg-red-50",
      textColor: "text-red-800",
    },
  ];

  const getColorClass = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      red: "bg-red-100 text-red-600",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg overflow-hidden card-hover transition hover:shadow-xl"
        >
          <div className="p-6">
            <div
              className={`w-12 h-12 rounded-lg ${getColorClass(
                feature.color
              )} flex items-center justify-center mb-4`}
            >
              <i className={`fas fa-${feature.icon} text-xl`}></i>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              {feature.title}
            </h4>
            <p className="text-gray-600 mb-6">{feature.description}</p>
            <a
              href="#"
              className={`font-medium flex items-center ${feature.linkColor}`}
            >
              En savoir plus
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
          <div
            className={`px-6 py-4 text-sm ${feature.bgColor} ${feature.textColor}`}
          >
            <i className="fas fa-chart-line mr-2"></i>
            {feature.stats}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
