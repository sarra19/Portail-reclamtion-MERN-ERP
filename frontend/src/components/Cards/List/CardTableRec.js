import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import SummaryApi from "common";

// components


export default function CardTableRec({ color }) {
   const [allReclamation, setAllReclamation] = useState([]);
    const fetchAllReclamation = async () => {
      try {
        const response = await fetch(SummaryApi.getAllReclamation.url, {
          method: SummaryApi.getAllReclamation.method,
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const dataResponse = await response.json();
        console.log("Reclamation data:", dataResponse);
  
        if (Array.isArray(dataResponse) && dataResponse.length > 0) {
          setAllReclamation(dataResponse);
        } else {
          console.error("Aucune donnée de Reclamation disponible dans la réponse de l'API.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des Reclamations:", error);
      }
    };
  
    useEffect(() => {
      fetchAllReclamation();
    }, []);
  return (
    <>
     <div
        className={
          "animate-fade-down animate-once animate-duration-[2000ms]  animate-ease-in-out animate-fill-forwards relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +

          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                List des Réclamations
              </h3>
            </div>
            <a href="/admin/add-réclamation">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-vert-dys text-white active:bg-vert-dys text-xs font-bold uppercase px-3 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                <i className="fas fa-plus"></i>
                
              </button>
             
            </div>
            </a>
          </div>
        </div>
        <div className="w-full mx-auto items-center flex justify-start md:flex-nowrap flex-wrap md:px-10 px-4">
  <form className="mt-2 mb-2 flex flex-row flex-wrap items-center lg:ml-0">
    <div className="relative flex w-full flex-wrap items-stretch">
      <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
        <i className="fas fa-search text-blueGray-400"></i>
      </span>
      <input
        type="text"
        placeholder="Search here..."
        className="border-0 px-3 py-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
      />
    </div>
  </form>
</div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
              <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  date d'Envoi
                </th>
               
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Sujet de Réclamation
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Cible
                </th>
              

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  statut
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Actions
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {allReclamation.length > 0 ? (
                allReclamation.map((reclamation, index) => (
                  <tr key={index} className="border-t">
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {reclamation.CreatedAt}
                    </td>
                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {reclamation.Subject}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {reclamation.Name}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {reclamation.Status  ===  0
                        ? "En cours"
                        : reclamation.Status  ===  1
                          ? "Traitée"
                          : "Résolue"}                    </td>
                  

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex">
                        <a href={`/admin/modify-reclamation/${reclamation.id}`}>
                          <button className="bg-orange-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            <i className="fas fa-pen"></i>
                          </button>
                        </a>
                        <a href={`/admin/delete-users/${reclamation.id}`}>
                          <button className="bg-blueGray-dys-2 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            <i className="fas fa-trash"></i>
                          </button>
                        </a>
                        <a href={`/admin/details-reclamation/${reclamation.id}`}>
                          <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            <i className="fas fa-eye"></i>
                          </button>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    Aucune reclamation trouvée.
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

CardTableRec.defaultProps = {
  color: "light",
};

CardTableRec.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
