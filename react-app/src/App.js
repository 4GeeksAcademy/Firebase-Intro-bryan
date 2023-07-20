import { useState, useEffect } from "react";
import WeatherPagination from "./pagination";
import "./App.css";
import "./gradient.css";
import { getGradient, WeatherIcon } from "./weatherUtils";

const backendHostUrl =
  'https://hyllus478-cautious-chainsaw-xjp7745g6vwhpgr4-5001.preview.app.github.dev/geeks-firebase-72e6d/us-central1/getDayWeather';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  const getWeatherData = (event) => {
    if (event.key === 'Enter') {
      setSearchAttempted(true);
      fetch(`${backendHostUrl}?city=${city}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log(data.data.location.name);
          setWeatherData(data);
          setCity('');
          console.log()
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={`container-sm position-absolute top-50 start-50 translate-middle ${weatherData && getGradient(weatherData?.data?.current?.condition?.text, weatherData?.data?.current?.is_day)}`}>
      <div className="search">
        <input
          className="input"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={getWeatherData}
        />
      </div>
  
      {weatherData === null ? (
        <div className="title-app">
          <p>WEATHER APP</p>
        </div>
      ) : (
        <div className="weather-data">
          <div className="icon">
            <WeatherIcon condition={weatherData.data.current.condition.text} />
          </div>
          <div className="city">
            <p>
              {weatherData.data.location.country === "United States"
                ? `${weatherData.data.location.name}, ${
                    weatherData.data.location.region || weatherData.data.location.country
                  }, United States`
                : `${weatherData.data.location.name}, ${weatherData.data.location.country}`}
            </p>
          </div>
          <div className="current-temp">
            <p>{Math.round(weatherData.data.current.temp_f)}°f</p>
          </div>
          <div className="condition">
            <p>{weatherData.data.current.condition.text}</p>
          </div>
          <div className="temp-data">
            <div className="low-temp">
              <p>
                <strong>L</strong> {Math.round(Number(weatherData.data.forecast.forecastday[0].day.mintemp_f))}
                °f
              </p>
            </div>
            <div className="high-temp">
              <p>
                <strong>H</strong> {Math.round(Number(weatherData.data.forecast.forecastday[0].day.maxtemp_f))}
                °f
              </p>
            </div>
            <div className="pag-condition">
              <WeatherPagination hour={currentHour} hourlyData={weatherData.data.forecast.forecastday[0].hour} />
            </div>
          </div>
        </div>
      )}
      {searchAttempted && !weatherData && !city && (
        <div className="city-not-found">
          <p>City not found</p>
        </div>
      )}
      {searchAttempted && !weatherData && (
        <div className="loading-spinner">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
