import React from "react";


export default function CardDétailsRemb() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded w-10/12 md:w-6/12 lg:w-6/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Détails de Remboursement
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-orange-dys ease-linear transition-all duration-150">
            <img
              alt="..."
              src={require("assets/img/remb.jpg")}
              className="w-full align-middle rounded-t-lg"
            />
            <blockquote className="relative p-8 mb-4">
              <svg
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 583 95"
                className="absolute left-0 w-full block h-95-px -top-94-px"
              >
                <polygon
                  points="-30,95 583,95 583,65"
                  className="text-orange-dys fill-current"
                ></polygon>
              </svg>
              <h4 className="text-xl font-bold text-white text-center">
                Sujet de Réclamation 
              </h4>
              <h4 className="mt-2 font-bold text-white">
                Montant de Remboursement :
              </h4>
              <h4 className=" mt-2 font-bold text-white">
                Date de Remboursement :
              </h4>
              <h4 className="mt-2 font-bold text-white">
                Bénéficiaire :
              </h4>
              <h4 className=" mt-2 font-bold text-white">
                Statut : 
              </h4>
         
             
             
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
}
