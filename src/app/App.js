import React from "react";
import Search from "./components/search";
import ForecastCard from "./components/forecast-card";
import WeatherCard from "./components/weather-card";
import config from "../config";
import "../assets/css/App.css";

function App() {

  // declared and assigned required variables
  const location =  config.currentCity ? config.currentCity :"Galway";
  const units = config.unit ? config.unit : "metric";
  const [isNewLocation, setIsNewLocation] = React.useState(false);
  const [cityTemp, setCityTemp] = React.useState(null);
  const [newLocation, setNewLocation] = React.useState("");


  // to handle the search event
  const handleLocationChange = (event) => {
    if (event.key === "Enter") {
      let enteredData = event.target.value.trim();
      setNewLocation(enteredData);
      setIsNewLocation(true);
    }
  };

  
  return (
    <div className="container">
      <div className="row">
        <Search onLocationChange={handleLocationChange} />
        <div className="shadow">
          <WeatherCard location={location} units={units} setCityTemp={setCityTemp}/>
          <ForecastCard location={location} units={units} />
        </div>
        <div>
          {isNewLocation ? (
            <>
              <WeatherCard location={newLocation} units={units} isNewLocation={isNewLocation} cityTemp={cityTemp} defaultCity={location}></WeatherCard>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
