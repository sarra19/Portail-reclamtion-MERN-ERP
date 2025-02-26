import React, { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from "common";
import uploadFile from "helpers/uploadFile";
import loginIcons from 'assets/img/signup.gif';

export default function CardAddUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    confirmPassword: "",
    FirstName: "",
    LastName: "",
    ProfileImage: "",
    Verified: 0,
    City: "",
    PostalCode: "",
    Biography: "",
    Phone: "",
    Gender: "",
    Country: "",
    Address: "",
    OccupationUser: "",
    CompagnyUser: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
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
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX files
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload an image (JPEG, PNG, GIF, PDF, DOC, DOCX).");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size exceeds the limit of 5MB.");
      return;
    }

    setSelectedFile(file);
    setFormData((prev) => ({
      ...prev,
      ProfileImage: file,
    }));

    toast.success("File selected successfully!");
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'Email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Format email invalide.';
        }
        break;
      case 'FirstName':
        if (value.length < 3) {
          error = 'Prénom doit contenir au moins 3 caractères.';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Prénom ne doit contenir que des lettres et des espaces.';
        }
        break;
      case 'LastName':
        if (value.length < 3) {
          error = 'Nom doit contenir au moins 3 caractères.';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Nom ne doit contenir que des lettres et des espaces.';
        }
        break;
      case 'Password':
        const passwordError = validatePassword(value);
        if (passwordError) {
          error = passwordError;
        }
        break;
      case 'confirmPassword':
        if (value !== formData.Password) {
          error = 'Les mots de passe ne correspondent pas.';
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validatePassword = (password) => {
    const lengthValid = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!lengthValid) return 'Le mot de passe doit contenir au moins 8 caractères.';
    if (!hasUpperCase) return 'Le mot de passe doit contenir au moins une majuscule.';
    if (!hasLowerCase) return 'Le mot de passe doit contenir au moins une minuscule.';
    if (!hasNumber) return 'Le mot de passe doit contenir au moins un chiffre.';
    if (!hasSpecialChar) return 'Le mot de passe doit contenir au moins un caractère spécial.';

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Email || !formData.Password || !formData.FirstName || !formData.LastName) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (formData.Password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas.');
      return;
    }

    if (Object.values(errors).some((error) => error)) {
      toast.error('Veuillez corriger les erreurs dans le formulaire.');
      return;
    }

    try {
      let profileImageUrl = '';
      if (formData.ProfileImage) {
        const uploadResponse = await uploadFile(formData.ProfileImage);
        profileImageUrl = uploadResponse.url;
      }

      const dataToSend = {
        ...formData,
        ProfileImage: profileImageUrl,
      };

      const response = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        toast.success(dataResponse.message);
        setFormData({
          Email: "",
          Password: "",
          confirmPassword: "",
          FirstName: "",
          LastName: "",
          ProfileImage: "",
          Verified: 0,
          City: "",
          PostalCode: "",
          Biography: "",
          Phone: "",
          Gender: "",
          Country: "",
          Address: "",
          OccupationUser: "",
          CompagnyUser: "",
        });
        setSelectedFile(null);
      } else {
        toast.error(dataResponse.message || "Erreur lors de l'ajout de l'utilisateur.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
      toast.error("Une erreur s'est produite lors de l'ajout de l'utilisateur.");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <h6 className="text-orange-dys text-xl mt-12 font-bold flex justify-center">
            Ajouter un utilisateur
          </h6>
          <form onSubmit={handleSubmit}>
            <h6 className="text-blueGray-400 text-sm mt-6 mb-6 font-bold uppercase">
              Information d'utilisateur
            </h6>
            <div className="w-full   px-4">
              <div className="relative w-full mb-6">

                <div className="w-16 h-16 text-center mx-auto relative overflow-hidden rounded-full">
                  <div >
                    <img
                      src={selectedFile ? URL.createObjectURL(selectedFile) : loginIcons} alt='profile' className='object-cover w-full h-full' />


                  </div>
                  <form>
                    <label>
                      <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">

                      </div>
                      <input type="file" className="hidden" onChange={handleUploadFile} />
                    </label>
                  </form>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Entrez votre prénom"
                    required
                  />
                  {errors.FirstName && <p className="text-red-500 text-sm">{errors.FirstName}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="LastName"
                    value={formData.LastName}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Entrez votre nom"
                    required
                  />
                  {errors.LastName && <p className="text-red-500 text-sm">{errors.LastName}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Email
                  </label>
                  <input
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Entrez votre email"
                    required
                  />
                  {errors.Email && <p className="text-red-500 text-sm">{errors.Email}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Mot de passe
                  </label>
                  <div className="flex">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="Password"
                      value={formData.Password}
                      onChange={handleInputChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Entrez votre mot de passe"
                      required
                    />
                    <div className="ml-2 mt-3 cursor-pointer text-xl" onClick={() => setShowPassword((prev) => !prev)}>
                      <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                    </div>
                  </div>
                  {errors.Password && <p className="text-red-500 text-sm">{errors.Password}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Confirmer le mot de passe
                  </label>
                  <div className="flex">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Confirmez votre mot de passe"
                      required
                    />
                    <div className="ml-2 mt-3 cursor-pointer text-xl" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                      <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
                    </div>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="Phone"
                    value={formData.Phone}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Entrez votre numéro de téléphone"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Genre
                  </label>
                  <select
                    name="Gender"
                    value={formData.Gender}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="">Sélectionnez votre genre</option>
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Role
                  </label>
                  <select
                    name="Role"
                    value={formData.Role}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="1">Client</option>
                    <option value="2">Fournisseur</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Information de Contact
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Adresse
                  </label>
                  <input
                    type="text"
                    name="Address"
                    value={formData.Address}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Entrez votre adresse"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Pays
                  </label>
                  <input
                    type="text"
                    name="Country"
                    value={formData.Country}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Entrez votre pays"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Ville
                  </label>
                  <input
                    type="text"
                    name="City"
                    value={formData.City}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Entrez votre ville"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Code Postal
                  </label>
                  <input
                    type="text"
                    name="PostalCode"
                    value={formData.PostalCode}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Entrez votre code postal"
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              à propos
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Biographie
                  </label>
                  <textarea
                    name="Biography"
                    value={formData.Biography}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    rows="4"
                    placeholder="Entrez une courte biographie"
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
        </div>
      </div>
    </>
  );
}