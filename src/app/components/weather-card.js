import React from "react";
import dayjs from "dayjs";
import { useWeather } from "../../service/api";
import "../../assets/css/weather-card.css";
import Difference from "./difference";

const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

function WeatherCard ({ location, units, isNewLocation, setCityTemp, cityTemp, defaultCity }){
  const { weather } = useWeather("weather", location, units);
  if (weather === null){ 
    return <div className="difference">Weather data not found for {location} city. Please check city name and try again !!</div>
  }
  else{
    if(!isNewLocation){
      setCityTemp(weather.temperature)
    }
    return (
      weather?
      <>
        <div className="weather-card">
          <div className="sm">
            <p className="font-semibold">
              {weather.location}, {weather.country}
            </p>
            <p className="desc">
              {dayjs(weather.date).format("dddd")},{" "}
              {dayjs
                .utc(weather.date)
                .utcOffset(weather.timezone)
                .format("h:mm A")}
              , {weather.description}
            </p>
          </div>
          <div className="temp">
            <span>
              {weather.temperature}&deg;
              <span className="weather">
                Feels like {weather.feels_like}&deg;
              </span>{" "}
            </span>
          </div>
          <div className="text-indigo">
            <span>{weather.wind_speed}m/s Winds</span>
            <span>{weather.humidity}% Humidity</span>
          </div>
          {
            isNewLocation&&
            <Difference defaultCity={defaultCity} cityTemp={cityTemp} newData={weather}></Difference>
          }
        </div>
      </>
      :<></>
    );
  }
};

export default WeatherCard;
