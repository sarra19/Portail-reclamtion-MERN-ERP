import React from "react";
import PropTypes from "prop-types";

export default function CardStats({ statTitle, statDescripiron, statImage , id}) {


  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap items-center">
            <div
              className="relative w-full pr-4 max-w-full flex-grow flex-1"

            >
              <span className="font-semibold text-xl text-blueGray-700">
                {statTitle}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div className="w-12 h-12">
                <img
                  src={statImage}
                  alt="Stat Icon"
                  className="rounded-full w-full h-full"
                />
              </div>
            </div>
          </div>


          <a
            href={`/détails-service/${id}`}
            className="mt-4 flex justify-end font-bold text-blueGray-700 text-sm hover:text-white ease-linear transition-all duration-150"
          >
            En Savoir plus{" "}
            <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
          </a>
          <div className="text-center flex justify-end ">
            <a href={`/Envoyer-réclamation/${id}`}>
              <button
                className="bg-orange-dys text-white active:bg-orange-dys font-bold uppercase text-xs px-6 py-2 mt-4 shadow hover:shadow-md outline-none focus:outline-none mr-1 animate-ease-in-out animate-fill-forwards hover:animate-jump hover:animate-once hover:animate-duration-[2000ms] "
                type="button"
              >
                Réclamer
              </button>

            </a>
          </div>
        </div>
      </div>
    </>
  );
}

CardStats.defaultProps = {
  statTitle: "350,897",
  statDescripiron: "Since last month",
  statImage: null,
};

CardStats.propTypes = {
  statTitle: PropTypes.string,
  statDescripiron: PropTypes.string,
  statImage: PropTypes.string,
};
