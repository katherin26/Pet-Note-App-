import React from "react";

export default function PetCard({ pet, selectHandler }) {
  return (
    <div className="flex justify-center items-center w-full h-full m-10 border">
      <div className="bg-white w-full md:max-w-screen-sm min-w-0 p-5 border rounded-lg overflow-hidden shadow-lg transition ease-in-out duration-500 transform hover:scale-125">
        <img
          className="w-1/2 lg:w-2/5 mx-auto  border shadow-lg rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTyh9RN_zqCyVLtyMLck56fHrPUbJMreylVa2pfUHUMGUCeqnZt&usqp=CAU"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-center text-teal-800">
            {pet.name}
          </div>
        </div>

        <div className="flex justify-center items-center px-6 py-4">
          <button
            onClick={() => selectHandler(pet)}
            className="tooltip bg-transparent hover:bg-teal-200 text-teal-800 font-semibold hover:text-white py-1 px-3 border  border-gray-500 hover:border-transparent rounded-lg shadow-md"
          >
            <span className="tooltiptext">Profile</span>
            <i className="fas fa-paw"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
