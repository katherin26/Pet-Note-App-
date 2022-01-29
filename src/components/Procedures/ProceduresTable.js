import React from "react";
import { Link } from "react-router-dom";
import { convertTimestampToDate } from "../../utils";
import he from "he";

export default function ProceduresTable({
  procedures,
  clickOnEditHandler,
  clickOnDeleteHandler,
  showLoadMore,
  clickOnLoadMoreHandler,
}) {
  const tableRows = procedures.map((procedure, index) => (
    <tr key={index}>
      <td className="border px-4 py-2 text-center">
        {he.decode(procedure.name)}
      </td>
      <td className="border px-4 py-2 text-center">
        {convertTimestampToDate(procedure.date)}
      </td>
      <td className="border px-4 py-2 text-center">{procedure.location}</td>
      <td className="border px-4 py-2 text-center">
        ${procedure.cost ? procedure.cost : 0}
      </td>
      <td className="border px-4 py-2 text-center">
        {he.decode(procedure.comments)}
      </td>
      <td className="border px-4 py-2 text-center">
        <button
          className="tooltip bg-orange-300 hover:bg-orange-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
          onClick={() => clickOnEditHandler(procedure)}
        >
          <i className="fas fa-pen-alt"></i>
          <span className="tooltiptext">Edit</span>
        </button>{" "}
        <button
          className="tooltip bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
          onClick={() => clickOnDeleteHandler(procedure)}
        >
          <i className="far fa-trash-alt"></i>
          <span className="tooltiptext">Remove</span>
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-11/12 rounded overflow-hidden shadow-lg mt-4">
        <div className="p-2 flex items-center justify-end">
          <Link
            to="/pet/records/procedures/add"
            className="tooltip m-4 p-2 bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-lg"
          >
            <span className="tooltiptext">Add</span>
            <i className="fas fa-plus"></i>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center w-11/12 rounded overflow-hidden shadow-lg  m-8 overflow-x-auto">
            <table className=" w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-teal-800 font-bold ">NAME</th>
                  <th className="px-4 py-2 text-teal-800 font-bold">DATE</th>
                  <th className="px-4 py-2 text-teal-800 font-bold">
                    LOCATION
                  </th>
                  <th className="px-4 py-2 text-teal-800 font-bold">COST</th>
                  <th className="px-4 py-2 text-teal-800 font-bold">
                    PET-NOTE
                  </th>
                  <th className="px-4 py-2 text-teal-800 font-bold">
                    EDIT/REMOVE
                  </th>
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </table>
          </div>
        </div>
        <div className="p-2 flex items-center justify-center">
          {showLoadMore === true && (
            <button onClick={() => clickOnLoadMoreHandler()}>load more</button>
          )}
        </div>
      </div>
    </div>
  );
}
