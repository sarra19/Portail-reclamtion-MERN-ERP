import React, { useState, useEffect } from "react";

import SummaryApi from '../common';

import Footer from "components/Footers/Footer.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import CardStats from "components/Cards/CardStats";
import HeaderAuth from "components/Header/HeaderAuth";
import { useSelector } from 'react-redux'

export default function Service() {
  const [allService, setAllService] = useState([]);
  const user = useSelector(state => state?.user?.user)

  useEffect(()=>{
  
        console.log(user)
    
},[user])
  const fetchAllService = async () => {
    try {
      const response = await fetch(SummaryApi.allService.url, {
        method: SummaryApi.allService.method,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const dataResponse = await response.json();
      console.log("Service data:", dataResponse); 

      if (Array.isArray(dataResponse) && dataResponse.length > 0) {
        setAllService(dataResponse); 
      } else {
        console.error("Aucune donnée de service disponible dans la réponse de l'API.");
      }

    } catch (error) {
      console.error("Erreur lors de la récupération des services:", error);
    }
  };

  useEffect(() => {
    fetchAllService();
  }, []);

 
  return (
    <>
      <HeaderAuth fixed />
      <IndexNavbar fixed />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <img
            alt="..."
            className="absolute top-0 w-full h-full bg-center bg-cover"
            src={require("assets/img/service.png")}
          />
          <span id="blackOverlay" className="w-full h-full absolute opacity-75"></span>
          <div className="container relative mx-auto animate-fade-down animate-once animate-duration-[2000ms] animate-ease-in-out animate-fill-forwards">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">Nos Services.</h1>
                  <p className="mt-4 text-lg text-blueGray-200">Votre succès est notre intégration.</p>
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
              <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>
        </div>

        <section className="pt-20 pb-20 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl text-black font-semibold">Transformez votre entreprise avec l'ERP intelligent</h2>
                <p className="text-lg leading-relaxed m-4 text-black">
                  Depuis plus de 15 ans, nous avons aidé de nombreuses entreprises à déployer et à optimiser leurs systèmes ERP.
                  Notre expertise couvre toutes les étapes de l'intégration, de l'analyse des besoins à la mise en œuvre et au support continu.
                  Nous nous engageons à fournir des solutions qui améliorent l'efficacité opérationnelle et favorisent la croissance..
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap p-4">
            {allService.length > 0 ? (
              allService.map((service, index) => (
                <div key={index} className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statTitle={service.Name} 
                    statDescripiron={service.Description} 
                    statImage={require(`assets/img/${service.Image}`)} 
                    id={service.No_}
                  />
                </div>
              ))
            ) : (
              <p className="text-center w-full">Chargement des services...</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
