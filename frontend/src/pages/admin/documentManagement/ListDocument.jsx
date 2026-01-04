import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import adminServices from "../../../services/adminServices";
import { FaTrashAlt, FaUsers, FaEdit } from "react-icons/fa";


function ListDocument() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([ ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await adminServices.get_all_documents();
      // Vérifier la structure de la réponse
      console.log("Réponse API:", response);

      // Adapter selon la structure réelle de la réponse
      if (response.data && Array.isArray(response.data.data)) {
        setDocuments(response.data.data);
      } else if (Array.isArray(response.data)) {
        setDocuments(response.data);
      } else if (response.data && Array.isArray(response.data.documents)) {
        setDocuments(response.data.documents);
      } else {
        console.warn("Structure de réponse inattendue:", response);
        setDocuments([]); // Initialiser avec un tableau vide
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des documents :", error);
      setError("Impossible de charger les documents");
      setDocuments([]); // S'assurer que documents est un tableau vide en cas d'erreur
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDeleteDocument = async (id) => {
    try {
      await adminServices.delete_document(id);
      fetchDocuments();
    } catch (error) {
      console.error("Erreur lors de la suppression du document :", error);
      alert("Erreur lors de la suppression du document");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
        <FaUsers className="text-blue-600" /> Liste des documents
      </h2>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-2">Chargement des documents...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchDocuments}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      ) : documents.length === 0 ? (
        <p className="text-gray-600 text-center py-8">Aucun document trouvé.</p>
      ) : (
        <div className="space-y-6">
          {documents.map((document) => (
            <div
              key={document._id || document.id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {document.title || "Sans titre"}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Type :{" "}
                    <span className="font-medium">
                      {document.type || "Non spécifié"}
                    </span>
                  </p>
                  {document.date && (
                    <p className="text-gray-600 text-sm mt-1">
                      Date :{" "}
                      {new Date(document.date).toLocaleDateString("fr-FR")}
                    </p>
                  )}
                  {document.file_path && (
                    <p className="text-gray-600 text-sm mt-1">
                      Fichier :{" "}
                      <span className="text-blue-600 font-medium">
                        {document.file_path}
                      </span>
                    </p>
                  )}
                  {document.owner && (
                    <p className="text-gray-600 text-sm mt-1">
                      Propriétaire :{" "}
                      <span className="font-medium">
                        {document.owner.username ||
                          document.owner.name ||
                          document.owner.email ||
                          "Inconnu"}
                      </span>
                    </p>
                  )}
                </div>
                <div className="flex gap-3 ml-4">
                  <button
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                    onClick={() =>
                      handleDeleteDocument(document._id || document.id)
                    }
                    title="Supprimer le document"
                  >
                    <FaTrashAlt className="w-5 h-5" />
                  </button>
                  <button
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors"
                    onClick={() => navigate(`/update_document/${document._id}`)}
                    title="Modifier le document"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListDocument;
