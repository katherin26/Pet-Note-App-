import React from "react";
import { Link } from "react-router-dom";
import { convertTimestampToDate } from "../../utils";

export default function PetInfo({ pet }) {
  return (
    <div className="flex justify-center items-center w-full h-full ">
      <div className="w-11/12  rounded overflow-hidden shadow-lg mt-4 ">
        <div className="p-2 flex items-center justify-end pt-2 ">
          <Link
            to="/pet/records/profile/update"
            className=" m-4 p-2 bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md"
          >
            <i className="fas fa-pen-alt"></i>
          </Link>
        </div>
        <div className="flex flex-wrap w-full justify-center items-center">
          <div className=" flex-col">
            <img
              className=" w-3/4  mx-auto  border shadow-lg rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTyh9RN_zqCyVLtyMLck56fHrPUbJMreylVa2pfUHUMGUCeqnZt&usqp=CAU"
              alt="Sunset in the mountains"
            />
            <p className="text-lg text-center text-teal-800 font-bold uppercase mt-5 mb-5">
              {pet.name}
            </p>
          </div>

          <div className="flex w-1/2 pl-2 overflow-hidden">
            <div className="divide-y divide-gray-400 w-full ">
              <div className="flex flex-wrap w-full">
                <div className="py-2 sm:pr-5 w-full sm:w-1/2 text-center sm:text-right text-teal-800 font-bold">
                  Specie:
                </div>
                <div className="py-2 sm:pl-5 w-full sm:w-1/2 text-center sm:text-left">
                  {pet.species}
                </div>
              </div>
              <div className="flex flex-wrap w-full">
                <div className="py-2 sm:pr-5 w-full sm:w-1/2 text-center sm:text-right text-teal-800 font-bold">
                  Breed:
                </div>
                <div className="py-2 sm:pl-5 w-full sm:w-1/2 text-center sm:text-left">
                  {pet.breed}
                </div>
              </div>
              <div className="flex flex-wrap w-full">
                <div className="py-2 sm:pr-5 w-full sm:w-1/2 text-center sm:text-right text-teal-800 font-bold">
                  Gender:
                </div>
                <div className="py-2 sm:pl-5 w-full sm:w-1/2 text-center sm:text-left">
                  {pet.gender}
                </div>
              </div>
              <div className="flex flex-wrap w-full">
                <div className="py-2 sm:pr-5 w-full sm:w-1/2 text-center sm:text-right text-teal-800 font-bold">
                  Weight:
                </div>
                <div className="py-2 sm:pl-5 w-full sm:w-1/2 text-center sm:text-left">
                  {pet.weight} lb
                </div>
              </div>
              <div className="flex flex-wrap w-full">
                <div className="py-2 sm:pr-5 w-full sm:w-1/2 text-center sm:text-right text-teal-800 font-bold">
                  Sterilized:
                </div>
                <div className="py-2 sm:pl-5 w-full sm:w-1/2 text-center sm:text-left">
                  {pet.sterilized ? "Yes" : "No"}
                </div>
              </div>
              <div className="flex flex-wrap w-full">
                <div className="py-2 sm:pr-5 w-full sm:w-1/2 text-center sm:text-right text-teal-800 font-bold">
                  Allergies:
                </div>
                <div className="py-2 sm:pl-5 w-full sm:w-1/2 text-center sm:text-left">
                  {pet.allergies}
                </div>
              </div>
              <div className="flex flex-wrap w-full">
                <div className="py-2 sm:pr-5 w-full sm:w-1/2 text-center sm:text-right text-teal-800 font-bold">
                  BirthDay:
                </div>
                <div className="py-2 sm:pl-5 w-full sm:w-1/2 text-center sm:text-left">
                  {convertTimestampToDate(pet.dob)}
                </div>
              </div>
              <div className="flex flex-wrap w-full">
                <div className="py-2 sm:pr-5 w-full sm:w-1/2 text-center sm:text-right text-teal-800 font-bold">
                  Microchip:
                </div>
                <div className="py-2 sm:pl-5 w-full sm:w-1/2 text-center sm:text-left">
                  {pet.microchip}
                </div>
              </div>
              <div className="flex flex-wrap w-full">
                <div className="py-2 sm:pr-5 w-full sm:w-1/2 text-center sm:text-right text-teal-800 font-bold">
                  Rabies Tag:
                </div>
                <div className="py-2 sm:pl-5 w-full sm:w-1/2 text-center sm:text-left">
                  {pet.rabies_tag}
                </div>
              </div>
              <div className="flex flex-wrap w-full">
                <div className="py-2 sm:pr-5 w-full sm:w-1/2 text-center sm:text-right text-teal-800 font-bold">
                  Tag Expiration:
                </div>
                <div className="py-2 sm:pl-5 w-full sm:w-1/2 text-center sm:text-left">
                  {convertTimestampToDate(pet.rabies_exp)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
