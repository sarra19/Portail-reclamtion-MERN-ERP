import SummaryApi from "common";
import React, { useState, useEffect } from "react";

export default function CardAddReponse() {
  const [services, setServices] = useState({
    remboursement: false,
    intervention: false,
  });

  const [formData, setFormData] = useState({
    Subject: "",
    AttachedFile: "",
    Content: "",
    ReclamationId: "",
    ServiceSup: 0, // 0: Aucun, 1: Remboursement, 2: Intervention
    Montant: 0,
    DatePrevu: "",
    DatePrevuInterv: "",
    TechnicienResponsable: "",
  });

  // Synchroniser ServiceSup avec les cases à cocher
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ServiceSup: services.remboursement ? 1 : services.intervention ? 2 : 0,
    }));
  }, [services.remboursement, services.intervention]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setServices((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      AttachedFile: event.target.files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataToSend = {
        Subject: formData.Subject,
        AttachedFile: formData.AttachedFile,
        Content: formData.Content,
        ReclamationId: formData.ReclamationId,
        ServiceSup: services.remboursement ? "remboursement" : services.intervention ? "intervention" : "0",
        Montant: formData.Montant,
        DatePrevu: formData.DatePrevu,
        TechnicienResponsable: formData.TechnicienResponsable,
        DatePrevuInterv: formData.DatePrevuInterv,
    };

    console.log("Données envoyées :", dataToSend); // Vérifiez les données ici

    try {
        const response = await fetch(SummaryApi.AddReclamation.url, {
            method: SummaryApi.AddReclamation.method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        });

        const result = await response.json();
        if (response.ok) {
            alert("Réponse ajoutée avec succès !");
        } else {
            alert(`Erreur : ${result.message}`);
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi des données :", error);
        alert("Une erreur s'est produite lors de l'envoi des données.");
    }
};
  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <h6 className="text-blueGray-700 text-xl mt-12 font-bold flex justify-center">
          <i className="fas fa-paper-plane mr-2"></i>
          Répondre à la réclamation
        </h6>

        <form onSubmit={handleSubmit}>
          <h6 className="text-blueGray-400 text-sm mt-6 mb-6 font-bold uppercase">
            Saisir votre réponse
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Sujet de réclamation
                </label>
                <input
                  type="text"
                  name="Subject"
                  value={formData.Subject}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  required
                />
              </div>
            </div>

            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Insérer une pièce jointe
                </label>
                <input
                  type="file"
                  name="AttachedFile"
                  onChange={handleFileChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Réponse
                </label>
                <textarea
                  name="Content"
                  value={formData.Content}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  rows="4"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Services Supplémentaires
              </label>
              <div className="flex flex-col space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value="remboursement"
                    checked={services.remboursement}
                    onChange={handleCheckboxChange}
                    className="form-checkbox border-0 text-blueGray-600 bg-white rounded shadow focus:ring ease-linear transition-all duration-150"
                  />
                  <span className="ml-2 text-blueGray-600 text-sm">
                    Remboursement
                  </span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value="intervention"
                    checked={services.intervention}
                    onChange={handleCheckboxChange}
                    className="form-checkbox border-0 text-blueGray-600 bg-white rounded shadow focus:ring ease-linear transition-all duration-150"
                  />
                  <span className="ml-2 text-blueGray-600 text-sm">
                    Intervention
                  </span>
                </label>
              </div>
            </div>
          </div>

          {services.remboursement && (
            <>
              <hr className="mt-6 border-b-1 border-blueGray-300 mb-6" />
              <h6 className="text-blueGray-400 text-sm mt-6 mb-6 font-bold uppercase">
                Envoyer un remboursement
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Montant
                    </label>
                    <input
                      type="number"
                      name="Montant"
                      value={formData.Montant}
                      onChange={handleInputChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      required
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Date prévue de Remboursement
                    </label>
                    <input
                      type="date"
                      name="DatePrevu"
                      value={formData.DatePrevu}
                      onChange={handleInputChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      required
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {services.intervention && (
            <>
              <hr className="mt-6 border-b-1 border-blueGray-300 mb-6" />
              <h6 className="text-blueGray-400 text-sm mt-6 mb-6 font-bold uppercase">
                Ajouter une intervention
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Date prévue d'Intervention
                    </label>
                    <input
                      type="date"
                      name="DatePrevuInterv"
                      value={formData.DatePrevuInterv}
                      onChange={handleInputChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      required
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Technicien responsable
                    </label>
                    <input
                      type="text"
                      name="TechnicienResponsable"
                      value={formData.TechnicienResponsable}
                      onChange={handleInputChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      required
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-end">
              <button
                type="submit"
                className="bg-orange-dys text-white active:bg-orange-dys font-bold uppercase text-xs px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              >
                <i className="fas fa-plus mr-2"></i>
                Ajouter
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}