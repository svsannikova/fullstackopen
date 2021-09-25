import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ handleFilter, filter }) => {
  return (
    <div>
      find countries: <input value={filter} onChange={handleFilter} />
    </div>
  )
}

const Countries = ({ countriesToShow }) => {
  if (countriesToShow.length > 10) {
    return (<ul>Too many matches, specify another filter</ul>)
  }
  else if (countriesToShow.length <= 10 && countriesToShow.length > 1) {
    return (
    <>
    <ul>
      {countriesToShow.map(country =>
        <li key={country.name}>
          {country.name}</li>)}
    </ul>
    </>
    )
  }
  else {
    return (
      <>
      <ul>
        {countriesToShow.map(country =>
          <li key={country.name}>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>{country.languages.map(language =>
              <li key={language.name}>
                {language.name}</li>)}
            </ul>
            <img alt="flag" src={country.flag} width="150" height="70"/>
          </li>)}
      </ul>
      </>
    )
  }
}

const App = () => {
  const [countries, setCountry] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountry(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const filteredContries = newFilter.length > 0
    ? countries.filter(country => country.name.toUpperCase().includes(newFilter.toUpperCase()))
    : countries

  return (
    <div>
      <Filter handleFilter={handleFilterChange} filter={newFilter} />
      <Countries countriesToShow={filteredContries} />
    </div>
  )

}

export default App
