import React, { useState, useEffect } from "react";
import SummaryApi from "../../common";

export default function CardReclamation() {
  const [allReclamation, setAllReclamation] = useState([]);
  const [activeTab, setActiveTab] = useState("Produit");

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

      if (Array.isArray(dataResponse) && dataResponse.length > 0) {
        setAllReclamation(dataResponse);
      } else {
        console.error(
          "Aucune donnée de Reclamation disponible dans la réponse de l'API."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des Reclamations:", error);
    }
  };

  useEffect(() => {
    fetchAllReclamation();
  }, []);

  const filteredReclamations = allReclamation.filter(
    (reclamation) => reclamation.typeCible === activeTab
  );

  return (
    <>
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
          {["Produit", "Service"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-t-lg text-sm font-bold uppercase transition-all duration-300 ${
                activeTab === tab
                  ? "bg-blue-600 text-gray-700"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "Produit" ? "Produits" : "Services"}
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
                      {reclamation.sujet}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {reclamation.statut}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {reclamation.nom}
                    </td>
                    <td className="px-6 py-4 flex space-x-2"></td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <a href={`/détails-réclamations/${reclamation._id}`}>
                    <button
                          className="bg-orange-dys text-white active:bg-orange-dys font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Détails
                        </button>
                      </a>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <a href={`/réponse-réclamations/${reclamation._id}`}>
                        <button
                          className="bg-bleu-dys text-white active:bg-orange-dys font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          <i className="fas fa-paper-plane mr-2"></i>
                          Répondre
                        </button>
                      </a>
                    </td>
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
