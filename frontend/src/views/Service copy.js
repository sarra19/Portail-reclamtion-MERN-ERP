import React from "react";
import { Link } from "react-router-dom";

// components

import Footer from "components/Footers/Footer.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import HeaderAuth from "components/Header/HeaderAuth";

export default function Service() {
  return (
    <>
        <HeaderAuth fixed />
      <IndexNavbar  />
      <main>
        <div className="relative  pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <img
            alt="..."
            className="absolute top-0 w-full h-full bg-center bg-cover"
            src={require("assets/img/service.png")}
          />
          {/* <div className="absolute top-0 right-0">
            <img
              alt="..."
              src={require("assets/img/breadcrumb-shape2.png")}
            />
          </div> */}



          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-75 "
          ></span>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Nos Services.
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    Votre succès est notre intégration.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
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
        </div>

        <section className="pt-20 pb-20  bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4 ">
                <h2 className="text-4xl  text-black font-semibold">Transformez votre entreprise avec l'ERP intelligent</h2>
                <p className="text-lg leading-relaxed m-4 text-black">
                  Depuis plus de 15 ans, nous avons aidé de nombreuses entreprises à déployer et à optimiser leurs systèmes ERP. Notre expertise couvre toutes les étapes de l'intégration, de l'analyse des besoins à la mise en œuvre et au support continu. Nous nous engageons à fournir des solutions qui améliorent l'efficacité opérationnelle et favorisent la croissance..
                </p>
              </div>
            </div>

          </div>
        </section>
        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                  <div className="px-4 py-5 flex-auto">
                    <img
                      src={statImage} 
                      alt="Stat Icon"
                      className="rounded-full w-full h-full"
                    />

                    <a
                      href="/Envoyer-réclamation"
                      className="inline-block font-semibold mt-4  px-12 py-3 text-white bg-orange-dys  shadow hover:bg-orange-600 transition duration-150 ease-in-out"
                    >
                      Conseil stratégique        </a>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                  <div className="px-4 py-5 flex-auto">
                    <img
                      alt="..."
                      src={require("assets/img/Erp.png")}
                      className="max-w-full  "
                    />
                    <a
                      href="Envoyer-réclamation"
                      className="inline-block font-semibold mt-4  px-12 py-3 text-white bg-orange-dys  shadow hover:bg-orange-600 transition duration-150 ease-in-out"
                    >
                      Intégration de solutions ERP        </a>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                  <div className="px-4 py-5 flex-auto">
                    <img
                      alt="..."
                      src={require("assets/img/Form.png")}
                      className="max-w-full  "
                    />
                    <a
                      href="Envoyer-réclamation"
                      className="inline-block font-semibold mt-4  px-12 py-3 text-white bg-orange-dys  shadow hover:bg-orange-600 transition duration-150 ease-in-out"
                    >
                      Formation et assistance technique        </a>
                  </div>
                </div>
              </div>

              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                  <div className="px-4 py-5 flex-auto">
                    <img
                      alt="..."
                      src={require("assets/img/audit.jpg")}
                      className="max-w-full  "
                    />
                    <a
                      href="Envoyer-réclamation"
                      className="inline-block font-semibold mt-4  px-12 py-3 text-white bg-orange-dys  shadow hover:bg-orange-600 transition duration-150 ease-in-out"
                    >
                      Missions d'audit         </a>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                  <div className="px-4 py-5 flex-auto">
                    <img
                      alt="..."
                      src={require("assets/img/maintenance.jpg")}
                      className="max-w-full  "
                    />
                    <a
                      href="Envoyer-réclamation"
                      className="inline-block font-semibold mt-4  px-12 py-3 text-white bg-orange-dys  shadow hover:bg-orange-600 transition duration-150 ease-in-out"
                    >
                      Support et maintenance        </a>
                  </div>
                </div>
              </div>

              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                  <div className="px-4 py-5 flex-auto">
                    <img
                      alt="..."
                      src={require("assets/img/solution.jpg")}
                      className="max-w-full  "
                    />
                    <a
                      href="/Envoyer-réclamation"
                      className="inline-block font-semibold mt-4  px-12 py-3 text-white bg-orange-dys  shadow hover:bg-orange-600 transition duration-150 ease-in-out"
                    >
                      Solutions collaboratives        </a>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </section>





      </main >
      <Footer />
    </>
  );
}
