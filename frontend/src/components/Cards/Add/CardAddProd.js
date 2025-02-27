import SummaryApi from "common";
import DisplayImage from "helpers/DisplayImage";
import uploadFile from "helpers/uploadFile";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

export default function CardAddProd() {
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [selectedVendor, setSelectedVendor] = useState('');
  const [vendorData, setVendorData] = useState(null); // État pour stocker les données du fournisseur

  const [data, setData] = useState({
    ImageProduct: "",
    Name: "",
    Description: "",
    Price: 0,
    Tags: "",
    Vendor: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
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
      ImageProduct: [...prev.ImageProduct, file],
    }));
    toast.success("File selected successfully!");
  };

  const handleDeleteImage = (index) => {
    const newImage = [...data.ImageProduct];
    newImage.splice(index, 1);

    setData((prev) => ({
      ...prev,
      ImageProduct: [...newImage]
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("vendor : ", data.Vendor)
      if (!data.Name || !data.Price || !data.Vendor) {
        toast.error("Veuillez remplir tous les champs obligatoires !");
        return;
      }

      const formData = {
        ImageProduct: "",
        Name: data.Name,
        Description: data.Description,
        Price: data.Price,
        Tags: data.Tags,
        Vendor: data.Vendor,
      };

      if (data.ImageProduct.length > 0) {
        const fileUrls = [];
        for (const file of data.ImageProduct) {
          try {
            const fileUploadResponse = await uploadFile(file);
            fileUrls.push(fileUploadResponse.url);
          } catch (uploadError) {
            console.error("Erreur lors du téléchargement du fichier :", uploadError);
            toast.error("Échec de l'upload de l'image. Veuillez réessayer.");
            return;
          }
        }
        formData.ImageProduct = fileUrls.join(",");
      }

      const response = await fetch(SummaryApi.addNewProduct.url, {
        method: "post",
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Erreur serveur inconnue");
      }

      toast.success(result.message);
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
      toast.error(error.message || "Une erreur est survenue, veuillez réessayer.");
    }
  };
  const fetchVendor = async () => {
    try {
      const response = await fetch(SummaryApi.getVendors.url, {
        method: SummaryApi.getVendors.method,
      });
      const result = await response.json();
      console.log(result.data)
      if (result.success) {
        setVendorData(result.data);

      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user details.");
    }
  };


  useEffect(() => {
    fetchVendor();
  }, []);

  const handleVendorChange = (event) => {
    const selectedValue = JSON.parse(event.target.value); // Convertir la chaîne JSON en objet
    setSelectedVendor(selectedValue); // Mettre à jour selectedVendor avec l'objet complet
    setData((prev) => ({
      ...prev,
      Vendor: `${selectedValue.FirstName} ${selectedValue.LastName}`, // Mettre à jour data.Vendor avec le nom complet
    }));
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Saisir les Informations de Produit</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="Name">
                    Nom de Produit
                  </label>
                  <input
                    type="text"
                    name="Name"
                    value={data.Name}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Nom de Produit"
                    required
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="Price">
                    Prix
                  </label>
                  <input
                    type="number"
                    name="Price"
                    value={data.Price}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    required
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="Vendor">
                    Nom de Fournisseur
                  </label>
                  <select
                    name="Vendor"
                    value={JSON.stringify(selectedVendor)} // Convertir l'objet en chaîne JSON
                    onChange={handleVendorChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    required
                  >
                    <option value="">Sélectionnez un fournisseur</option>
                    {vendorData && vendorData.map((vendor) => (
                      <option key={vendor.No_} value={JSON.stringify(vendor)}> {/* Convertir l'objet en chaîne JSON */}
                        {`${vendor.FirstName} ${vendor.LastName}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="Vendor">
                    Tags                  </label>
                  <input
                    type="text"
                    name="Tags"
                    value={data.Tags}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Entrez le nom de fournisseur"
                  />
                </div>
              </div>
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label htmlFor="uploadImageInput" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Document :
                  </label>
                  <label htmlFor="uploadImageInput">
                    <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                      <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                        <span className="text-4xl">
                          <FaCloudUploadAlt />
                        </span>
                        <p className="text-sm">Importer votre fichier</p>
                        <input
                          type="file"
                          id="uploadImageInput"
                          className="hidden"
                          onChange={handleUploadFile}
                          multiple // Allow multiple files
                        />
                      </div>
                    </div>
                  </label>
                </div>
                {data.ImageProduct.length > 0 && (
                  <div className="flex items-center gap-2">
                    {data.ImageProduct.map((el, index) => {
                      const isDocument = [
                        "application/pdf",
                        "application/msword",
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                      ].includes(el.type);

                      const defaultDocImage = require("assets/img/file.png");

                      return (
                        <div className="relative group" key={index}>
                          <img
                            src={isDocument ? defaultDocImage : URL.createObjectURL(el)}
                            alt={el.name}
                            width={80}
                            height={80}
                            className="bg-slate-100 border cursor-pointer"
                            onClick={() => {
                              setOpenFullScreenImage(true);
                              setFullScreenImage(isDocument ? defaultDocImage : URL.createObjectURL(el));
                            }}
                          />
                          <p>{el.name}</p>
                          <div
                            className="absolute bottom-0 right-0 p-1 text-white bg-pink-600 rounded-full hidden group-hover:block cursor-pointer"
                            onClick={() => handleDeleteImage(index)}
                          >
                            <MdDelete />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300 mb-6" />

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="Description">
                    Description
                  </label>
                  <textarea
                    name="Description"
                    value={data.Description}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Description de produit..."
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-end">
                <button
                  className="bg-orange-dys text-white active:bg-orange-dys font-bold uppercase text-xs px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Ajouter
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