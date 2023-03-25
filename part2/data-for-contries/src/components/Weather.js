const Weather = ({ weatherData, error }) =>
  error ? (
    <p>{error}</p>
  ) : weatherData ? (
    <>
      <h2>Weather in {weatherData.capital}</h2>
      <p>temperature {weatherData.temp} Celcius</p>
      <img
        alt="Weather icon"
        src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
      />
      <p>wind {weatherData.wind} m/s</p>
    </>
  ) : null;

export default Weather;
