const CountryList = ({ countries, showCountry }) =>
  countries.map((country) => (
    <p key={country.name.common}>
      {country.name.common}{" "}
      <button onClick={() => showCountry(country.name.common)}>show</button>
    </p>
  ));

export default CountryList;
