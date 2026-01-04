import React, { useEffect, useState } from "react";
import { FaUsers, FaFile, FaExclamationTriangle } from "react-icons/fa";
import adminServices from "../../../services/adminServices";
import { toast } from "react-toastify";

function CreateExam() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    students: [],
    owner: "",
    document: null,
  });
  const [allStudents, setAllStudents] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDocumentInfo, setSelectedDocumentInfo] = useState(null);

  // Fonction pour normaliser les chemins de fichiers
  const normalizeFilePath = (path) => {
    if (!path) return null;
    // Remplacer les backslashes par des slashes
    return path.replace(/\\/g, "/");
  };

  // Fonction pour extraire le nom du fichier d'un chemin
  const getFileNameFromPath = (path) => {
    if (!path) return null;
    const normalized = normalizeFilePath(path);
    return normalized.split("/").pop();
  };

  // Fonction pour créer un URL complet pour un fichier
  const getFullFileUrl = (path) => {
    if (!path) return null;
    const normalized = normalizeFilePath(path);
    // Si le chemin ne commence pas par /, l'ajouter
    const cleanPath = normalized.startsWith("/")
      ? normalized
      : "/" + normalized;
    return `http://localhost:8000${cleanPath}`;
  };

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        let result = await adminServices.get_users();
        console.log("Résultat API:", result.data);

        // Vérification de la structure de la réponse
        const usersData = result.data?.data || result.data || [];

        const students = usersData.filter(
          (el) => el.role === "student" || el.role === "Student"
        );
        const teachers = usersData.filter(
          (el) =>
            el.role === "teacher" ||
            el.role === "Teacher" ||
            el.role === "enseignant"
        );

        console.log("Étudiants trouvés:", students.length);
        console.log("Enseignants trouvés:", teachers.length);

        setAllStudents(students);
        setAllTeachers(teachers);
      } catch (err) {
        console.log("Erreur lors de la récupération des utilisateurs:", err);
        toast.error("Erreur lors du chargement des utilisateurs");
      }
    }

    async function getAllDocuments() {
      try {
        let result = await adminServices.get_all_documents();
        console.log("Documents:", result);
        // Vérifier la structure de la réponse
        const docsData = result.data?.data || result.data || [];
        // Normaliser les chemins de fichiers
        const normalizedDocs = docsData.map((doc) => ({
          ...doc,
          file_path: normalizeFilePath(doc.file_path),
        }));
        setDocuments(normalizedDocs);
      } catch (err) {
        console.log("Erreur lors de la récupération des documents:", err);
        toast.error("Erreur lors du chargement des documents");
      }
    }

    fetchAllUsers();
    getAllDocuments();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleStudentSelection = (studentId) => {
    setSelectedStudents((prev) => {
      const isSelected = prev.includes(studentId);
      if (isSelected) {
        const updatedStudents = prev.filter((id) => id !== studentId);
        setFormData((prevData) => ({
          ...prevData,
          students: updatedStudents,
        }));
        return updatedStudents;
      } else {
        const updatedStudents = [...prev, studentId];
        setFormData((prevData) => ({
          ...prevData,
          students: updatedStudents,
        }));
        return updatedStudents;
      }
    });
  };

  const handleDocumentSelection = (docId) => {
    setFormData((prev) => ({
      ...prev,
      document: docId,
    }));

    // Mettre à jour les infos du document sélectionné
    const selectedDoc = documents.find((doc) => doc._id === docId);
    setSelectedDocumentInfo(selectedDoc);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      students: [],
      owner: "",
      document: null,
    });
    setSelectedStudents([]);
    setSelectedDocumentInfo(null);
  };

  const testBackendAPI = async () => {
    const tests = [];

    // Test 1: JSON simple (sans fichier)
    const test1Data = {
      title: formData.title,
      date: formData.date,
      owner: formData.owner,
      students: formData.students,
      document: formData.document,
    };

    try {
      console.log("Test 1: Envoi JSON simple");
      const response = await adminServices.create_exam(test1Data);
      tests.push({ method: "JSON simple", success: true, data: response.data });
      return { success: true, method: "JSON simple", data: response.data };
    } catch (error) {
      tests.push({
        method: "JSON simple",
        success: false,
        error: error.response?.data,
      });
    }

    // Test 2: FormData avec document ID seulement
    const formDataWithoutFile = new FormData();
    formDataWithoutFile.append("title", formData.title);
    formDataWithoutFile.append("date", formData.date);
    formDataWithoutFile.append("owner", formData.owner);
    formDataWithoutFile.append("students", JSON.stringify(formData.students));
    formDataWithoutFile.append("document", formData.document);

    try {
      console.log("Test 2: FormData sans fichier");
      const response = await adminServices.create_exam_formdata(
        formDataWithoutFile
      );
      tests.push({
        method: "FormData sans fichier",
        success: true,
        data: response.data,
      });
      return {
        success: true,
        method: "FormData sans fichier",
        data: response.data,
      };
    } catch (error) {
      tests.push({
        method: "FormData sans fichier",
        success: false,
        error: error.response?.data,
      });
    }

    // Test 3: FormData avec fichier factice
    const formDataWithDummyFile = new FormData();
    formDataWithDummyFile.append("title", formData.title);
    formDataWithDummyFile.append("date", formData.date);
    formDataWithDummyFile.append("owner", formData.owner);
    formDataWithDummyFile.append("students", JSON.stringify(formData.students));
    formDataWithDummyFile.append("document", formData.document);

    // Créer un fichier factice
    const fileName =
      selectedDocumentInfo && selectedDocumentInfo.file_path
        ? getFileNameFromPath(selectedDocumentInfo.file_path) || "document.pdf"
        : "examen.pdf";

    const dummyContent = `Document associé: ${
      selectedDocumentInfo?.title || formData.document
    }\nExamen: ${formData.title}\nDate: ${formData.date}`;
    const dummyBlob = new Blob([dummyContent], { type: "application/pdf" });
    formDataWithDummyFile.append("file", dummyBlob, fileName);

    try {
      console.log("Test 3: FormData avec fichier factice");
      console.log("Nom du fichier factice:", fileName);
      const response = await adminServices.create_exam_formdata(
        formDataWithDummyFile
      );
      tests.push({
        method: "FormData avec fichier factice",
        success: true,
        data: response.data,
      });
      return {
        success: true,
        method: "FormData avec fichier factice",
        data: response.data,
      };
    } catch (error) {
      tests.push({
        method: "FormData avec fichier factice",
        success: false,
        error: error.response?.data,
      });
    }

    // Test 4: Avec un Blob vide (si le backend accepte les fichiers vides)
    const formDataWithEmptyFile = new FormData();
    formDataWithEmptyFile.append("title", formData.title);
    formDataWithEmptyFile.append("date", formData.date);
    formDataWithEmptyFile.append("owner", formData.owner);
    formDataWithEmptyFile.append("students", JSON.stringify(formData.students));
    formDataWithEmptyFile.append("document", formData.document);

    const emptyBlob = new Blob([""], { type: "application/octet-stream" });
    formDataWithEmptyFile.append("file", emptyBlob, "empty.pdf");

    try {
      console.log("Test 4: FormData avec fichier vide");
      const response = await adminServices.create_exam_formdata(
        formDataWithEmptyFile
      );
      tests.push({
        method: "FormData avec fichier vide",
        success: true,
        data: response.data,
      });
      return {
        success: true,
        method: "FormData avec fichier vide",
        data: response.data,
      };
    } catch (error) {
      tests.push({
        method: "FormData avec fichier vide",
        success: false,
        error: error.response?.data,
      });
    }

    console.log("Tous les tests ont échoué. Résultats:", tests);
    return { success: false, tests };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.title.trim()) {
      toast.error("Veuillez saisir un titre pour l'examen");
      setLoading(false);
      return;
    }

    if (!formData.date) {
      toast.error("Veuillez sélectionner une date");
      setLoading(false);
      return;
    }

    if (!formData.owner) {
      toast.error("Veuillez sélectionner un enseignant responsable");
      setLoading(false);
      return;
    }

    if (formData.students.length === 0) {
      toast.error("Veuillez sélectionner au moins un étudiant");
      setLoading(false);
      return;
    }

    if (!formData.document) {
      toast.error("Veuillez sélectionner un document pour l'examen");
      setLoading(false);
      return;
    }

    try {
      console.log("=== DÉBUT DE LA CRÉATION D'EXAMEN ===");
      console.log("Données du formulaire:", formData);

      if (selectedDocumentInfo) {
        console.log("Document sélectionné:", {
          id: selectedDocumentInfo._id,
          title: selectedDocumentInfo.title,
          hasFile: !!selectedDocumentInfo.file_path,
          filePath: selectedDocumentInfo.file_path,
          normalizedPath: normalizeFilePath(selectedDocumentInfo.file_path),
          fileName: getFileNameFromPath(selectedDocumentInfo.file_path),
        });
      }

      // Tester différentes approches
      const result = await testBackendAPI();

      if (result.success) {
        toast.success(`Examen ajouté avec succès (méthode: ${result.method})`);
        resetForm();
      } else {
        // Analyser les erreurs
        const errorMessages = result.tests
          ?.map((test) => test.error?.message || JSON.stringify(test.error))
          .filter(Boolean);

        const hasFileError = errorMessages?.some(
          (msg) =>
            msg.toLowerCase().includes("file") ||
            msg.toLowerCase().includes("fichier")
        );

        if (hasFileError) {
          toast.error(
            <div className="text-left">
              <div className="flex items-center gap-2">
                <FaExclamationTriangle className="text-yellow-500" />
                <span className="font-medium">
                  Le backend attend un fichier
                </span>
              </div>
              <div className="mt-2 text-sm">
                <p>Le code a essayé 4 méthodes différentes.</p>
                <p className="mt-1">Solution possible:</p>
                <ul className="list-disc list-inside ml-2 mt-1">
                  <li>Vérifiez que le backend est correctement configuré</li>
                  <li>Contactez l'administrateur système</li>
                </ul>
              </div>
            </div>,
            { autoClose: 10000 }
          );
        } else {
          toast.error(
            "Échec de la création. Vérifiez les logs de la console.",
            { autoClose: 8000 }
          );
        }

        // Afficher les erreurs détaillées dans la console
        console.error("Échecs détaillés:", result.tests);
      }
    } catch (error) {
      console.error("Erreur fatale:", error);
      toast.error(
        <div>
          <p>Erreur inattendue</p>
          <p className="text-sm">Vérifiez la console pour plus de détails</p>
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
        <FaUsers className="text-blue-600" /> Ajouter un examen
      </h2>

      {/* Avertissement */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-3">
          <FaExclamationTriangle className="text-yellow-500 mt-1 flex-shrink-0" />
          <div>
            <p className="font-medium text-yellow-800">Note importante</p>
            <p className="text-sm text-yellow-700 mt-1">
              Le code essaie automatiquement plusieurs méthodes pour contourner
              le problème "File is required". Si l'erreur persiste, vérifiez que
              le document sélectionné existe bien.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Titre */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Titre de l'examen *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ex: Examen final de Mathématiques"
            required
            disabled={loading}
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Date de l'examen *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={loading}
          />
        </div>

        {/* Propriétaire (Enseignant) */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">
            Enseignant responsable *
          </label>
          <div className="space-y-2 max-h-40 overflow-y-auto p-3 border border-gray-200 rounded-lg">
            {allTeachers.length === 0 ? (
              <p className="text-gray-500 text-sm">Aucun enseignant trouvé</p>
            ) : (
              allTeachers.map((teacher) => (
                <div
                  key={teacher._id}
                  className="flex items-center p-2 hover:bg-gray-50 rounded"
                >
                  <input
                    type="radio"
                    id={`teacher-${teacher._id}`}
                    name="owner"
                    value={teacher._id}
                    checked={formData.owner === teacher._id}
                    onChange={handleChange}
                    className="mr-3 h-5 w-5 text-blue-600"
                    disabled={loading}
                  />
                  <label
                    htmlFor={`teacher-${teacher._id}`}
                    className="flex-1 cursor-pointer"
                  >
                    <span className="font-medium">
                      {teacher.username || teacher.name || teacher.email}
                    </span>
                    {teacher.email && (
                      <span className="text-sm text-gray-500 ml-2">
                        ({teacher.email})
                      </span>
                    )}
                  </label>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Document associé */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-gray-700 font-medium">
              Document de l'examen *
            </label>
            {selectedDocumentInfo && selectedDocumentInfo.file_path && (
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <FaFile className="text-sm" />
                Document avec fichier
              </span>
            )}
          </div>

          <div className="max-h-60 overflow-y-auto p-3 border border-gray-200 rounded-lg">
            {documents.length === 0 ? (
              <p className="text-gray-500 text-sm">Aucun document trouvé</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {documents.map((doc) => {
                  const hasFile = !!doc.file_path;
                  const fileName = getFileNameFromPath(doc.file_path);
                  return (
                    <div
                      key={doc._id}
                      className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                        formData.document === doc._id
                          ? "bg-blue-50 border-2 border-blue-200"
                          : "hover:bg-gray-50 border border-gray-100"
                      } ${!hasFile ? "opacity-70" : ""}`}
                      onClick={() => handleDocumentSelection(doc._id)}
                      title={
                        !hasFile
                          ? "Ce document n'a pas de fichier attaché"
                          : `Fichier: ${fileName}`
                      }
                    >
                      <input
                        type="radio"
                        id={`document-${doc._id}`}
                        name="document"
                        value={doc._id}
                        checked={formData.document === doc._id}
                        onChange={() => handleDocumentSelection(doc._id)}
                        className="mr-3 h-5 w-5 text-blue-600"
                        disabled={loading}
                      />
                      <label
                        htmlFor={`document-${doc._id}`}
                        className="flex-1 cursor-pointer"
                      >
                        <span className="font-medium block truncate">
                          {doc.title || "Sans titre"}
                        </span>
                        <div className="text-xs text-gray-500 space-y-1 mt-1">
                          {doc.type && (
                            <span className="block">Type: {doc.type}</span>
                          )}
                          {hasFile ? (
                            <span className="block text-green-600 font-medium truncate">
                              ✓ {fileName}
                            </span>
                          ) : (
                            <span className="block text-red-500 font-medium">
                              ✗ Pas de fichier
                            </span>
                          )}
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {selectedDocumentInfo && (
            <div
              className="mt-3 p-3 rounded-lg border"
              style={{
                backgroundColor: selectedDocumentInfo.file_path
                  ? "#f0fdf4"
                  : "#fef2f2",
                borderColor: selectedDocumentInfo.file_path
                  ? "#bbf7d0"
                  : "#fecaca",
              }}
            >
              <p
                className={`text-sm font-medium ${
                  selectedDocumentInfo.file_path
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {selectedDocumentInfo.file_path
                  ? "✓ Document sélectionné:"
                  : "⚠️ Attention:"}{" "}
                {selectedDocumentInfo.title}
              </p>
              {selectedDocumentInfo.file_path ? (
                <div>
                  <p className="text-xs text-green-700 mt-1">
                    Fichier:{" "}
                    {getFileNameFromPath(selectedDocumentInfo.file_path)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Chemin: {normalizeFilePath(selectedDocumentInfo.file_path)}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-red-600 mt-1">
                  Ce document n'a pas de fichier attaché. Le code va créer un
                  fichier factice.
                </p>
              )}
            </div>
          )}

          <p className="text-sm text-gray-500 mt-2">
            Sélectionnez un document existant. Le code gérera automatiquement le
            fichier.
          </p>
        </div>

        {/* Étudiants */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">
            Étudiants participants *
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({selectedStudents.length} sélectionné(s))
            </span>
          </label>
          <div className="max-h-60 overflow-y-auto p-3 border border-gray-200 rounded-lg">
            {allStudents.length === 0 ? (
              <p className="text-gray-500 text-sm">Aucun étudiant trouvé</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {allStudents.map((student) => (
                  <div
                    key={student._id}
                    className="flex items-center p-2 hover:bg-gray-50 rounded"
                  >
                    <input
                      type="checkbox"
                      id={`student-${student._id}`}
                      checked={selectedStudents.includes(student._id)}
                      onChange={() => handleStudentSelection(student._id)}
                      className="mr-3 h-5 w-5 text-blue-600 rounded"
                      disabled={loading}
                    />
                    <label
                      htmlFor={`student-${student._id}`}
                      className="flex-1 cursor-pointer"
                    >
                      <span className="font-medium">
                        {student.username || student.name || student.email}
                      </span>
                      {student.email && (
                        <span className="text-sm text-gray-500 ml-2">
                          ({student.email})
                        </span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bouton de soumission */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading || !formData.document}
            className={`w-full py-3 rounded-lg transition duration-300 font-medium text-lg ${
              loading || !formData.document
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Tentative de création...
              </div>
            ) : (
              "Créer l'examen (essaie multiple)"
            )}
          </button>

          {!formData.document && (
            <p className="text-sm text-red-500 mt-2 text-center">
              Sélectionnez un document pour activer le bouton
            </p>
          )}
        </div>
      </form>

      {/* Informations de débogage */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg text-sm">
        <details>
          <summary className="cursor-pointer font-medium text-gray-700 flex items-center justify-between">
            <span>Informations techniques</span>
            <span className="text-xs font-normal">
              (Cliquez pour développer)
            </span>
          </summary>
          <div className="mt-2 space-y-3 pt-3 border-t border-gray-300">
            <div>
              <p className="font-medium mb-2">Statistiques des documents:</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white p-2 rounded text-center">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="font-bold text-lg">{documents.length}</p>
                </div>
                <div className="bg-green-50 p-2 rounded text-center border border-green-200">
                  <p className="text-xs text-green-700">Avec fichier</p>
                  <p className="font-bold text-lg text-green-700">
                    {documents.filter((d) => d.file_path).length}
                  </p>
                </div>
                <div className="bg-red-50 p-2 rounded text-center border border-red-200">
                  <p className="text-xs text-red-700">Sans fichier</p>
                  <p className="font-bold text-lg text-red-700">
                    {documents.filter((d) => !d.file_path).length}
                  </p>
                </div>
              </div>
            </div>

            {selectedDocumentInfo && (
              <div className="bg-white p-3 rounded border">
                <p className="font-medium mb-2">
                  Document sélectionné (détails):
                </p>
                <div className="text-xs bg-gray-50 p-2 rounded space-y-1">
                  <p>
                    <span className="font-medium">ID:</span>{" "}
                    {selectedDocumentInfo._id}
                  </p>
                  <p>
                    <span className="font-medium">Titre:</span>{" "}
                    {selectedDocumentInfo.title}
                  </p>
                  <p>
                    <span className="font-medium">Type:</span>{" "}
                    {selectedDocumentInfo.type || "Non spécifié"}
                  </p>
                  <p>
                    <span className="font-medium">Fichier:</span>{" "}
                    {selectedDocumentInfo.file_path ? "Oui" : "Non"}
                  </p>
                  {selectedDocumentInfo.file_path && (
                    <>
                      <p>
                        <span className="font-medium">Nom du fichier:</span>{" "}
                        {getFileNameFromPath(selectedDocumentInfo.file_path)}
                      </p>
                      <p>
                        <span className="font-medium">Chemin normalisé:</span>{" "}
                        {normalizeFilePath(selectedDocumentInfo.file_path)}
                      </p>
                      <p>
                        <span className="font-medium">URL complète:</span>{" "}
                        {getFullFileUrl(selectedDocumentInfo.file_path)}
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <p className="font-medium text-blue-800 mb-2">
                Méthodes essayées:
              </p>
              <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                <li>JSON simple (sans fichier)</li>
                <li>FormData sans fichier</li>
                <li>FormData avec fichier factice</li>
                <li>FormData avec fichier vide</li>
              </ol>
              <p className="text-xs text-blue-700 mt-2">
                Le code tente automatiquement ces 4 approches pour contourner
                l'erreur "File is required".
              </p>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}

export default CreateExam;
