import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from '../../common';
import Context from '../../context';
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { fetchUserDetails, setEmail, setOTP } = useContext(Context);

  const [data, setData] = useState({
    Email: "",
    Password: ""
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const navigateToOtp = async () => {
    if (data.Email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      setOTP(OTP);
      setEmail(data.Email);

      try {
        const response = await fetch(SummaryApi.sendRecoveryEmail.url, {
          method: SummaryApi.sendRecoveryEmail.method,
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            OTP,
            recipient_email: data.Email,
          }),
        });

        if (response.ok) {
          history.push('/auth/otp');
        } else {
          console.log("Failed to send OTP:", response.statusText);
        }
      } catch (error) {
        console.log("Error sending OTP:", error);
      }
    } else {
      toast.error("Please enter your email");
    }
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'Email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Invalid email format.';
        }
        break;
      case 'Password':
        const passwordError = validatePassword(value);
        if (passwordError) {
          error = passwordError;
        }
        break;
      default:
        break;
    }
    return error;
  };

  const validatePassword = (password) => {
    const lengthValid = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!lengthValid) return 'Password must be at least 8 characters long.';
    if (!hasUpperCase) return 'Password must contain at least one uppercase letter.';
    if (!hasLowerCase) return 'Password must contain at least one lowercase letter.';
    if (!hasNumber) return 'Password must contain at least one number.';
    if (!hasSpecialChar) return 'Password must contain at least one special character.';

    return null;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = {};

    const emailError = validateField('Email', data.Email);
    if (emailError) {
      newErrors.Email = emailError;
      formIsValid = false;
    }

    const passwordError = validateField('Password', data.Password);
    if (passwordError) {
      newErrors.password = passwordError;
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    try {
      const dataResponse = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        history.push('/');
        fetchUserDetails();
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error('An error occurred during login.');
    }
  };

  return (
    <>
      <ToastContainer position='top-center' />
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-start h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg  bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <div className="flex justify-center mb-3">
                    <img
                      src={require("assets/img/dyn1.png")}
                      className="h-16"
                    ></img>
                  </div>
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Connecter avec
                  </h6>
                </div>
                <div className="btn-wrapper text-center flex justify-center space-x-2">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/github.svg").default}
                    />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/google.svg").default}
                    />
                    Google
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/facebook.svg").default}
                    />
                    Facebook
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Ou connecter avec</small>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type='email'
                      placeholder='Entrer votre email'
                      name='Email'
                      value={data.Email}
                      onChange={handleOnChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                    {errors.Email && <p className='text-red-500 text-sm'>{errors.email}</p>}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Mot de passe
                    </label>
                    <div className="flex">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="entrer votre Password"
                        value={data.Password}
                        name='Password'
                        onChange={handleOnChange} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                      <div className=' ml-2 mt-3 cursor-pointer text-xl' onClick={() => setShowPassword(prev => !prev)}>
                        <span>
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                    {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-orange-dys text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Connexion
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <button
                  onClick={navigateToOtp}
                  className="text-blueGray-600"
                >
                  <small>Mot de passe oublié ?</small>
                </button>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-600">
                  <small>Créer nouveau Compte</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}