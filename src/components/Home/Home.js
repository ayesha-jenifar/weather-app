import React from "react";
import CitySearch from "../CitySearch/CitySearch";

const Home = () => {
  return (
    <div className="page-middle">
      <div>
        <h2 className="mb-4">Search for weather forecast by city name</h2>
        <CitySearch />
      </div>
    </div>
  );
};

export default Home;
