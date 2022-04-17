import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CitySearch.css";

const CitySearch = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [cityInfo, setCityInfo] = useState({});
  const [cityKey, setCityKey] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  //FETCH CITY KEY FROM LOCATION API

  //build uri
  const uri1 = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=0yFAhwplY1xgOPBm2wAI8YprhYd62AFN&q=${city}`;

  //fetch data from location api
  useEffect(() => {
    fetch(uri1)
      .then((res) => res.json())
      .then((data) => {
        setCityKey(data[0].Key);
        setCityInfo(data[0]);
      });
  }, [uri1]);

  const { EnglishName, Country } = cityInfo;
  console.log(cityInfo);

  //catch the input from input field
  const handleOnChange = (e) => {
    setCity(e.target.value);
  };

  //navigate to forecast page
  const handleOnClick = () => {
    if (cityKey) {
      navigate(`/forecast/${cityKey}/${EnglishName}/${Country.EnglishName}`);
    } else {
      //show error msg if input is not valid
      !cityKey && setErrorMsg(`No city found by the name ${city}!`);
      !city && setErrorMsg("Please enter a city name!");
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleOnClick();
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="searchBox">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="City Name"
            onChange={handleOnChange}
            onKeyPress={handleEnterKeyPress}
          />
          <span
            className="btn btn-primary"
            id="basic-addon2"
            onClick={handleOnClick}
          >
            Search
          </span>
        </div>

        <p className="error-msg">{errorMsg}</p>
      </div>
    </div>
  );
};

export default CitySearch;
