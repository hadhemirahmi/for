import React, { useEffect, useState } from "react";
import adminServices from "../../../services/adminServices";
import { FaEdit, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router";

function ListGroup() {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const handleGetAllGroups = async () => {
    try {
      let result = await adminServices.get_all_groups();
      setGroups(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      await handleGetAllGroups();
    })();
  }, []);

  const handleDeleteGroup = async (id) => {
    try {
      await adminServices.delete_group(id).then(() => {
        handleGetAllGroups();
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
        <FaUsers className="text-blue-600" /> Liste des groupes
      </h2>

      {groups.length === 0 ? (
        <p className="text-gray-600">Aucun groupe trouvé.</p>
      ) : (
        <div className="space-y-6">
          {groups.map((group) => (
            <div
              key={group._id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {group.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Niveau : {group.level}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => navigate(`/update_group/${group._id}`)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteGroup(group._id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-medium text-gray-700">Élèves :</p>
                {group.students.length === 0 ? (
                  <p className="text-sm text-gray-500">Aucun élève assigné.</p>
                ) : (
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {group.students.map((eleve) => (
                      <li key={eleve._id}>
                        {eleve.username} ({eleve.email})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListGroup;
