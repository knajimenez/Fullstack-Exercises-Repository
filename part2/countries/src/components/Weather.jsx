import { useState, useEffect } from 'react'
import weatherService from '../services/countries'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        weatherService.getWeather(country.capital[0])
            .then(data => setWeather(data))
    })

    if (weather === null) {
        return null
    }

    const weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`

    return (
        <div>
            <h2>Weather in {country.capital[0]}</h2>
            <div><b>Temperature:</b> {weather.main.temp} Celsius</div>
            <img src={weatherIcon} alt="Weather icon" />
            <div><b>Wind:</b> {weather.wind.speed} m/s</div>
        </div>
    )
}
export default Weather