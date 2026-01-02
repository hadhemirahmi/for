import React from "react";

const RecentDocuments = ({ documents }) => {
  const getTypeBadge = (type) => {
    const badges = {
      course: { text: "Cours", color: "bg-blue-100 text-blue-800" },
      TP: { text: "TP", color: "bg-green-100 text-green-800" },
      TD: { text: "TD", color: "bg-yellow-100 text-yellow-800" },
      Exam: { text: "Examen", color: "bg-purple-100 text-purple-800" },
    };

    return badges[type] || badges.course;
  };

  const getIconClass = (icon, color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
    };

    return `w-10 h-10 rounded-lg ${
      colors[color] || colors.blue
    } flex items-center justify-center`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-bold text-gray-800">Documents récents</h4>
        <a
          href="#"
          className="text-indigo-600 font-medium text-sm hover:text-indigo-800"
        >
          Voir tout
        </a>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => {
          const badge = getTypeBadge(doc.type);

          return (
            <div
              key={doc.id}
              className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition cursor-pointer"
            >
              <div className={getIconClass(doc.icon, doc.color)}>
                <i className={`fas fa-${doc.icon}`}></i>
              </div>

              <div className="ml-4 flex-1">
                <p className="font-medium">{doc.title}</p>
                <p className="text-sm text-gray-500">
                  Ajouté par {doc.author} • {doc.timeAgo}
                </p>
              </div>

              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${badge.color}`}
              >
                {badge.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentDocuments;
