import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import adminServices from "../../../services/adminServices";
import { toast } from "react-toastify";

function UpdateDocument() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    file: null,
    date: "",
    type: "course",
    owner: [],
  });

  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour convertir la date ISO en format YYYY-MM-DD
  const formatDateForInput = (isoDate) => {
    if (!isoDate) return "";
    try {
      // Si c'est déjà au bon format, le garder
      if (isoDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return isoDate;
      }
      // Sinon convertir de ISO à YYYY-MM-DD
      const date = new Date(isoDate);
      if (isNaN(date.getTime())) return "";

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Erreur de format de date:", error);
      return "";
    }
  };

  useEffect(() => {
    async function handleGetAllUser() {
      try {
        // ESSAYEZ LES DEUX NOMS POUR TROUVER LA BONNE MÉTHODE
        let result;

        if (adminServices.get_all_users) {
          result = await adminServices.get_all_users();
        } else if (adminServices.get_all_user) {
          result = await adminServices.get_all_user();
        } else {
          throw new Error(
            "Aucune méthode pour récupérer les utilisateurs trouvée"
          );
        }

        console.log("Résultat utilisateurs:", result.data);

        // Vérifiez la structure de la réponse
        const usersData = result.data?.data || result.data || [];
        const teachers = Array.isArray(usersData)
          ? usersData.filter(
              (el) => el.role === "teacher" || el.role === "enseignant"
            )
          : [];

        setAllUser(teachers);
      } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs:", err);
        toast.error("Erreur lors du chargement des utilisateurs");
      }
    }

    async function handleGetDocument() {
      try {
        let result = await adminServices.get_document_by_id(id);
        console.log("Résultat document:", result.data);

        // CORRECTION: Vérifiez que result.data.owner existe et est un tableau
        const ownerData = result.data?.owner || [];
        const ownerIds = Array.isArray(ownerData)
          ? ownerData.map((el) => el._id || el.id || el)
          : [];

        // CORRECTION: Formatez la date pour l'input
        const formattedDate = formatDateForInput(result.data?.date);

        setFormData({
          title: result.data?.title || "",
          date: formattedDate, // Date formatée pour l'input
          type: result.data?.type || "course",
          owner: ownerIds,
          file: result.data?.file || result.data?.file_path || null,
        });
      } catch (err) {
        console.error("Erreur lors de la récupération du document:", err);
        toast.error("Erreur lors du chargement du document");
      } finally {
        setLoading(false);
      }
    }

    handleGetDocument();
    handleGetAllUser();
  }, [id]);

  const handelechange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("date", formData.date); // Date déjà au bon format
      data.append("type", formData.type);

      // Ajoute le fichier seulement s'il y en a un nouveau
      if (formData.file && typeof formData.file !== "string") {
        data.append("file", formData.file);
      }

      // Ajoute les propriétaires
      formData.owner.forEach((id) => {
        data.append("owner", id);
      });

      console.log(
        "Soumission des données:",
        Object.fromEntries(data.entries())
      );

      await adminServices.update_document(id, data);
      toast.success("Document mis à jour avec succès");

      setTimeout(() => {
        navigate("/list_documents");
      }, 2000);
    } catch (error) {
      console.error("Erreur de soumission:", error);
      toast.error("Erreur lors de la mise à jour du document");
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-2xl">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-2">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">Mettre à jour le document</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700">Titre</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handelechange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Date - CORRECTION APPLIQUÉE */}
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date} // Maintenant au format YYYY-MM-DD
            onChange={handelechange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Format: AAAA-MM-JJ (ex: 2026-01-01)
          </p>
        </div>
        {/* Type */}
        <div>
          <label className="block text-gray-700">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handelechange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="course">Cours</option>
            <option value="exam">Examen</option>
          </select>
        </div>
        {/* File */}
        <div>
          <label className="block text-gray-700">
            Fichier{" "}
            {formData.file && typeof formData.file === "string" && (
              <span className="text-gray-500 ml-2">
                (Fichier actuel: {formData.file})
              </span>
            )}
          </label>
          <input
            type="file"
            name="file"
            onChange={handelechange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
          {formData.file && typeof formData.file === "string" && (
            <p className="text-sm text-gray-500 mt-1">
              Laissez vide pour conserver le fichier existant
            </p>
          )}
        </div>
        {/* Owners */}
        <div className="border border-gray-300 rounded-lg p-4">
          <label className="block text-gray-700 mb-2">
            Propriétaires (enseignants)
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
            {allUser.map((user) => (
              <label
                key={user._id || user.id}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
              >
                <input
                  type="checkbox"
                  value={user._id || user.id}
                  checked={formData.owner.includes(user._id || user.id)}
                  onChange={(e) => {
                    const id = e.target.value;
                    setFormData((prev) => {
                      const isSelected = prev.owner.includes(id);
                      if (isSelected) {
                        return {
                          ...prev,
                          owner: prev.owner.filter((ownerId) => ownerId !== id),
                        };
                      } else {
                        return {
                          ...prev,
                          owner: [...prev.owner, id],
                        };
                      }
                    });
                  }}
                />
                <span>
                  {user.username || user.name || user.email} - {user.email}
                </span>
              </label>
            ))}
          </div>
          {allUser.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              Aucun enseignant trouvé
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
        >
          Mettre à jour le document
        </button>
      </form>
    </div>
  );
}

export default UpdateDocument;
