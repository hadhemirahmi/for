import React, { useEffect, useState } from "react";
import adminServices from "../../../services/adminServices";
import { toast } from "react-toastify";
import { FaUsers, FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
function UpdateGroup() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    students: [],
  });
  const [allStudents, setAllStudents] = useState([]);
  useEffect(() => {
    async function handleGetAllStudents() {
      try {
        let result = await adminServices.get_users();
        console.log(result);
        setAllStudents(result.data.data.filter((el) => el.role == "student"));
      } catch (err) {
        console.log(err);
      }
    }
    async function handleGetGroup() {
      try {
        let result = await adminServices.get_group_by_id(id);
        setFormData({
          name: result.data.name,
          level: result.data.level,
          students: result.data.students.map((el) => el._id),
        });
      } catch (err) {
        console.log(err);
      }
    }
    handleGetGroup();
    handleGetAllStudents();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminServices.update_group(id, formData);
      toast.success("Groupe ajouté avec succès");
      setTimeout(() => {
        navigate("/list_groups");
      }, 2000);
    } catch (error) {
      toast.error("Erreur lors de l'ajout du groupe :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
        <FaUsers className="text-blue-600" /> Ajouter un groupe
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Nom du groupe
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Ex: Groupe A"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Niveau</label>
          <input
            type="text"
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Ex: 1ère année"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1 mb-2">
            Élèves
          </label>
          <div className="grid grid-cols-2 gap-2 border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto">
            {allStudents.map((eleve) => (
              <label key={eleve._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={eleve._id}
                  checked={formData.students.includes(eleve._id)}
                  onChange={(e) => {
                    const id = e.target.value;
                    setFormData((prev) => {
                      const isSelected = prev.students.includes(id);
                      return {
                        ...prev,
                        students: isSelected
                          ? prev.students.filter((eid) => eid !== id)
                          : [...prev.students, id],
                      };
                    });
                  }}
                />
                <span>
                  {eleve.username} - {eleve.email}
                </span>
              </label>
            ))}
          </div>

          {/* Affichage des élèves sélectionnés */}
          {formData.students.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Élèves sélectionnés :
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {allStudents
                  .filter((el) => formData.students.includes(el._id))
                  .map((el) => (
                    <li key={el._id}>
                      {el.username} ({el.email})
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
        >
          <FaPlus /> Ajouter le groupe
        </button>
      </form>
    </div>
  );
}

export default UpdateGroup;
