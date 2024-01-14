import countryService from './services/countries'
import { useEffect, useState } from 'react'
// import axios from 'axios'

function App() {
  const [allCountries, setAllCountries] = useState(null)
  const [value, setValue] = useState('')
  const [results, setResults] = useState(null)
  const [country, setCountry] = useState(null)
  // const [capital, setCapital] = useState(null)
  // const [shorthand, setShorthand] = useState(null)
  // const [weather, setWeather] = useState(null)

  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    countryService
      .getAll()
      .then(countriesData => {
        const countriesCommonNames = countriesData.map((country) => {
          return country["name"]["common"]
        })
        setAllCountries(countriesCommonNames)
      })
  }, [])

  useEffect(() => {
    if (country) {
      countryService
        .getCountry(country)
        .then(data => {
          const languages = data["languages"]
          let languageArray = [];
          for (var language in languages) {
            languageArray.push(languages[language])
          }
          const result = <>
            <h1>{data["name"]["common"]}</h1>
            <p>capital {data["capital"]}</p>
            <p>area {data["area"]}</p>
            <h2>languages:</h2>
            <ul>
              {languageArray.map((language) => {
                return <li key={language}>{language}</li>
              })}
            </ul>
            <img src={data["flags"]["png"]} alt={data["flags"]["alt"]} />
          </>
          setValue(country)
          setResults(result)
          // setCapital(data["capital"])
          // setShorthand(data["fifa"])
        })
    }
  }, [country])

  // useEffect(() => {
  //   if (capital) {
  //     console.log(capital)
  //     axios
  //       .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital},${shorthand}&limit=1&appid=${api_key}`)
  //       .then(response => response.data)
  //       .then((capitalData) => {
  //         console.log(capitalData)
  //         const data = capitalData.map((data) => {
  //           console.log(data)
  //           return {'lat': data["lat"], 'lon': data["lon"]}
  //         })
  //         return data
  //       })
  //       .then((location) => {
  //         console.log('Location', location)
  //         axios
  //           .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${location["lat"]}&lon=${location["lon"]}&appid=${api_key}`)
  //           .then(response => response.data)
  //           .then((data) => {
  //             setWeather(data)
  //           })
  //       })
  //   }
  // }, [capital])

  const handleQueryChange = (event) => {
    setValue(event.target.value)
    filterResults(event.target.value)
  }

  const filterResults = (query) => {
    const result = allCountries.filter((country) => {
      return country.toLowerCase().includes(query.toLowerCase())
    })
    const length = result.length
    if (length > 10) {
      setResults(<p>Too many matches, specify another filter</p>)
    } else if (length === 1) {
      setCountry(result[0])
    } else if (length === 0) {
      setResults(<p>There is no country for this filter</p>)
    } else {
      const countries = result.map((country) => {
        return <li key={country}>{country}<button onClick={() => setCountry(country)}>show</button></li>
      })
      setResults(<ul>{countries}</ul>)
    }
  }

  return (
    <>
      <div>
        find countries <input value={value} onChange={handleQueryChange}/>
      </div>
      <div>
        {results ?
        (results)
        :
        (null)}
      </div>
      {/* <div>
        {weather ? (weather) : (null)}
      </div> */}
    </>
  )
}

export default App
