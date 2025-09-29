import React from "react";
import { useNavigate } from "react-router-dom";
import { getCountryTime } from "../datetime";

function CountryCard({ country }) {
  const navigate = useNavigate();
  const dateTimeStr = getCountryTime(country);

  return (
    <div className="flex border border-gray-300 rounded-none mb-4 px-[6px] py-2 shadow-[0_6px_12px_-6px_rgba(0,0,0,0.15)] w-full box-border mx-auto items-center">
      <img
        src={country.flags.svg}
        alt={`${country.name.common} Flag`}
        className="w-[170px] mr-[15px] ml-1 mt-1 mb-1 rounded-none object-cover block self-start"
      />
      <div className="flex flex-col flex-1">
        <h2 className="m-0 mb-1 text-[22px] font-bold">
          {country.name.common}
        </h2>
        <p className="mb-2 text-xs font-bold">
          Currency:{" "}
          {Object.values(country.currencies || {})
            .map((cur) => cur.name)
            .join(", ") || "N/A"}
        </p>
        <p className="mb-2 text-xs font-bold">
          Current date and time: {dateTimeStr}
        </p>
        <div className="flex justify-start gap-5 mt-0 w-full">
          <button
            onClick={() => window.open(country.maps.googleMaps, "_blank")}
            className="border-2 border-blue-700 text-blue-700 bg-transparent rounded-none px-3 py-1 font-bold w-[115px] text-center text-[14px] transition duration-300 hover:bg-blue-600 hover:text-white"
          >
            Show Map
          </button>
          <button
            onClick={() => navigate(`/detail/${country.cca3}`)}
            className="border-2 border-blue-700 text-blue-700 bg-transparent rounded-none px-3 py-1 font-bold w-[115px] text-center text-[14px] transition duration-300 hover:bg-blue-600 hover:text-white"
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  );
}
export default CountryCard;
