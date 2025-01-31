import React from "react";

export default function CardDétailsHistorique() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded w-10/12 md:w-6/12 lg:w-6/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Historique d'utilisateur
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-bleu-dys ease-linear transition-all duration-150">
            <blockquote className="relative p-8 mb-4 flex items-center">
              <div className="text-section w-1/2">
                <p className="mt-2 text-white">Nom d'utilisateur</p>
                <h4 className="mt-2 font-bold text-white">Nom d'Activité :</h4>
                <p className="mt-2 text-white">Description</p>
                <p className="mt-4 text-white ">Fait le : </p>

              </div>

              <div className="image-section ml-4 w-1/2">
                <img
                  alt="Utilisateur"
                  src={require("assets/img/user.jpg")}
                  className="w-full h-auto object-cover rounded-lg"  // Taille de l'image ajustée à w-full
                />
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
}
