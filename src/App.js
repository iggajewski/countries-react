import React from 'react';
import { useState, useEffect } from 'react'
import countriesAll from "./countriesAll.json";
import './App.css';

function Search(props) {
  let [searchInput, setSearchInput] = useState("");

  function handleSearchInput(event) {
    setSearchInput(event.target.value);
  }

  useEffect(() => props.search(searchInput), [searchInput]);

  return (
    <input 
      type="search"
      id="searchBar"
      value={searchInput}
      onInput={handleSearchInput}
      placeholder="Search"
    />
  );
}

function SelectRegion(props) {
  let [region, setRegion] = useState("");
  
  function handleSetRegion(event) {
    setRegion(event.target.value)
  }

  useEffect(() => props.select(region), [region])

  return (
    <select id="regionSelect" value={region} onChange={handleSetRegion}>
      <option value="">Select a region...</option>
      <option value="Africa">Africa</option>
      <option value="Americas">Americas</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
      <option value="Polar">Polar</option>
    </select>
  );
}

function CountryElem(props) {
  return (
    <div className="country" onClick={() => props.onSelect(props.country)}>
      <img src={props.country.flag} alt="flag"/>
      <h2>{props.country.name}</h2>
      <div className="countryData">
        <p><b>Population:  </b>{props.country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        <p><b>Region:  </b>{props.country.region}</p>
        <p><b>Capital:  </b>{props.country.capital}</p>
      </div>
    </div>
  );
}

function CountryList(props) {
  let [listOfCountries, setListOfCountries] = useState(countriesAll);

  function searchCountries(keyword) {
    if(keyword === "") {
      setListOfCountries(countriesAll);
      return;
    }
  
    let newCountryList = []
    for(let i = 0; i < countriesAll.length; ++i) {
      if(countriesAll[i].name.toLowerCase().includes(keyword.toLowerCase())
        || countriesAll[i].capital.toLowerCase().includes(keyword.toLowerCase())) {
        newCountryList.push(countriesAll[i])
      }
    }
    setListOfCountries(newCountryList);
  }

  function filterCountries(keyword) {
    if(keyword === "") {
      setListOfCountries(countriesAll);
      return;
    }

    let newCountryList = []
    for(let i = 0; i < countriesAll.length; ++i) {
      if(keyword === countriesAll[i].region) {
        newCountryList.push(countriesAll[i])
      }
    }
    setListOfCountries(newCountryList);
  }


  return (
    <div className="countryListElem">
      <div id="navigationBar">
        <Search search={searchCountries}/>
        <SelectRegion select={filterCountries}/>
      </div>
      <div className="countryList"> 
        {listOfCountries.map(country => <CountryElem country={country} onSelect={country => props.select(country)}/>)}
      </div>
    </div>
    
  );
}

function IndividualCountry(props) {
  let borderCountries = [];
  for(let i = 0; i < props.country.borders.length; ++i){
    for(let j = 0; j < countriesAll.length; ++j) {
      if(props.country.borders[i] === countriesAll[j].alpha3Code) {
        borderCountries.push(countriesAll[j]);
        break;
      }
    }
  }
  console.log(borderCountries)
    
  return (
    <div className="individualCountryElem">
      <button className="backButton" 
              onClick={() => props.changeSelection(null)}
        >← Back
      </button>

      <div className="individualCountry">
        <img src={props.country.flag} alt="flag"/>

        <div className="details">
          <h2>{props.country.name}</h2>

          <div className="IndCntrData">
            <div className="IndCntrData1">
              <p><b>Native Name:  </b>{props.country.nativeName}</p>
              <p><b>Population:  </b>{props.country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              <p><b>Region:  </b>{props.country.region}</p>
              <p><b>Subregion:  </b>{props.country.subregion}</p>
              <p><b>Capital:  </b>{props.country.capital}</p>
            </div>

            <div className="IndCntrData2">
              <p><b>Top Level Domain:  </b>{props.country.topLevelDomain[0]}</p>
              <p><b>Currencies:  </b>
                {props.country.currencies.map((cur) => cur.name + (cur === props.country.currencies[props.country.currencies.length - 1] ? "" : ", "))}</p>
              <p><b>Languages:  </b>
                {props.country.languages.map((lang) => lang.name + (lang === props.country.languages[props.country.languages.length - 1] ? "" : ", "))}</p>
            </div>
          </div>

          <ul className="borderCountries">
            <span><b>Border Countries: </b></span>
            {(borderCountries.length) ? "" : <span><b>None</b></span>}
            {borderCountries.map(neighbor => <li><button className="neighborButton" onClick={() => props.changeSelection(neighbor)}>{neighbor.name}</button></li>)}
          </ul>
        </div> 
      </div>
    </div>
    
  );
}

function App() {
  let [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div id="page">
      <div id="topbar">
        <h1>Where in the world?</h1>
      </div>
      {selectedCountry ? 
        <IndividualCountry country={selectedCountry} changeSelection={country => setSelectedCountry(country)}/>
      : <CountryList select={country => setSelectedCountry(country)}/>
      }   
    </div>
  );
}

export default App;

/*

TODO:

Level 5 challenge

    Implement the colour scheme picker

Beyond - ideas for more work

    easy: Add a "random country" button
    Advanced: Make a quiz where a country card is shown and 5 random capitals - the user must correctly guess the correct capital.
        use a separate component to develop this without affecting your main app
    Advanced: Make a game where two countries are named and the user tries to navigate from one country to another via their bordering countries in the fewest possible steps.
    record "favourite" countries
        Find a way to persist these even after the browser tab is closed
    See the existing CYF Group project: Countries for more ideas

*/