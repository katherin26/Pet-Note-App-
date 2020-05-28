import React from "react";
import "./Home.css";

export default function Home(props) {
  return (
    <div className="flex justify-center h-full md:pt-44 md:pt-64">
      <div className="flex flex-col justify-center items-center border-solid border-2 border-white relative text-white kathe_banner">
        <h1 className="tex-white text-center text-lg md:text-xl lg:text-4xl font-bold">
          WELCOME TO PET-NOTE
        </h1>
        <h2 className="text-center text-white font-light ">
          The easiest way to keep track of your pet's health
        </h2>
        <div className="absolute border-solid border-2 border-white kathe_overlay"></div>
      </div>
    </div>
  );
}
