import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import adminServices from "../../../services/adminServices";
import { toast } from "react-toastify";

function UpdateDocument() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    file: null,
    date: "",
    type: "course",
    owner: [],
  });
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    async function handleGetAllUser() {
      try {
        // CORRECTION: Utilisez get_all_users (avec 's') au lieu de get_all_user
        let result = await adminServices.get_all_users();
        // Filtre les utilisateurs avec le rôle "teacher"
        const teachers =
          result.data.data?.filter((el) => el.role == "teacher") || [];
        setAllUser(teachers);
      } catch (err) {
        console.log("Erreur lors de la récupération des utilisateurs:", err);
      }
    }

    async function handleGetDocument() {
      try {
        // Vérifiez que cette méthode existe dans adminServices
        let result = await adminServices.get_document_by_id(id);

        // CORRECTION: Vérifiez que result.data.owner existe et est un tableau
        const ownerData = result.data.owner || [];
        const ownerIds = Array.isArray(ownerData)
          ? ownerData.map((el) => el._id || el)
          : [];

        setFormData({
          title: result.data.title || "",
          date: result.data.date || "",
          type: result.data.type || "course",
          owner: ownerIds,
          file: result.data.file || null,
        });
      } catch (err) {
        console.log("Erreur lors de la récupération du document:", err);
        toast.error("Erreur lors du chargement du document");
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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("date", formData.date);
      data.append("type", formData.type);

      // Ajoute le fichier seulement s'il y en a un nouveau
      if (formData.file && typeof formData.file !== "string") {
        data.append("file", formData.file);
      }

      // Ajoute les propriétaires
      formData.owner.forEach((id) => {
        data.append("owner", id);
      });

      console.log("Submitting data:", formData);
      await adminServices.update_document(id, data);

      toast.success("Document mis à jour avec succès");

      setTimeout(() => {
        navigate("/list_documents");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour du document");
    }
  };

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
        {/* Date */}
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handelechange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
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
                key={user._id}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
              >
                <input
                  type="checkbox"
                  value={user._id}
                  checked={formData.owner.includes(user._id)}
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
                  {user.username || user.name} - {user.email}
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
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Mettre à jour le document
        </button>
      </form>
    </div>
  );
}

export default UpdateDocument;
