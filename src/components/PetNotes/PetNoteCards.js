import React from "react";
import { Link } from "react-router-dom";
import { convertTimestampToISODate } from "../../utils";

export default function PetNoteCards({
  petnotes,
  clickOnDoneHandler,
  clickOnEditHandler,
  clickOnDeleteHandler,
}) {
  const petNoteCards = petnotes.map((petnote, index) => (
    <div key={index} className="flex w-full sm:w-1/4">
      <div className="w-full m-8 rounded overflow-hidden shadow-lg">
        <div className="flex w-full pr-2 pl-2 overflow-hidden bg-orange-100">
          <div className="divide-y divide-gray-400 w-full">
            <div className="flex">
              <div className="py-2 w-1/2 text-right pr-5  text-teal-800 font-bold">
                NAME:
              </div>
              <div className="py-2 pl-5">{petnote.name} </div>
            </div>
            <div className="flex">
              <div className="py-2 w-1/2 text-right pr-5  text-teal-800 font-bold">
                DATE:
              </div>
              <div className="py-2 pl-5">
                {convertTimestampToISODate(petnote.date)}
              </div>
            </div>

            <div className="flex">
              <div className="py-2 w-1/2 text-right pr-5  text-teal-800 font-bold">
                LOCATION:
              </div>
              <div className="py-2 pl-5">{petnote.location}</div>
            </div>
            <div className="flex">
              <div className="py-2 w-1/2 text-right pr-5  text-teal-800 font-bold">
                PET-NOTE:
              </div>
              <div className="py-2 pl-5">{petnote.comments}</div>
            </div>
            <div className="flex justify-end">
              <div className="py-2 pr-1 text-teal-800 ">
                <button
                  onClick={() => clickOnDoneHandler(petnote)}
                  className="tooltip bg-teal-400 hover:bg-teal-500 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                >
                  <span className="tooltiptext">Done</span>

                  <i className="fas fa-check-double"></i>
                </button>
              </div>
              <div className="py-2 text-teal-800 ">
                <button
                  onClick={() => clickOnEditHandler(petnote)}
                  className=" tooltip bg-orange-300 hover:bg-orange-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                >
                  <span className="tooltiptext">Edit</span>

                  <i className="fas fa-pen-alt"></i>
                </button>
              </div>
              <div className="py-2 pl-1">
                <button
                  onClick={() => clickOnDeleteHandler(petnote)}
                  className="tooltip bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                >
                  <span className="tooltiptext">Remove</span>

                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="flex justify-center items-center w-full h-full ">
      <div className="w-11/12 rounded overflow-hidden shadow-lg mt-4">
        <div className="p-2 flex items-center justify-end">
          <Link
            to="/pet/records/petnotes/add"
            className="tooltip m-4  bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-lg"
          >
            <span className="tooltiptext">Add</span>

            <i className="fas fa-plus"></i>
          </Link>
        </div>
        <div className="flex flex-wrap w-full h-full">{petNoteCards}</div>
      </div>
    </div>
  );
}
