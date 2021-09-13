import React from "react";

const Difference = ({ defaultCity, cityTemp, newData }) => {
    let diff, higher, lower
    if (cityTemp === newData.temperature){
        diff = 0
    } else if (cityTemp > newData.temperature){
        diff = cityTemp - newData.temperature
        higher = defaultCity 
        lower =  newData.location
    } else {
        diff = newData.temperature - cityTemp 
        lower = defaultCity 
        higher =  newData.location
    }
    return (
        <>
        {(diff === 0) ? 
            <div className="difference">
                Temperature in {defaultCity} and {newData.location} is similar.
            </div>
        :
            <div className="difference">
                {higher} is <span>{diff}&deg;</span> hotter than {lower}.
            </div>}
        </>
    );
  };
  
  export default Difference;