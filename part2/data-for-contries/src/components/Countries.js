import CountryList from "./CountryList";
import SingleCountry from "./SingleCountry";

const Countries = ({ countries, showCountry }) => {
  if (countries.length) {
    if (countries.length === 1) {
      return <SingleCountry country={countries[0]} />;
    } else if (countries.length <= 10) {
      return <CountryList countries={countries} showCountry={showCountry} />;
    } else if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }
  } else {
    return null;
  }
};

export default Countries;
