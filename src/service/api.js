import dayjs from 'dayjs';
import useSWR from 'swr';
import fetch from './fetchData';
import config from '../config';

// declare and assigned values to required variables
const apiUrl = 'https://api.openweathermap.org/data/2.5';
const apiKey = config.API_KEY 
const refreshInterval = config.refreshInterval ? config.refreshInterval : 60000 

// to retrieve the weather data with swr hook
export function useWeather(endpoint, location, units) {
  const { data, error } = useSWR(
    `${apiUrl}/${endpoint}/?q=${location}&units=${units}&APPID=${apiKey}`,
    fetch,{
      refreshInterval: refreshInterval
    }
  );


  // to check if it's weather data or forecast data
  if (endpoint === 'weather') {
    return {
      weather: data?.weather ? mapResponseProperties(data) : null,
      isError: error,
    };
  } else {
    return {
      forecast:
        data?.list && Object.entries(data).length
          ? data.list
              .filter((f) => f.dt_txt.match(/09:00:00/))
              .map(mapResponseProperties)
          : null,
      isError: error,
    };
  }
}


// to normalise response 
function mapResponseProperties(data) {
  const mapped = {
    location: data.name,
    condition: data.cod,
    country: data.sys.country,
    date: data.dt * 1000, // convert from seconds to milliseconds
    description: data.weather[0].description,
    feels_like: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    icon_id: data.weather[0].id,
    sunrise: data.sys.sunrise * 1000, // convert from seconds to milliseconds
    sunset: data.sys.sunset * 1000, // convert from seconds to milliseconds
    temperature: Math.round(data.main.temp),
    timezone: data.timezone / 3600, // convert from seconds to hours
    wind_speed: Math.round(data.wind.speed),
  };

  // Add extra properties for the five day forecast: dt_txt, icon, min, max
  if (data.dt_txt) {
    mapped.dt_txt = data.dt_txt;
  }

  if (data.timezone) {
    mapped.currentTime = dayjs
      .utc(mapped.date)
      .utcOffset(mapped.timezone)
      .format();
    mapped.sunrise = dayjs
      .utc(mapped.sunrise)
      .utcOffset(mapped.timezone)
      .format();
    mapped.sunset = dayjs
      .utc(mapped.sunset)
      .utcOffset(mapped.timezone)
      .format();
    mapped.isDay =
      mapped.currentTime > mapped.sunrise && mapped.currentTime < mapped.sunset
        ? true
        : false;
  }

  if (data.weather[0].description) {
    mapped.description =
      data.weather[0].description.charAt(0).toUpperCase() +
      data.weather[0].description.slice(1);
  }

  if (data.main.temp_min && data.main.temp_max) {
    mapped.max = Math.round(data.main.temp_max);
    mapped.min = Math.round(data.main.temp_min);
  }

  // remove undefined fields
  Object.entries(mapped).map(
    ([key, value]) => value === undefined && delete mapped[key],
  );

  return mapped;
}
