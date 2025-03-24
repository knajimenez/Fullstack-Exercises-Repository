import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Filter from './components/Filter'
import CountryList from './components/CountryList'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => { // Fetch data from the server
    console.log('effect')
    countryService
      .getCountries()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value)
  }

  console.log('render', filteredCountries)

  return (
    <div>
      <Filter searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange} />
      {searchQuery === '' ? null : (<CountryList countries={filteredCountries} showCountry={setSearchQuery} />)}

    </div>
  )
}

export default App
