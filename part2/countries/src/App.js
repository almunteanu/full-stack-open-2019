import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data));
  }, []);

  const filterCountries = () => {
    return countries.filter(country =>
      country.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const render = () => {
    if (filter.length > 0) {
      if (filterCountries().length > 10) {
        return (
          <div>
            Too many search results. Please provide a more specific search
            query.
          </div>
        );
      }
      return <Countries countries={filterCountries()} />;
    }

    return null;
  };

  return (
    <div>
      Search for country{' '}
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      {render()}
    </div>
  );
};

export default App;
