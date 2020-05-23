import React from "react";
import { Link } from "react-router-dom";

export default function Login(props) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <form className="bg-white bg-opacity-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 lg:w-1/4 md:w-1/3 sm:w-1/2">
        <div className="mb-4">
          <label
            className="block text-teal-800 text-sm font-bold mb-2"
            htmlFor="email"
          >
            EMAIL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="e.g@gmail.com"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-teal-800 text-sm font-bold mb-2"
            htmlFor="password"
          >
            PASSWORD
          </label>
          <input
            className="shadow appearance-none  border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div className="flex items-center justify-between">
          <Link
            className=" mt-2 mr-2 bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            to="/dashboard"
          >
            <i class="fas fa-check-double" />
          </Link>

          <a
            className="inline-block align-baseline font-bold text-sm  text-red-700 hover:text-white "
            href=""
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}
