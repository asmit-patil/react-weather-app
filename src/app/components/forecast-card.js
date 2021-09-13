import React from "react";
import dayjs from "dayjs";
import { useWeather } from "../../service/api";
import "../../assets/css/forecast-card.css";

const Forecast = ({ location, units }) => {
  const { forecast, error } = useWeather("forecast", location, units);
  if (error || forecast === null) return <div>{error}</div>;
  return (
    <>
      <div className="forecast-card">
        <ul>
          {forecast.map((item, index) => {
            return (
              <li key={index}>
                <span>{dayjs(item.dt_txt).format("dddd")}</span>
                <span>{item.description}</span>
                <span>
                  {item.min}&deg; / {item.max}&deg;
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Forecast;
