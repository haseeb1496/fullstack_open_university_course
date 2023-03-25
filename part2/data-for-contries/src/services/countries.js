import axios from "axios";

const baseURL = "https://restcountries.com/v3.1/all";
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${process.env.REACT_APP_API_KEY}`;

const getAll = () => axios.get(baseURL).then((res) => res.data);

const getWeather = (lat, lon) =>
  axios
    .get(weatherURL.replace("{lat}", lat).replace("{lon}", lon))
    .then((res) => res.data);

export default { getAll, getWeather };
