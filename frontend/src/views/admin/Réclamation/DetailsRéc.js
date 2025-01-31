import CardDétailsReclamtionAdmin from "components/Cards/Détails/CardDétailsReclamtionAdmin";
import React from "react";

// components


export default function DetailsRéc() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
            <CardDétailsReclamtionAdmin/>

          {/* affichage réponse  + bouton add interv + add remboursement*/}
        </div>
      </div>
    </>
  );
}
