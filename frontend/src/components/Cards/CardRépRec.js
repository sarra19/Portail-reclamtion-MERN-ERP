import SummaryApi from "common";
import uploadFile from "helpers/uploadFile";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from 'react-router-dom';

export default function CardRépRec() {
  const [services, setServices] = useState({
    intervention: false,
    remboursement: false,
  });


  const [error, setErrors] = useState({});
  const { id } = useParams();

  const [data, setData] = useState({
    Subject: "",
    AttachedFile: "",
    Content: "",
    ServiceSup: 0,
    ReclamationId: "",
    UserId:"",
    FirstName:"",
    LastName:"",

  });
 

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setServices((prev) => ({
      ...prev,
      [value]: checked,
    }));
    const selectedService = event.target.value;
    setData((prev) => ({ ...prev, ServiceSup: selectedService }));
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
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
    ]; const maxSize = 5 * 1024 * 1024; // 5MB

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
        AttachedFile: [...prev.AttachedFile, file],
    }));
    toast.success("File selected successfully!");
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.AttachedFile.length > 0) {
      const fileUrls = [];
      for (const file of data.AttachedFile) {
          const fileUploadResponse = await uploadFile(file);
          fileUrls.push(fileUploadResponse.url);
      }
      data.AttachedFile = fileUrls.join(","); 
  }


    try {
      const dataResponse = await fetch(SummaryApi.addReponse.url, {
        method: SummaryApi.addReponse.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          ...data,

          ReclamationId: id,
        }),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);

      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error('An error occurred during login.');
    }
  };
  useEffect(() => {
  const detailsReclamation = async () => {
    try {
      const response = await fetch(`${SummaryApi.detailsReclamation.url}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataResponse = await response.json();
      console.log("details: ", dataResponse);
      if (dataResponse?.data) {
        setData((prev) => ({
          ...prev,
          UserId: dataResponse.data.UserId,
        }));
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
    }
  };

  detailsReclamation();
}, [id]);

useEffect(() => {
  const detailsReclamation = async () => {
    try {
      const response = await fetch(`${SummaryApi.detailsReclamation.url}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataResponse = await response.json();
      console.log("details: ", dataResponse);
      if (dataResponse?.data) {
        setData((prev) => ({
          ...prev,
          UserId: dataResponse.data.UserId,
        }));
      }

      if (dataResponse?.data?.UserId) {
console.log("userId data :", dataResponse.data.UserId)
        const userResponse = await fetch(`${SummaryApi.getUser.url}/${dataResponse.data.UserId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await userResponse.json();
        console.log("user details: ", data);
        if (data) {
          setData((prev) => ({
            ...prev,
            FirstName: data.FirstName,
            LastName: data.LastName,
          }));
        }
        console.log("lastName:",data.LastName)
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
    }
  };

  detailsReclamation();
}, [id]);


  return (
    <>

<ToastContainer position='top-center' />

<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
    <h6 className="text-blueGray-700 text-xl mt-12 font-bold flex justify-center">

      Répondre au réclamation de {data.FirstName} {data.LastName}
    </h6>

    <form onSubmit={handleSubmit}>
      <h6 className="text-blueGray-400 text-sm mt-6 mb-6 font-bold uppercase">
        saisir votre réponse
      </h6>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Sujet de réclamation
            </label>
            <input
              type="text"
              name='Subject'
              value={data.Subject}
              onChange={handleOnChange}
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="sujet de réclamation"
            />
          </div>
        </div>

        <div className="w-full lg:w-12/12 px-4">
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Insérer une pièce jointe
            </label>
             <label htmlFor='uploadImageInput'>
                                                    <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                                                        <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                                            <span className='text-4xl'><FaCloudUploadAlt /></span>
                                                            <p className='text-sm'>Importer votre fichier</p>
                                                            <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadFile} />
                                                        </div>
                                                    </div>
                                                </label>
             <div>
                                               {data.AttachedFile.length > 0 ? (
                                                   <div className='flex items-center gap-2'>
                                                       {data.AttachedFile.map((el, index) => {
                                                          
           
           
                                                           return (
                                                               <div className='relative group' key={index}>
                                                                   <img
                                                                       src={URL.createObjectURL(el)}
                                                                       alt={el.name}
                                                                       width={80}
                                                                       height={80}
                                                                       className='bg-slate-100 border cursor-pointer'
                                                                      
                                                                   />
                                                                   <p>{el.name}</p>
                                                                  
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
      </div>

      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Réponse
            </label>
            <textarea
              type="text"
              name='Content'
              value={data.Content}
              onChange={handleOnChange}
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Contenu de réponse..."
              rows="4"
            ></textarea>
          </div>
        </div>
      </div>


            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="services-supplimentaires"
                >
                  Services Supplémentaires
                </label>

                <div
                  id="services-supplimentaires"
                  className="flex flex-col space-y-2"
                >

                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value="remboursement"
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
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Montant
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Date prévu de Remboursement
                      </label>
                      <input
                        type="date"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>

                  {/* reclamation.user */}
                  {/* <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Bénéficiaire
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="Nom de client"
                      />
                    </div>
                  </div> */}
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
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Date prévu d'Intervention
                      </label>
                      <input
                        type="date"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Technicien responsable
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Nom de technicien"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="text-center flex justify-end ">
                <button
                  className="bg-orange-dys text-white active:bg-orange-dys font-bold uppercase text-xs px-6 py-2 mt-4 shadow hover:shadow-md outline-none focus:outline-none mr-1 animate-ease-in-out animate-fill-forwards hover:animate-jump hover:animate-once hover:animate-duration-[2000ms] "
                  type="submit"
                >
                  Répondre
                </button>

            </div>
          </form>
        </div>
      </div>
    </>
  );
}
