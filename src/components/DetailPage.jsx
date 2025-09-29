import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetailPage() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [neighbors, setNeighbors] = useState([]);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then(res => res.json())
      .then(data => {
        setCountry(data[0]);
        if (data[0]?.borders?.length) {
          Promise.all(
            data[0].borders.map(code => fetch(`https://restcountries.com/v3.1/alpha/${code}`).then(r => r.json()))
          ).then(neighData => setNeighbors(neighData.map(n => n[0])));
        }
      });
  }, [code]);

  if (!country) return null;
  
  return (
    <div className="max-w-[1100px] mx-auto pt-5 px-10 pb-0 bg-white font-sans">
      <h1 className="text-[2.2em] font-bold mt-0 mb-5 text-gray-900 tracking-tight">
        {country.name.common}
      </h1>
      
      <div className="flex items-start gap-10 mb-10 max-[900px]:min-h-[340px]">
        <img 
          src={country.flags.svg} 
          alt="Country Flag" 
          className="w-[450px] h-[290px] object-cover border-0 mt-1.5 max-[900px]:h-full max-[900px]:w-[380px] max-[900px]:object-fill max-[900px]:m-0 max-[900px]:self-stretch max-[900px]:block max-[900px]:bg-white" 
        />
        <div className="text-[17px] text-gray-800 mt-2.5 min-w-[330px] max-w-[430px] max-[900px]:flex max-[900px]:flex-col max-[900px]:justify-start max-[900px]:p-0 max-[900px]:m-0">
          <p className="m-0 mb-1.5 text-base">
            Native Name: {country.name?.nativeName ? Object.values(country.name.nativeName)[0].common : country.name.common}
          </p>
          <p className="m-0 mb-1.5 text-base">Capital: {country.capital?.[0] || "N/A"}</p>
          <p className="m-0 mb-1.5 text-base">Population: {country.population || "N/A"}</p>
          <p className="m-0 mb-1.5 text-base">Region: {country.region || "N/A"}</p>
          <p className="m-0 mb-1.5 text-base">Sub-region: {country.subregion || "N/A"}</p>
          <p className="m-0 mb-1.5 text-base">Area: {country.area ? `${country.area} Km²` : "N/A"}</p>
          <p className="m-0 mb-1.5 text-base">
            Country Code: {country.idd?.root ? country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : "") : "N/A"}
          </p>
          <p className="m-0 mb-1.5 text-base">
            Languages: {country.languages ? Object.values(country.languages).join(" and ") : "N/A"}
          </p>
          <p className="m-0 mb-1.5 text-base">
            Currencies: {country.currencies ? Object.values(country.currencies).map(c => c.name).join(", ") : "N/A"}
          </p>
          <p className="m-0 mb-1.5 text-base">
            Timezones: {country.timezones ? country.timezones.join(", ") : "N/A"}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-300 mt-10 pt-[26px] px-6 pb-7 max-[900px]:p-2.5">
        <h2 className="text-[1.22em] font-bold mb-[18px] text-gray-800 tracking-tight">
          Neighbour Countries
        </h2>
        <div className="grid grid-cols-3 gap-y-8 gap-x-10 mt-4 justify-items-start">
          {neighbors.length
            ? neighbors.map(n => (
                <img 
                  key={n.cca3} 
                  src={n.flags.svg} 
                  alt={n.name.common}
                  className="w-[200px] h-[120px] object-contain border-0 mb-1 bg-white max-[900px]:w-[90vw] max-[900px]:max-w-[170px] max-[900px]:h-[90px]" 
                />
              ))
            : "No neighboring countries."
          }
        </div>
      </div>
    </div>
  );
}

export default DetailPage;