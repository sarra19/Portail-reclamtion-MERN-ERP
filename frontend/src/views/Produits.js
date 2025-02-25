import Footer from "components/Footers/Footer.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import HeaderAuth from "components/Header/HeaderAuth";
import React, { useState, useEffect } from "react";
import SummaryApi from '../common';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";


export default function Produits() {
  const [allProduit, setAllProduit] = useState([]);


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


  const fetchAllProduit = async () => {
    try {
      const response = await fetch(SummaryApi.allProduit.url, {
        method: SummaryApi.allProduit.method,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const dataResponse = await response.json();
      console.log("Produit data:", dataResponse);

      if (Array.isArray(dataResponse) && dataResponse.length > 0) {
        setAllProduit(dataResponse);
      } else {
        console.error("Aucune donnée de Produit disponible dans la réponse de l'API.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des Produits:", error);
    }
  };

  const handleReclamerClick = async (produitNo, e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du lien

    try {

      if (!currentUser) {
        toast.error("Veuillez vous connecter...!");
        return;


      } else {
        console.log("Utilisateur connecté, redirection..."); // Log pour déboguer
        window.location.href = `/Envoyer-réclamation-produit/${produitNo}`; // Rediriger vers la page de réclamation
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'état de connexion :", error);
      toast.error("Une erreur s'est produite. Veuillez réessayer.", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    fetchAllProduit();
    fetchCurrentUser();

  }, []);
  return (
    <>
      <HeaderAuth fixed />
      <IndexNavbar fixed />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <ToastContainer position='top-center' />

          <img
            alt="..."
            className="absolute top-0 w-full h-full bg-center bg-cover"
            src={require("assets/img/service.png")}
          />
          <span id="blackOverlay" className="w-full h-full absolute opacity-75"></span>
          <div className="container relative mx-auto animate-fade-down animate-once animate-duration-[4000ms] animate-ease-in-out animate-fill-forwards">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">Nos Produits.</h1>
                  <p className="mt-4 text-lg text-blueGray-200">Votre succès est notre intégration.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="pb-20 pt-16 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap animate-fade-down animate-once animate-duration-[2000ms] animate-ease-in-out animate-fill-forwards">
              {allProduit.length > 0 ? (
                allProduit.map((produit, index) => (
                  <div key={index} className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg bg-bleu-dys ease-linear transition-all duration-150">
                      <img
                        alt={produit.Name}
                        src={require(`assets/img/${produit.Image}`)}
                        className="w-full align-middle"
                      />
                      {/* <img
                    alt="..."
                    src={require("assets/img/power.jpg")}
                    className="w-full align-middle"
                  /> */}
                      <blockquote className="relative p-8 mb-4">
                        <a href={`/détails-produit/${produit.No_}`}>
                          <h4 className="text-xl font-bold text-white cursor-pointer">{produit.Name}</h4>
                        </a>
                        <a
                          href={`/détails-produit/${produit.No_}`}
                          className="mt-4 flex justify-end font-bold text-white text-sm hover:text-white ease-linear transition-all duration-150"
                        >
                          En Savoir plus <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
                        </a>
                        {currentUser?.Role !== 0 ? (
                          <div
                            className="flex justify-center font-bold mt-4 px-12 py-3 text-white bg-orange-dys shadow hover:bg-orange-600 active:bg-orange-700 transition duration-150 ease-in-out cursor-pointer"
                            onClick={(e) => handleReclamerClick(produit.No_, e)}
                          >
                            <button className="w-full h-full font-bold focus:outline-none">
                              Réclamer le produit
                            </button>
                          </div>
                        ) : (
                          <div
                            className="flex justify-center font-bold mt-4 px-12 py-3 text-white bg-orange-dys shadow hover:bg-orange-600 active:bg-orange-700 transition duration-150 ease-in-out cursor-pointer"
                            onClick={(e) => handleReclamerClick(produit.No_, e)}
                          >
                            <button className="w-full h-full font-bold focus:outline-none">
                              Réclamer le fournisseur
                            </button>
                          </div>
                        )}


                      </blockquote>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 w-full">Aucun produit disponible.</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
