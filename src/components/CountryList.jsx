import React, { useState, useEffect } from "react";
import CountryCard from "./CountryCard";
const ALL_API =
  "https://restcountries.com/v3.1/all?fields=name,flags,currencies,timezones,region,cca3,maps";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch(ALL_API)
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  return (
    <div className="max-w-[465px] mx-auto">
      <h1 className="mt-10 mb-0 text-[33px] font-bold">Countries</h1>
      <div className="flex w-full justify-center mb-3">
        <input
          type="text"
          placeholder="Search countries"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full min-w-0 border border-gray-400 border-r-0 rounded-none text-base outline-none px-3 py-[10px]"
        />
        <button className="flex items-center border border-gray-400 border-l-0 bg-white text-gray-800 px-3 rounded-none cursor-pointer text-lg hover:bg-gray-200">
          <img
            src="/search_logo.png"
            alt="Search"
            style={{ width: 35, height: 35 }}
          />
        </button>
      </div>
      <div id="countryList">
        {countries
          .filter((c) =>
            c.name.common.toLowerCase().includes(filter.toLowerCase())
          )
          .sort((a, b) => a.name.common.localeCompare(b.name.common))
          .map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
      </div>
    </div>
  );
}

export default CountryList;
