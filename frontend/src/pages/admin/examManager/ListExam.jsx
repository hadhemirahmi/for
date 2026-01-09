import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router";
import teacherServices from "../../../services/teacherServices";
import { useSelector } from "react-redux";
function ListExam() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const fetchExams = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await teacherServices.get_teacher_exams(user._id);
      console.log(response);
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
  const deleteExam = async (id) => {
    try {
      await teacherServices.delete_exam(id);
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
                {exam.title}
              </h3>
              <p className="text-gray-600">{exam.date}</p>
              <p className="text-gray-600">{exam.group.name}</p>
              <button
                onClick={() => deleteExam(exam._id)}
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
