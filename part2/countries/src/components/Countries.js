import React, { useState } from 'react';
import Country from './Country';
import WeatherInfo from './WeatherInfo';

const Countries = ({ countries }) => {
  const [displayCountryInfo, setDisplayCountryInfo] = useState(
    countries.reduce((accObj, country) => {
      accObj[country.name] = false;
      return accObj;
    }, {}),
    []
  );

  const renderCountries = () =>
    countries.map(country => (
      <li key={country.name}>
        {country.name}{' '}
        <button
          type="button"
          onClick={() =>
            setDisplayCountryInfo({
              ...displayCountryInfo,
              [country.name]: !displayCountryInfo[country.name],
            })
          }
        >
          info
        </button>
        {displayCountryInfo[country.name] && (
          <>
            <Country country={country} />
            <WeatherInfo city={country.capital} />
          </>
        )}
      </li>
    ));

  if (countries.length === 0) {
    return <div>No country was found!</div>;
  }

  if (countries.length > 1 && countries.length < 10) {
    return <ul>{renderCountries()}</ul>;
  }

  return (
    <>
      <Country country={countries[0]} />
      <WeatherInfo city={countries[0].capital} />
    </>
  );
};

export default Countries;
