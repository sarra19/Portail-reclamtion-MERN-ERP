import React, { useState, useEffect } from "react";
import SummaryApi from "../../common";
import { toast, ToastContainer } from "react-toastify";

export default function CardReclamationAdmin() {
  const [allReclamation, setAllReclamation] = useState([]);
  const [activeTab, setActiveTab] = useState("MesRéclamations");
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setCurrentUser(result.data);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user details.");
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchAllReclamation = async () => {
    try {
      const response = await fetch(SummaryApi.mesReclamations.url, {
        method: SummaryApi.mesReclamations.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const dataResponse = await response.json();
      console.log("Reclamation data:", dataResponse);

      if (dataResponse.success && Array.isArray(dataResponse.data)) {
        setAllReclamation(dataResponse.data);
      } else {
        console.error("Aucune donnée de Réclamation disponible.");
        setAllReclamation([]);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des Réclamations:", error);
    }
  };

  useEffect(() => {
    fetchAllReclamation();
  }, []);

  const filteredReclamations = allReclamation.filter(
    (reclamation) =>
      (activeTab === "MesRéclamations" && reclamation.CreatedBy === currentUser?.No_) ||
      (activeTab === "BoiteReception" && reclamation.TargetUser === currentUser?.No_)
  );

  return (
    <>
      <ToastContainer position="top-center" />

      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded animate-fade-down animate-once animate-duration-[4000ms] animate-ease-in-out animate-fill-forwards">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Mes Réclamations
              </h3>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 px-4 py-2">
          {["MesRéclamations", "BoiteReception"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-t-lg text-sm font-bold uppercase transition-all duration-300 ${
                activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "MesRéclamations" ? "Mes Réclamations" : "Boîte de Réception"}
            </button>
          ))}
        </div>

        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Sujet
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Statut
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Nom de Cible
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReclamations.length > 0 ? (
                filteredReclamations.map((reclamation, index) => (
                  <tr key={index} className="border-t">
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {reclamation.Subject}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {reclamation.Status === 0
                        ? "En cours"
                        : reclamation.Status === 1
                        ? "Traitée"
                        : "Résolue"}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {reclamation.Name}
                    </td>
                    <td className="px-6 py-4 flex space-x-2"></td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <a href={`/détails-réclamations/${reclamation.No_}`}>
                        <button
                          className="bg-orange-dys text-white active:bg-orange-dys font-bold uppercase text-xs px-6 py-2 mt-4 shadow hover:shadow-md outline-none focus:outline-none mr-1 animate-ease-in-out animate-fill-forwards hover:animate-jump hover:animate-once hover:animate-duration-[2000ms]"
                          type="button"
                        >
                          Détails
                        </button>
                      </a>
                    </td>
                    {currentUser?.Role !== 1 && (
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <a href={`/réponse-réclamations/${reclamation.No_}`}>
                          <button
                            className="bg-bleu-dys text-white active:bg-bleu-dys font-bold uppercase text-xs px-6 py-2 mt-4 shadow hover:shadow-md outline-none focus:outline-none mr-1 animate-ease-in-out animate-fill-forwards hover:animate-jump hover:animate-once hover:animate-duration-[2000ms]"
                            type="button"
                          >
                            <i className="fas fa-paper-plane mr-2"></i>
                            Répondre
                          </button>
                        </a>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    Aucune réclamation trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
