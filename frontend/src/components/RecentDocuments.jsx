import React, { useState } from "react";
import {
  FileText,
  FilePdf,
  FileWord,
  FileExcel,
  Download,
  Eye,
  Share2,
  MoreVertical,
  Calendar,
  User,
  Search,
  Filter,
} from "lucide-react";

const RecentDocuments = ({ documents = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Documents par défaut si aucun n'est fourni
  const defaultDocuments = [
    {
      id: 1,
      title: "Introduction à MongoDB",
      type: "course",
      author: "Prof. Smith",
      timeAgo: "il y a 2 jours",
      icon: "pdf",
      color: "blue",
      size: "2.4 MB",
      views: 245,
      downloads: 89,
      status: "public",
    },
    {
      id: 2,
      title: "Exercices Node.js - TP 2024",
      type: "TP",
      author: "Prof. Johnson",
      timeAgo: "il y a 3 jours",
      icon: "word",
      color: "green",
      size: "1.8 MB",
      views: 189,
      downloads: 67,
      status: "private",
    },
    {
      id: 3,
      title: "Examen final - Mathématiques",
      type: "Exam",
      author: "Prof. Williams",
      timeAgo: "il y a 5 jours",
      icon: "excel",
      color: "purple",
      size: "3.2 MB",
      views: 324,
      downloads: 142,
      status: "public",
    },
    {
      id: 4,
      title: "Cours Python avancé",
      type: "course",
      author: "Dr. Martin",
      timeAgo: "il y a 1 semaine",
      icon: "pdf",
      color: "blue",
      size: "4.1 MB",
      views: 456,
      downloads: 201,
      status: "public",
    },
    {
      id: 5,
      title: "TD Algorithmique",
      type: "TD",
      author: "Prof. Lee",
      timeAgo: "il y a 2 semaines",
      icon: "word",
      color: "green",
      size: "1.2 MB",
      views: 167,
      downloads: 54,
      status: "private",
    },
  ];

  const docs = documents.length > 0 ? documents : defaultDocuments;

  const categories = [
    { id: "all", label: "Tous", count: docs.length },
    {
      id: "course",
      label: "Cours",
      count: docs.filter((d) => d.type === "course").length,
    },
    {
      id: "TP",
      label: "TP",
      count: docs.filter((d) => d.type === "TP").length,
    },
    {
      id: "TD",
      label: "TD",
      count: docs.filter((d) => d.type === "TD").length,
    },
    {
      id: "Exam",
      label: "Examens",
      count: docs.filter((d) => d.type === "Exam").length,
    },
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FilePdf size={20} className="text-red-500" />;
      case "word":
        return <FileWord size={20} className="text-blue-500" />;
      case "excel":
        return <FileExcel size={20} className="text-green-500" />;
      default:
        return <FileText size={20} className="text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    if (status === "public") {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
          Public
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
        Privé
      </span>
    );
  };

  const getTypeBadge = (type) => {
    const config = {
      course: { color: "bg-blue-100 text-blue-800", label: "Cours" },
      TP: { color: "bg-green-100 text-green-800", label: "TP" },
      TD: { color: "bg-yellow-100 text-yellow-800", label: "TD" },
      Exam: { color: "bg-purple-100 text-purple-800", label: "Examen" },
    };

    const { color, label } = config[type] || config.course;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded ${color}`}>
        {label}
      </span>
    );
  };

  const filteredDocs = docs.filter((doc) => {
    const matchesCategory =
      selectedCategory === "all" || doc.type === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Documents récents
            </h3>
            <p className="text-gray-600">
              Gérez et suivez vos documents pédagogiques
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
              <FileText size={18} className="mr-2" />
              Nouveau document
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Barre de recherche */}
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Rechercher un document..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filtres */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter size={18} className="text-gray-500 mr-2" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label} ({cat.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Catégories */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {cat.label} <span className="ml-1 opacity-75">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Liste des documents */}
      <div className="p-6">
        <div className="space-y-4">
          {filteredDocs.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun document trouvé</p>
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Infos document */}
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      {getFileIcon(doc.icon)}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {doc.title}
                        </h4>
                        {getTypeBadge(doc.type)}
                        {getStatusBadge(doc.status)}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <User size={14} className="mr-1" />
                          {doc.author}
                        </span>
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {doc.timeAgo}
                        </span>
                        <span>{doc.size}</span>
                        <span>👁️ {doc.views} vues</span>
                        <span>⬇️ {doc.downloads} téléchargements</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition">
                      <Download size={18} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition">
                      <Share2 size={18} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">
                Affichage de{" "}
                <span className="font-semibold">1-{filteredDocs.length}</span>{" "}
                sur <span className="font-semibold">{docs.length}</span>{" "}
                documents
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Voir l'historique
              </button>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black">
                Voir tous les documents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentDocuments;
