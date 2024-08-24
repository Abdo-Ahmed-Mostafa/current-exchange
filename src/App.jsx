import axios from "axios";
import React, { useEffect, useState } from "react";
import { COUNTRY_NAMES } from "./country";

const App = () => {
  const [allCountry, setAllCountry] = useState([]);
  const [countryKey, setCountryKey] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("AED");
  const [selectedCountry2, setSelectedCountry2] = useState("AED");
  const [amount, setAmount] = useState("");
  const [check, setCheck] = useState(false);
  const [data, setData] = useState("");
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  const handleCountryChange2 = (e) => {
    setSelectedCountry2(e.target.value);
  };

  const getData = async () => {
    const response = await axios({
      method: "GET",
      url: `https://v6.exchangerate-api.com/v6/fd08326bada4bc178182cd15/latest/${selectedCountry}`,
    });
    setData(+response.data?.conversion_rates[`${selectedCountry2}`]);
  };

  const handelConvert = () => {
    getData();
    setCheck(true);
  };
  useEffect(() => {
    const country = [];
    const countryKey = [];
    for (var x in COUNTRY_NAMES) {
      country.push(COUNTRY_NAMES[x]);
      countryKey.push(x);
    }
    setAllCountry(country);
    setCountryKey(countryKey);
  }, []);
  return (
    <div className="bg-main h-screen bg-cover flex justify-center items-center text-white">
      <div className="  w-[50%] shadow-lg shadow-[#8a898940] text-white bg-color-main drop-blur  border-[#35353599] border-2">
        <h1 className="mt-11 mx-11 text-white text-2xl">Amount</h1>
        <div className="container mx-auto ">
          <input
            type="text"
            placeholder="Type here"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input w-full text-white placeholder:text-white bg-transparent border-0 border-b-4 border-white rounded-none focus:outline-none focus:border-white"
          />
        </div>
        <div className="flex mx-10  mt-5">
          <img
            src={`https://flagcdn.com/w320/${selectedCountry
              .slice(0, 2)
              .toLowerCase()}.png`}
            alt={`Flag of ${selectedCountry}`}
            loading="lazy"
            className="w-12 h-9 me-[-3.5em] z-10 mt-[0.4em]"
          />
          <select
            className="select select-primary w-full ps-16"
            onChange={handleCountryChange}
            value={selectedCountry}
          >
            {allCountry.map((country, index) => (
              <option key={index} value={countryKey[index]}>
                {countryKey[index]}
                {" || "}
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="flex   mx-10 mt-5">
          <img
            src={`https://flagcdn.com/w320/${selectedCountry2
              .slice(0, 2)
              .toLowerCase()}.png`}
            alt={`Flag of ${selectedCountry}`}
            loading="lazy"
            className="w-12 h-9 me-[-3.5em] z-10 mt-[0.4em]"
          />

          <select
            className="select select-primary w-full ps-16 text-sm sm:text-base md:text-lg"
            onChange={handleCountryChange2}
            value={selectedCountry2}
            style={{
              width: "100%",
              maxWidth: "100%",
              minWidth: "0", // لضمان عدم زيادة العرض
              boxSizing: "border-box",
            }}
          >
            {allCountry.map((country, index) => (
              <option
                key={index}
                value={countryKey[index]}
                className="text-xs sm:text-sm md:text-base lg:text-lg"
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box", // لضبط العرض حسب الصندوق
                }}
              >
                {countryKey[index]} {" || "} {country}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center flex-col items-center my-10">
          <button
            className="btn btn-primary"
            onClick={() => handelConvert(true)}
          >
            Convert
          </button>
          <h1 className="text-white text-2xl mt-10">
            {check &&
              `${selectedCountry} ${amount || " 1"}  || ${
                data && (data * +amount).toFixed(2)
              }  ${selectedCountry2}`}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default App;
