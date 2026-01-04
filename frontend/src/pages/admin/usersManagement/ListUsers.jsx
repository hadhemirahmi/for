import React, { useEffect, useState } from "react";
import adminServices from "../../../services/adminServices";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function ListUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  async function handleGetAllUsers() {
    try {
      let result = await adminServices.get_users();
      console.log(result);
      setUsers(result.data.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const fetchUsers = async () => {
      await handleGetAllUsers();
    };
    fetchUsers();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await adminServices.toggle_user_account_status(id, {
        newStatus: currentStatus,
      });
      await handleGetAllUsers();
      toast.info("status modifié ! ");
    } catch (error) {
      console.error("Erreur changement statut :", error);
    }
  };

  const deleteUser = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      try {
        await adminServices.delete_user(id);
        handleGetAllUsers();
        toast.error("utilisateur supprimé ! ");
      } catch (error) {
        console.error("Erreur suppression :", error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        Liste des utilisateurs
      </h2>
      <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4 text-left">Nom</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Rôle</th>
            <th className="py-2 px-4 text-left">Statut</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{user.username}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4 capitalize">{user.role}</td>
              <td className="py-2 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    user.account_status === "pending"
                      ? "bg-orange-500"
                      : user.account_status === "disabled"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {user.account_status}
                </span>
              </td>
              <td className="py-2 px-4 text-center space-x-2">
                <select
                  value={user.account_status}
                  onChange={(e) => toggleStatus(user._id, e.target.value)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer"
                >
                  <option value="active">Active</option>
                  <option value="pending">en cours</option>
                  <option value="disabled">Suspendu</option>
                </select>
                <button
                  onClick={() => navigate(`/update_user/${user._id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Modifier
                </button>

                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListUsers;
