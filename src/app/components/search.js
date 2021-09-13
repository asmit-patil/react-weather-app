import React from "react";
import "../../assets/css/search.css";

const Search = (props) => {
  const { onLocationChange } = props;

  return (
    <div className="search">
      <input
        className="input"
        type="search"
        placeholder="Search for another city to check teamperature difference ....."
        onKeyDown={onLocationChange}
      />
    </div>
  );
};

export default Search;
