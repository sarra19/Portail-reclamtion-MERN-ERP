import React from "react";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import CardChat from "components/Cards/CardChat";
import HeaderAuth from "components/Header/HeaderAuth";

export default function Chat() {
  return (
    <>
      <HeaderAuth fixed />

      <IndexNavbar fixed />

      <div className="relative  mt-8 pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
        <div className="container mx-auto px-4">

            <CardChat />
        </div>
      </div>
      <Footer />
    </>
  );
}
