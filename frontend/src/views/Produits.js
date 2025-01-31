import Footer from "components/Footers/Footer.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import HeaderAuth from "components/Header/HeaderAuth";

export default function Produits() {
 

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
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-75"
          ></span>
          <div className="container relative mx-auto animate-fade-down animate-once animate-duration-[4000ms]  animate-ease-in-out animate-fill-forwards">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Nos Produits.
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    Votre succès est notre intégration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="pb-20 pt-16 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap animate-fade-down animate-once animate-duration-[2000ms]  animate-ease-in-out animate-fill-forwards">


              <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32 ">
                <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg bg-bleu-dys ease-linear transition-all duration-150">
                  <img
                    alt="..."
                    src={require("assets/img/power.jpg")}
                    className="w-full align-middle"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <a href="/détails-produit">
                    <h4
                     
                      className="text-xl font-bold text-white cursor-pointer"
                      
                    >
                      Microsoft Power Platform
                    </h4>
                    </a>
                    <a
                href="/détails-produit"
                target="_blank"
                className="mt-4 flex justify-end font-bold text-white text-sm hover:text-white ease-linear transition-all duration-150"
              >
                En Savoir plus{" "}
                <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
              </a>
                    <a
                      href="/Envoyer-réclamation"
                      className="flex justify-center inline-block font-semibold mt-4 px-12 py-3 text-white bg-orange-dys shadow hover:bg-orange-600 transition duration-150 ease-in-out"
                    >
                      Réclamer
                    </a>
                  </blockquote>
                
                </div>
              </div>
              <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
                <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg bg-bleu-dys ease-linear transition-all duration-150">
                  <img
                    alt="..."
                    src={require("assets/img/BC2.jpg")}
                    className="w-full align-middle"
                  />
                  <blockquote className="relative p-8 mb-4">
                  <a href="/détails-produit">
                    <h4
                      
                      className="text-xl font-bold text-white cursor-pointer"
                     
                    >
                      Microsoft Dynamics 365 Business Central
                    </h4>
                    </a>
                    <a
                href="/détails-produit"
                target="_blank"
                className="mt-4 flex justify-end font-bold text-white text-sm hover:text-white ease-linear transition-all duration-150"
              >
                En Savoir plus{" "}
                <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
              </a>
                    <a
                      href="/Envoyer-réclamation"
                      className="flex justify-center inline-block font-semibold mt-4 px-12 py-3 text-white bg-orange-dys shadow hover:bg-orange-600 transition duration-150 ease-in-out"
                    >
                      Réclamer
                    </a>
                  </blockquote>
                  
                </div>
              </div>
              <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
                <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg bg-bleu-dys ease-linear transition-all duration-150">
                  <img
                    alt="..."
                    src={require("assets/img/dev.jpg")}
                    className="w-full align-middle"
                  />
                  <blockquote className="relative p-8 mb-4">
                  <a href="/détails-produit">
                    <h4
                     
                      className="text-xl font-bold text-white cursor-pointer"
                     
                    >
                      Développement Spécifique
                    </h4>
                    </a>
                    <a
                href="/détails-produit"
                target="_blank"
                className="mt-4 flex justify-end font-bold text-white text-sm hover:text-white ease-linear transition-all duration-150"
              >
                En Savoir plus{" "}
                <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
              </a>
                    <a
                      href="/Envoyer-réclamation"
                      className="flex justify-center inline-block font-semibold mt-4 px-12 py-3 text-white bg-orange-dys shadow hover:bg-orange-600 transition duration-150 ease-in-out"
                    >
                      Réclamer
                    </a>

                  </blockquote>
             
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
