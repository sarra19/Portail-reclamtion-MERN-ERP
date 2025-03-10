import React from "react";

export default function CardDétailsProduit() {
  const [showForm, setShowForm] = React.useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };
  const [rating, setRating] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleStarClick = (newRating) => {
    setRating(newRating);
  };


  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded w-11/12 md:w-11/12 lg:w-11/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Détails de Produit
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-bleu-dys ease-linear transition-all duration-150">
            <blockquote className="relative p-8 mb-4 flex items-center">
              <div className="text-section w-1/2">
                <h4 className="mt-2 font-bold text-white">Microsoft Power Platform</h4>
                <p className="mt-2 text-white">Description</p>
                <p className="mt-4 text-white ">Fournisseur: </p>
                <p className="text-white ">Prix: </p>


              </div>

              <div className="image-section ml-4 w-1/2">
                <img
                  alt="Utilisateur"
                  src={require("assets/img/power.jpg")}
                  className="w-full h-auto object-cover rounded-lg"  // Taille de l'image ajustée à w-full
                />
              </div>
            </blockquote>
          </div>
        </div>
        <div className="text-center flex justify-end">
          <a href="#!" onClick={handleButtonClick}>
            <button
              className="bg-orange-dys text-white font-bold uppercase text-sm px-4 py-2 mt-2 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
              type="button"
            >
              <i className="fas fa-pen mr-2"></i>
              Donner un avis
            </button>
          </a>
        </div>
        {showForm && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg animate-fade-in w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="mb-6 ">
                <label className="block text-sm font-medium text-gray-700 mb-2  flex justify-center">Note</label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`text-4xl transition-transform duration-200 ease-in-out transform hover:scale-110 active:scale-90 
        ${star <= rating ? 'text-yellow-400 drop-shadow-md' : 'text-gray-300'}
        hover:text-yellow-500`}
                      onClick={() => handleStarClick(star)}
                      aria-label={`Note ${star} étoiles`}
                    >
                      ★
                    </button>
                  ))}
                </div>

              </div>
              <div className="mb-6">
                
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-dys focus:border-orange-dys transition-all duration-300"
                  placeholder="Donnez votre avis sur le produit..."
                ></textarea>
              </div>


              <div className="text-center flex justify-end">
                <a href="/Envoyer-réclamation">
                  <button
                    className="text-center bg-orange-dys text-white font-bold uppercase text-sm px-4 py-2 mt-2 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                    type="submit"
                  >
                    Soumettre
                  </button>

                </a>
              </div>
            </form>

            {submitted && (
              <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
                Merci pour votre avis !
              </div>
            )}
          </div>
        )}

        <div className="rounded-t mb-0 px-4 mb-4 mt-4 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-500">
                Commentaires :
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
