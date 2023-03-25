import { useEffect, useState } from "react";
import countryService from "./../services/countries";
import Weather from "./Weather";

const SingleCountry = ({ country }) => {
  const [weatherData, setWeatherData] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    countryService
      .getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
      .then((res) => {
        setWeatherData({
          capital: res.name,
          temp: (res.main.temp - 273.15).toFixed(2),
          icon: res.weather[0].icon,
          wind: res.wind.speed,
        });
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, [country]);

  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h4>languages</h4>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <Weather weatherData={weatherData} error={error} />
    </>
  );
};

export default SingleCountry;
