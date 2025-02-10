import React, { useState, useEffect } from "react";
import SummaryApi from '../../../common';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CardAddRecProd() {
  const [typeReclamation, setTypeReclamation] = useState("textuelle");
  const { id } = useParams();
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null); 
  const [data, setData] = useState({
    nom: "",
    typeCible: "",
    sujet: "",
    typeReclamation: "textuelle",
    fichierJoint: null,
    contenu: "",
    vocal: null,
  });


  const handleReclamationTypeChange = (event) => {
    const selectedType = event.target.value;
    setTypeReclamation(selectedType);
    setData((prev) => ({ ...prev, typeReclamation: selectedType }));
  };

  const allowedFileTypes = {
    vocal: ["audio/mp3", "audio/mpeg"],
    fichierJoint: ["application/pdf", "image/png", "image/jpeg"],
  };
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);

      const audioChunks = [];
      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: "audio/mpeg" });
        setAudioBlob(blob);
      };
    } catch (error) {
      console.error("Erreur lors du démarrage de l'enregistrement :", error);
      toast.error("Impossible d'accéder au micro.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom', data.nom);
    formData.append('typeCible', data.typeCible);
    formData.append('sujet', data.sujet);
    formData.append('typeReclamation', data.typeReclamation);
    formData.append('contenu', data.contenu);

    if (audioBlob) {
      const audioFile = new File([audioBlob], "recording.mp3", { type: "audio/mpeg" });
      formData.append("vocal", audioFile);
    }

    if (data.fichierJoint) {
      formData.append("fichierJoint", data.fichierJoint);
  }

    const response = await fetch(SummaryApi.AddReclamation.url, {
      method: SummaryApi.AddReclamation.method,
      credentials: "include",
      body: formData,
    });
    const result = await response.json();
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleOnChange = (e) => {
    const { name, type, files } = e.target;
    if (type === "file") {
        const file = files[0];
        if (file && allowedFileTypes[name].includes(file.type)) {
            setData((prev) => ({ ...prev, [name]: file }));
        } else {
            toast.error("Format de fichier non accepté");
        }
    } else {
        setData((prev) => ({ ...prev, [name]: e.target.value }));
    }
};



  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`${SummaryApi.produitDetails.url}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const dataResponse = await response.json();
        if (dataResponse?.data) {
          setData((prev) => ({
            ...prev,
            typeCible: "Produit",
            nom: dataResponse.data.nom,  // Set the name here
          }));
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchServiceDetails();
  }, [id]);



  return (
    <>
      <ToastContainer position='top-center' />

      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Saisir votre Réclamation</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="nom-cible"
                  >
                    Type de Cible
                  </label>
                  <select
                    id="nom-cible"
                    value={data.typeCible}
                    disabled
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="Produit">Produit</option>
                    <option value="Service">Service</option>
                  </select>
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="nom-cible"
                  >
                    Nom de Cible
                  </label>
                  <input
                    type="text"
                    id="cible"
                    value={data.nom}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="sujet"
                  >
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="sujet"
                    name="sujet"
                    onChange={handleOnChange}
                    value={data.sujet}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Mauvaise qualité..."
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Type de Réclamation
                  </label>
                  <select
                    value={typeReclamation}
                    onChange={handleReclamationTypeChange}
                    className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                  >
                    <option value="textuelle">Textuelle</option>
                    <option value="vocal">Vocal</option>
                  </select>
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="document"
                  >
                    Envoyer un document
                  </label>
                  <input
                    type="file"
                    id="document"
                    name="fichierJoint"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleOnChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300 mb-6" />

            <div className="flex flex-wrap">
              {typeReclamation === "textuelle" ? (
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <textarea
                      id="contenu"
                      value={data.contenu}
                      name="contenu"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      onChange={handleOnChange}
                      placeholder="Je me permets de vous contacter pour exprimer mon mécontentement concernant..."
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              ) : (
                <div className="w-full lg:w-12/12 px-4 flex flex-col items-center">
                  <div className="relative w-full mb-3 text-center">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Enregistrement Vocal
                    </label>
                    <button
                      type="button"
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`text-black font-bold px-6 py-3 rounded-full shadow-lg transition-all 
                      ${isRecording ? "bg-red-600" : "bg-orange-dys"} hover:opacity-80`}
                    >
                      <i className="fas fa-microphone text-white text-lg"></i>
                    </button>
                    {data.vocal && (
                      <p className="mt-2 text-green-600 font-semibold">Audio enregistré !</p>
                    )}
                    {audioBlob && (
                      <audio controls src={URL.createObjectURL(audioBlob)} className="mt-3 w-full max-w-xs" />
                    )}
                  </div>
                </div>

              )}
            </div>

            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-end">
                <button
                  className="bg-orange-dys text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  Envoyer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
