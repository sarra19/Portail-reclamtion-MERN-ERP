import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="relative bg-dark pt-8 pb-6">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto ">
          <div className="flex flex-wrap text-center lg:text-left">
            <div className="w-full lg:w-6/12 pb-4 ">
              <h4 className="text-3xl font-semibold">Prenez contact avec nous!</h4>
              <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                veuillez nous contacter par :
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">
                <button
                  className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="fab fa-linkedin"></i>
                </button>
                <button
                  className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="fab fa-facebook-square"></i>
                </button>
                <button
                  className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
<i className="fas fa-globe"></i>
</button>
              
              </div>
            </div>
            <div className="w-full lg:w-6/12">
  <div className="flex flex-wrap items-top mb-6">
    <div className="w-full lg:w-2/12  ml-auto">
     
      <ul className="list-unstyled">
        <li>
          <a
            className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
          >
            <i className="fas fa-map-marker-alt mr-2"></i> {/* Icône de localisation */}
            Pôle Industriel EL Azib Bizerte-Tunisie
          </a>
        </li>
      </ul>
    </div>

    <div className="w-full lg:w-2/12 ">
      
      <ul className="list-unstyled">
        <li>
          <a
            className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
          >
            <i className="fas fa-phone-alt mr-2"></i> {/* Icône de téléphone */}
            +216 98 134 844 - 70 293 711
          </a>
        </li>
        <li>
          <a
            className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
            href="mailto:info@dynamix-services.com"
          >
            <i className="fas fa-envelope mr-2"></i> {/* Icône de mail */}
            info@dynamix-services.com
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>

          </div>
          <div className="relative bg-orange-dys pt-8 pb-6">
            <div className="flex flex-wrap  items-center md:justify-between justify-center">
              <div className="w-full md:w-4/12  mx-auto text-center">
                <div className="text-sm text-white font-semibold py-1">
                  Copyright © {new Date().getFullYear()} Dynamix Services. Tous droits réservés.

                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
