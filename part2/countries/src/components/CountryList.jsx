import Weather from './Weather'

const CountryList = ({ countries, showCountry }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => (
          <div key={country.cca3}>
            {country.name.common}
            <button onClick={() => showCountry(country.name.common)}>Show</button>
          </div>
        ))}
      </div>
    )
  }

  if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital: {country.capital[0]}</div>
        <div>Population: {country.population}</div>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} width="150" />

        <Weather country={country} />
      </div>
    )
  }
}

export default CountryList