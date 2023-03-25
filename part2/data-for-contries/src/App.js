import { useState, useEffect } from "react";
import countryService from "./services/countries";
import Countries from "./components/Countries";

const App = () => {
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesFound, setCountriesFound] = useState([]);

  useEffect(() => {
    countryService.getAll().then((res) => setCountries(res));
  }, []);

  const handleChange = (evt) => {
    const name = evt.target.value;
    setCountryName(name);
    const searchedCountries = name
      ? countries.filter((country) =>
          country.name.common.toLowerCase().includes(name.toLowerCase())
        )
      : [];
    setCountriesFound(searchedCountries);
  };

  const showCountry = (name) => {
    const countryFound = countriesFound.find(
      (country) => country.name.common === name
    );
    setCountriesFound([countryFound]);
  };

  return (
    <>
      <p>
        find countries <input value={countryName} onChange={handleChange} />
      </p>
      <Countries
        countries={countriesFound}
        showCountry={(name) => showCountry(name)}
      />
    </>
  );
};

export default App;
