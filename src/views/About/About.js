import React from "react";

export default function About() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="divide-y divide-gray-400">
        <div className="flex flex-wrap w-full m-3 p-4 ">
          <div className="flex justify-center items-center order-last sm:order-first md:order-none lg:order-first  w-full md:w-1/2 h-full p-5 ">
            <div className="flex flex-col m-1 p-5">
              <h1 className="text-lg font-bold text-center text-white mt-10">
                ABOUT PET-NOTE
              </h1>
              <p className="text-justify text-white m-5 ">
                Pet-Note created by <strong>Katherin Ochoa</strong> , Pet Parent
                of two dogs and one Guinea Pig, Inspired by the most effective
                way to track the pet's health information.
              </p>
            </div>
          </div>

          <div className="flex w-full md:w-1/2 h-full p-2">
            <img
              className="w-4/5 h-full mx-auto  border shadow-lg rounded"
              src={"kate3.jpg"}
            />
          </div>
        </div>

        <div className="flex flex-wrap w-full  m-3 p-4 ">
          <div className="flex  w-full md:w-1/2 h-full p-2  order-last sm:order-first md:order-none lg:order-first ">
            <img
              className="w-4/5 h-full mx-auto  border shadow-lg rounded"
              src={"isaacadaandjill.jpg"}
            />
          </div>

          <div className="flex justify-center items-center w-full md:w-1/2 h-full p-5">
            <div className="flex flex-col m-1 p-5">
              <h1 className="text-lg font-bold text-center text-white mt-10">
                ANIMAL LOVER
              </h1>
              <p className="text-justify text-white m-5 ">
                As a pet-parent I am always in charge of meeting the needs of my
                pets 100%, This application gives me quick and organized access
                to relevant information to guarantee a better quality of life
                for them.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap w-full  m-3 p-4 ">
          <div className="flex justify-center items-center order-last sm:order-first md:order-none lg:order-first   w-full md:w-1/2 h-full p-5">
            <div className="flex flex-col m-1 p-5">
              <h1 className="text-lg text-white font-bold text-center  mt-10">
                ACCESSIBILITY
              </h1>
              <p className="text-justify text-white m-5 ">
                My way of thinking about technology is that it must give us
                accessibility to information , Pet-Note is based on this need
                and with this decrease the amount of paper that is spent every
                day in vet clinics.
              </p>
            </div>
          </div>
          <div className="flex  w-full md:w-1/2 h-full p-2">
            <img
              className="w-4/5 h-full mx-auto  border shadow-lg rounded"
              src="https://s03.s3c.es/imag/_v0/770x420/0/7/2/MTP-cortesia-3.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
