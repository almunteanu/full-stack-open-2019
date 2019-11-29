import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://api.weatherstack.com/current';
const ACCESS_KEY = '3875f402a62f9375a2275cd2783931f2';

const WeatherInfo = ({ city }) => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}?access_key=${ACCESS_KEY}&query=${city}`)
      .then(res => setInfo(res.data.current));
  }, [city]);

  if (!info) return null;

  return (
    <div>
      <h3>{`Weather in ${city}:`}</h3>
      <img
        src={info.weather_icons[0]}
        alt={info.weather_descriptions[0]}
        style={{ height: 35 }}
      />
      <div>{`Temperature: ${info.temperature}° Celsius`}</div>
      <div>{`Wind: ${info.wind_speed} km/h, direction: ${info.wind_dir}`}</div>
    </div>
  );
};

export default WeatherInfo;
