import React, { useEffect, useState } from "react";
import adminServices from "../../../services/adminServices";
import { FaEdit, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router";

function ListExam() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchExams = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await adminServices.get_all_exams();
      setExams(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des examens :", error);
      setError("Impossible de charger les examens");
      setExams([]); // S'assurer que exams est un tableau vide en cas d'erreur
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchExams();
  }, []);
  const deleteGroup = async (id) => {
    try {
      await adminServices.delete_exam(id);
      fetchExams();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'examen :", error);
      alert("Erreur lors de la suppression de l'examen");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
        <FaUsers className="text-blue-600" /> Liste des examens
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : exams.length === 0 ? (
        <p className="text-gray-600">Aucun examen trouvé.</p>
      ) : (
        <div className="space-y-6">
          {exams.map((exam) => (
            <div
              key={exam._id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {exam.name}
              </h3>
              <p className="text-gray-600">{exam.description}</p>
              <button
                onClick={() => deleteGroup(exam._id)}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Supprimer
              </button>
              <button
                onClick={() => navigate(`/update_exam/${exam._id}`)}
                className="mt-2 ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Modifier
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListExam;
