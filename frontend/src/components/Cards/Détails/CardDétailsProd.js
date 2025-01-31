export default function CardDétailsProd() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded w-10/12 md:w-6/12 lg:w-6/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Détails de Produit
              </h3>
            </div>
          </div>
        </div>
        
                <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg bg-bleu-dys ease-linear transition-all duration-150">
                  <img
                    alt="..."
                    src={require("assets/img/power.jpg")}
                    className="w-full align-middle"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <h4
                      className="text-xl font-bold text-white cursor-pointer"
                      
                    >
                      Microsoft Power Platform
                    </h4>
                    <p className="text-white">Description</p>
                    <h5
                      className="mt-2 font-bold text-white cursor-pointer"
                      
                    >
                      Fournisseur:
                    </h5>
                    <h5
                      className="mt-2 font-bold text-white cursor-pointer"
                      
                    >
                      Prix:
                    </h5>
                  </blockquote>
                 
                </div>
              </div>
    </>
  );
}
