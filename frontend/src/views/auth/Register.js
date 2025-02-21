import React, { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import loginIcons from '../../assets/img/signup.gif';
import SummaryApi from '../../common';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uploadFile from '../../helpers/uploadFile';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [data, setData] = useState({
    Email: '',
    FirstName: '',
    LastName: '',
    Password: '',
    confirmPassword: '',
    ProfileImage: '', // Store the image URL here
  });
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

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


    setData((prev) => ({
      ...prev,
      ProfileImage: [...prev.ProfileImage, file],
    }));
    setSelectedFile(file);

    toast.success("File selected successfully!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordError = validateMotdePasse(data.Password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    if (data.Password !== data.confirmPassword) {
      toast.error('Vos mots de passe ne se correspondent pas.');
      return;
    }

    if (Object.values(errors).some((error) => error)) {
      toast.error('Fixez vos erreurs.');
      return;
    }

    if (data.ProfileImage.length > 0) {
      const fileUrls = [];

      for (const file of data.ProfileImage) {

        const fileUploadResponse = await uploadFile(file);
        fileUrls.push(fileUploadResponse.url);

      }
      data.ProfileImage = fileUrls.join(",");

    }



    // Send data to the server
    try {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        setData({ // Appel correct de la fonction setData avec un objet
          Email: '',
          FirstName: '',
          LastName: '',
          Password: '',
          confirmPassword: '',
          ProfileImage: ''
      });
        // navigate('/login'); // Uncomment if you have a navigation function
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('An error occurred during registration.');
    }
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'Email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'format email Invalid .';
        }
        break;
      case 'FirstName':
        if (value.length < 3) {
          error = 'Prénom minmum 3 characters.';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Prénom doit avoir des letters ou espaces.';
        }
        break;
      case 'LastName':
        if (value.length < 3) {
          error = 'Nom minimum 3 characters.';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Nom doit avoir des letters ou espaces.';
        }
        break;
      case 'Password':
        const motdePasseError = validateMotdePasse(value);
        if (motdePasseError) {
          error = motdePasseError;
        }
        break;
      case 'confirmPassword':
        if (value !== data.Password) {
          error = 'Passwords do not match.';
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

  const validateMotdePasse = (password) => {
    const lengthValid = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!lengthValid) return 'Mot de Passe must be at least 8 characters long.';
    if (!hasUpperCase) return 'Mot de Passe must contain at least one uppercase letter.';
    if (!hasLowerCase) return 'Mot de Passe must contain at least one lowercase letter.';
    if (!hasNumber) return 'Mot de Passe must contain at least one number.';
    if (!hasSpecialChar) return 'Mot de Passe must contain at least one special character.';

    return null;
  };

  return (
    <>
      <ToastContainer position='top-center' />
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-start h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Inscription avec
                  </h6>
                </div>
                <div className="btn-wrapper text-center flex justify-center space-x-2">
                  <button type="button" className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150">
                    <img alt="..." className="w-5 mr-1" src={require("assets/img/github.svg").default} />
                    Github
                  </button>
                  <button type="button" className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150">
                    <img alt="..." className="w-5 mr-1" src={require("assets/img/google.svg").default} />
                    Google
                  </button>
                  <button type="button" className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150">
                    <img alt="..." className="w-5 mr-1" src={require("assets/img/facebook.svg").default} />
                    Facebook
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Ou tapez vos cordonnées</small>
                </div>
                <div className='w-16 h-16 mx-auto relative overflow-hidden rounded-full'>
                    <div >
                      <img
                        src={selectedFile ? URL.createObjectURL(selectedFile) : loginIcons} alt='profile' className='object-cover w-full h-full' />


                    </div>
                 

                  <form>
                    <label>
                      <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                      </div>
                      <input type='file' className='hidden' onChange={handleUploadFile} />
                    </label>
                  </form>
                </div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-motdePasse">
                        Prénom
                      </label>
                      <input
                        type='text'
                        placeholder='Enter votre prénom'
                        name='FirstName'
                        value={data.FirstName}
                        onChange={handleOnChange}
                        required
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                    {errors.FirstName && <p className='text-red-500 text-sm'>{errors.FirstName}</p>}
                  </div>
                  <div>
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-motdePasse">
                        Nom
                      </label>
                      <input
                        type='text'
                        placeholder='Enter votre Nom'
                        name='LastName'
                        value={data.LastName}
                        onChange={handleOnChange}
                        required
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                    {errors.LastName && <p className='text-red-500 text-sm'>{errors.LastName}</p>}
                  </div>
                  <div>
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-motdePasse">
                        Email
                      </label>
                      <input
                        type='email'
                        placeholder='Enter email'
                        name='Email'
                        value={data.Email}
                        onChange={handleOnChange}
                        required
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                    {errors.Email && <p className='text-red-500 text-sm'>{errors.Email}</p>}
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-motdePasse">
                      Mot de Passe
                    </label>
                    <div className='flex'>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter votre Mot de Passe'
                        name='Password'
                        value={data.Password}
                        onChange={handleOnChange}
                        required
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                      <div className='ml-2 mt-3 cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                        <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                      </div>
                    </div>
                  </div>
                  {errors.Password && <p className='text-red-500 text-sm'>{errors.Password}</p>}

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-motdePasse">
                      Confirmer votre Mot de Passe
                    </label>
                    <div className='flex'>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Confirm password'
                        value={data.confirmPassword}
                        name='confirmPassword'
                        onChange={handleOnChange}
                        required
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                      <div className='ml-2 mt-3 cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
                      </div>
                    </div>
                    {errors.confirmPassword && <p className='text-red-600 text-xs'>{errors.confirmPassword}</p>}
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-orange-dys text-white active:bg-orange-dys text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Créer Compte
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a href="/auth/login" className="text-blueGray-600">
                  <small>Vous avez un compte ?</small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}