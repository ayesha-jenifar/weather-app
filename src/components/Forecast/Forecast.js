import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Forecast.css";

const Forecast = () => {
  const [forecast, setForecast] = useState({});

  //get city name, key and country from path variable
  const { cityKey, cityName, country } = useParams();

  //NEXT: FETCH 1 DAY FORECAST FROM FORECAST API

  //build api url with city key
  const uri2 = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityKey}?apikey=0yFAhwplY1xgOPBm2wAI8YprhYd62AFN&details=true`;

  //fetch forecast data and save it to a new variable
  useEffect(() => {
    fetch(uri2)
      .then((res) => res.json())
      .then((data) => setForecast(data));
  }, [uri2]);
console.log(forecast);
  return (
    <div className="page-middle">
      <div className="d-flex justify-content-center align-items-center">
        <div className="weather-card">
          {cityName && country && (
            <h1>
              {cityName}, {country}
            </h1>
          )}

          {forecast.DailyForecasts && (
            <h2>
              <span className="temp">
                {(
                  (forecast.DailyForecasts[0].Temperature.Maximum.Value -
                  32) * 5 / 9
                ).toFixed(0)}
              </span>

              {`°C`}
            </h2>
          )}

          {forecast.DailyForecasts && (
            <h5>
              {`Cloud Coverage: ${forecast.DailyForecasts[0].Day.CloudCover}%`}
            </h5>
          )}

          {forecast.Headline && (
            <h6>{`It is going to be ${forecast.Headline.Text}.`}</h6>
          )}

          {!forecast.DailyForecasts && (
            <p className="error-msg mt-4">
              Something went wrong! please try again later!
            </p>
          )}

          <a href="/" className="btn btn-primary mt-4">
            Back
          </a>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
