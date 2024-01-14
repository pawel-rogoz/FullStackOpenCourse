import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

// axios
// .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
// .then(response => response.data)
// .then((countryData) => {
//   console.log(countryData)
//   const languages = countryData["languages"]
//   let languagesValues = [];
//   for (var key in languages) {
//     languagesValues.push(languages[key])
//   }
//   return <div>
//     <h1>{countryData["name"]["common"]}</h1>
//     <p>capital {countryData["capital"]}</p>
//     <p>area {countryData["area"]}</p>
//     <h2>Languages</h2>
//     <ul>
//       {languagesValues.map((language) => {
//         return <li key={language}>{language}</li>
//       })}
//     </ul>
//     <img src={countryData["flags"]["png"]} alt={countryData["flags"]["alt"]}/>

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getCountry = (country) => {
    const request = axios.get(`${baseUrl}/name/${country}`)
    return request.then(response => response.data)
}

export default { getAll, getCountry }