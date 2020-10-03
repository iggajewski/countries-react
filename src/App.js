import React from 'react';
import countriesAll from "./countriesAll.json";
import './App.css';

function Search() {
  return (
    <div id="search">
      <input id="searchBar"></input>
      <select id="regionSelect">
        <option>Select a region...</option>
        <option>Africa</option>
        <option>Americas</option>
        <option>Asia</option>
        <option>Europe</option>
        <option>Oceania</option>
        <option>Polar</option>
      </select>
    </div>
  );
}

function CountryElem(country) {
  return (
    <div className="country">
      <img src={country.flag} alt="flag"/>
      <h2>{country.name}</h2>
      <div className="countryData">
        <p><b>Population:  </b>{country.population}</p>
        <p><b>Region:  </b>{country.region}</p>
        <p><b>Capital:  </b>{country.capital}</p>
      </div>
    </div>
  );
}

function CountryList(props) {
  return (
    <div className="countryList">
      {props.countries.map(CountryElem)}
    </div>
  );
}

function App() {
  return (
    <div id="page">
      <Search/>
      <CountryList countries={countriesAll}/>
    </div>
  );
}
export default App;
