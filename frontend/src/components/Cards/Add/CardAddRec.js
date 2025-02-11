import React, { useState, useEffect } from "react";
import SummaryApi from '../../../common';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uploadFile from '../../../helpers/uploadFile';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DisplayImage from "helpers/DisplayImage";

export default function CardAddRec() {
    const [typeReclamation, setTypeReclamation] = useState("textuelle");
    const { id } = useParams();
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");
    const [data, setData] = useState({
        nom: "",
        typeCible: "Service",
        sujet: "",
        typeReclamation: "textuelle",
        fichierJoint: [],
        contenu: "",
        vocal: null,
    });

    const handleReclamationTypeChange = (event) => {
        const selectedType = event.target.value;
        setTypeReclamation(selectedType);
        setData((prev) => ({ ...prev, typeReclamation: selectedType }));
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
                setData((prev) => ({ ...prev, vocal: blob })); 
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

        try {
            const formData = {
                nom: data.nom,
                typeCible: data.typeCible,
                sujet: data.sujet,
                typeReclamation: data.typeReclamation,
                contenu: data.contenu,
                vocal: null,
                fichierJoint: [],
            };

            if (audioBlob) {
                const audioFile = new File([audioBlob], "recording.mp3", { type: "audio/mpeg" });
                const audioUploadResponse = await uploadFile(audioFile);
                formData.vocal = audioUploadResponse.url; 
            }

            if (data.fichierJoint.length > 0) {
                for (const file of data.fichierJoint) {
                    const fileUploadResponse = await uploadFile(file);
                    formData.fichierJoint.push(fileUploadResponse.url); 
                }
            }

            const response = await fetch(SummaryApi.AddReclamation.url, {
                method: SummaryApi.AddReclamation.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error("Error during reclamation submission:", error);
            toast.error("An error occurred while submitting the reclamation.");
        }
    };

    const handleUploadFile = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            toast.error("No file selected.");
            return;
        }

        const allowedTypes = [
          "image/jpeg", 
          "image/png", 
          "image/gif", 
          "application/pdf",       
          "application/msword",    
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // DOCX files
      ];        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
            toast.error("Invalid file type. Please upload an image (JPEG, PNG, GIF,PDF,DOC,DOCX).");
            return;
        }

        if (file.size > maxSize) {
            toast.error("File size exceeds the limit of 5MB.");
            return;
        }

        setData((prev) => ({
            ...prev,
            fichierJoint: [...prev.fichierJoint, file],
        }));
        toast.success("File selected successfully!");
    };

    const handleDeleteImage = (index) => {
        const newImage = [...data.fichierJoint];
        newImage.splice(index, 1);

        setData((prev) => ({
            ...prev,
            fichierJoint: [...newImage]
        }));
    };

    useEffect(() => {
        const fetchServiceDetails = async () => {
            try {
                const response = await fetch(`${SummaryApi.serviceDetails.url}/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const dataResponse = await response.json();
                if (dataResponse?.data) {
                    setData((prev) => ({
                        ...prev,
                        typeCible: "Service",  
                        nom: dataResponse.data.nom,  
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
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="nom-cible">
                                        Type de Cible
                                    </label>
                                    <select
                                        id="typeCible"
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
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="nom-cible">
                                        Nom de Cible
                                    </label>
                                    <input
                                        type="text"
                                        id="nom"
                                        value={data.nom}
                                        readOnly
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="sujet">
                                        Sujet
                                    </label>
                                    <input
                                        type="text"
                                        id="sujet"
                                        name="sujet"
                                        onChange={(e) => setData((prev) => ({ ...prev, sujet: e.target.value }))}
                                        value={data.sujet}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Mauvaise qualité..."
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Type de Réclamation</label>
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
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label htmlFor='productImage' className='mt-3'>Document :</label>
                                    <label htmlFor='uploadImageInput'>
                                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                                <p className='text-sm'>Importer votre fichier</p>
                                                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadFile} />
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <div>
                                {data.fichierJoint.length > 0 ? (
        <div className='flex items-center gap-2'>
            {data.fichierJoint.map((el, index) => {
                const isDocument = [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                ].includes(el.type);
                
                const defaultDocImage = require("assets/img/file.png"); 

                return (
                    <div className='relative group' key={index}>
                        <img
                            src={isDocument ? defaultDocImage : URL.createObjectURL(el)} 
                            alt={el.name}
                            width={80}
                            height={80}
                            className='bg-slate-100 border cursor-pointer'
                            onClick={() => {
                                setOpenFullScreenImage(true);
                                setFullScreenImage(isDocument ? defaultDocImage : URL.createObjectURL(el));
                            }}
                        />
                        <p>{el.name}</p>
                        <div className='absolute bottom-0 right-0 p-1 text-white bg-pink-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteImage(index)}>
                            <MdDelete />
                        </div>
                    </div>
                );
            })}
        </div>
    ) : (
        <p className='text-pink-600 text-xs'>*Importer voter fichier</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300 mb-6" />

                        <div className="flex flex-wrap">
                            {typeReclamation === "textuelle" ? (
                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="description">
                                            Description
                                        </label>
                                        <textarea
                                            id="contenu"
                                            value={data.contenu}
                                            name="contenu"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(e) => setData((prev) => ({ ...prev, contenu: e.target.value }))}
                                            placeholder="Je me permets de vous contacter pour exprimer mon mécontentement concernant..."
                                            rows="4"
                                        ></textarea>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full lg:w-12/12 px-4 flex flex-col items-center">
                                    <div className="relative w-full mb-3 text-center">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Enregistrement Vocal</label>
                                        <button
                                            type="button"
                                            onClick={isRecording ? stopRecording : startRecording}
                                            className={`text-black font-bold px-6 py-3 rounded-full shadow-lg transition-all ${isRecording ? "bg-red-600" : "bg-orange-dys"} hover:opacity-80`}
                                        >
                                            <i className="fas fa-microphone text-white text-lg"></i>
                                        </button>
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
                    {openFullScreenImage && (
                        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
                    )}
                </div>
            </div>
        </>
    );
}