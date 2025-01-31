import React from "react";
import { createPopper } from "@popperjs/core";

const Popover = ({ text, title }) => {
  const [popoverShow, setPopoverShow] = React.useState(false);
  const btnRef = React.createRef();
  const popoverRef = React.createRef();
  
  const openTooltip = () => {
    createPopper(btnRef.current, popoverRef.current, {
      placement: "bottom"
    });
    setPopoverShow(true);
  };
  
  const closeTooltip = () => {
    setPopoverShow(false);
  };
  
  return (
    <>
      <span
        className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-lightBlue-600 bg-lightBlue-200 last:mr-0 mr-1 cursor-pointer"
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
        ref={btnRef}
      >
        {title}
      </span>
      <div
        className={
          (popoverShow ? "" : "hidden ") +
          "bg-white text-xs font-semibold inline-block  px-2 rounded text-lightBlue-600  last:mr-0 mr-1 cursor-pointer"
        }
        ref={popoverRef}
      >
        <div>
         
          <div className="text-lightBlue-600 font-normal leading-normal text-sm max-w-xs p-3">{text}</div>
        </div>
      </div>
    </>
  );
};

export default function CardDétailsReclamtion() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-orange-dys w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h2 className=" bg-orange-dys mt-4 mb-2 text-center font-semibold text-base text-white">
                Détails de Réclamation
              </h2>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-bleu-dys ease-linear transition-all duration-150">
        
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
              <p className="text-md font-light mt-2 text-white text-center">
              Service/Produit
              </p>
              <h4 className=" mt-2 font-bold text-white">
                Nom de Client : 
              </h4>
              <p className="text-md font-light mt-2 text-white">
            Text de réclamation
              </p>
              <h4 className=" mt-2 font-bold text-white">
                Statut :
              </h4>
              <h6 className=" mt-2 font-bold text-white">
                ~ fichier jointe ~
              </h6>
              <p className=" mt-2 text-sm font-light mt-2 text-white text-right">
                Envoyé le :
              </p>
             
              
              <h5 className="font-bold text-white">Réponse</h5>
              <p className="text-md font-light mt-2 text-white">
                Connectez la finance, les ventes, les services et les opérations avec une solution approuvée par plus de 30 000 petites et moyennes entreprises.Connectez votre entreprise.
              </p>
              <h5 className="mt-2 mb-2 text-white"> Services supplémentaires : </h5>

              <Popover
                title="Remboursement"
                text="détails remboursement "
              />
              <Popover
                title="Intervention"
                text="détails intervention "
              />
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
}
