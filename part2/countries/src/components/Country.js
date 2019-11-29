import React from 'react';

const Country = ({ country }) => (
  <div>
    <h2>{country.name}</h2>
    <img
      src={country.flag}
      alt={`Flag of ${country.name}`}
      style={{ height: 75 }}
    />
    <div>Capital: {country.capital}</div>
    <div>Population: {country.population.toLocaleString('en')}</div>
    <h3>Languages:</h3>
    <ul>
      {country.languages.map(language => (
        <li key={language.name}>{language.name}</li>
      ))}
    </ul>
  </div>
);

export default Country;
