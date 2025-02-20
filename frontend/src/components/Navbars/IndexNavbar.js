/*eslint-disable*/
import IndexDropdown from "components/Dropdowns/IndexDropdown";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// components
import { useHistory } from 'react-router-dom';
import SummaryApi from '../../common';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar(props) {
  const history = useHistory();
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setCurrentUser(result.data);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user details.");
    }
  };
  const handleLogout = async () => {
    try {
      const fetchData = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: 'include',
      });

      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message);
        // dispatch(setUserDetails(null));
        history.push('/auth/login');
      } else if (data.error) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while logging out. Please try again.");
    }
  };
  useEffect(() => {
    fetchCurrentUser();

  }, []);
  return (
    <>

      <nav id="navbar" className="z-50 w-full flex flex-wrap items-center mt-23 justify-between px-2 py-3 navbar-expand-lg bg-white shadow">

        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a href="/">
              <img
                src={require("assets/img/logo-dynamix-full.png")}
                className="h-8"
                alt="Logo Dynamix"
              />
            </a>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <a
                  className="hover:y text-black px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/"
                >
                  <i className="text-black text-lg leading-lg mr-2" />{" "}
                  Accueil
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="hover:text-black text-black px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/services"
                >
                  <i className="text-black text-lg leading-lg mr-2" />{" "}
                  Services
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="hover:text-black text-black px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/produits"
                >
                  <i className="text-black text-lg leading-lg mr-2" />{" "}
                  Produits
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="hover:text-black text-black px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/mes-réclamations"
                >
                  <i className="text-black text-lg leading-lg mr-2" />{" "}
                  Mes Réclamations
                </a>
              </li>

            </ul>

            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">

                {/* index dropdown */}
                <ul className="flex flex-col lg:flex-row list-none mr-auto">
                  <form className="mt-2 mb-2 flex flex-row flex-wrap items-center lg:ml-0">
                    <div className="relative flex w-full flex-wrap items-stretch">
                      <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-search text-blueGray-700"></i>
                      </span>
                      <input
                        type="text"
                        placeholder="Rechercher un profil..."
                        className="border-0 px-3 py-3 placeholder-blueGray-700 text-blueGray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                      />
                    </div>
                  </form>
                  <li className="flex items-center">
                    <a
                      className="hover:text-black text-black px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                      href="/admin/dashboard"
                    >
                      <i className="text-black text-lg leading-lg mr-2" />{" "}
                      Administration
                    </a>
                  </li>
                  <li className="flex items-center">
                    <a
                      className="hover:text-black text-black px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                      onClick={handleLogout}
                    >
                      <i className="text-black fas fa-sign-out-alt text-lg leading-lg " />
                      <span className="lg:hidden inline-block ml-2">Déconnexion</span>
                    </a>
                  </li></ul>
              </li>
           

              <li className="flex items-center">
                <IndexDropdown />
              </li>

              <li className="flex items-center">
                <a
                  className="hover:text-black text-black px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/chat"
                >
                  <i className="text-black fas fa-comments text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Chat</span>
                </a>
              </li>
              <li className="flex items-center">
              <a
                  className="hover:text-black text-black px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/profile"
                > 
              <img
                        src={currentUser?.ProfileImage}
                        alt="User Avatar"
                        className="w-8 h-8 mr-2 rounded-full"
                      />
                      </a>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
