import axios from 'axios'
const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY

const getCountries = () => {
  const request = axios.get(countryUrl)
  return request.then(response => response.data)
}

const getWeather = (capital) => {
  const request = axios.get(`${weatherUrl}?q=${capital}&units=metric&appid=${weatherApiKey}`)
  return request.then(response => response.data)
}

export default { getCountries, getWeather }