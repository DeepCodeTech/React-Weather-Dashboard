import React from 'react';
import "./weatherDisplay.css";
import weatherImg from "../../assets/weather-gif.gif";
import humidityImg from "../../assets/weather.png";
import windImg from "../../assets/windy.png";

function WeatherDisplay({ weatherData }) {
  if (!weatherData) {
    return <div className="loading">Loading...</div>;
  }

  const { name, main, wind } = weatherData;

  return (
    <div className="weather-display">
      <img style={{height:"200px"}} alt='weather-gif' src={weatherImg} />
      <h1 style={{textAlign:"center",marginTop:"0px",fontSize:"50px"}}>{main.temp}°C</h1>
      <h1 style={{textAlign:"center",marginTop:"0px"}}>{name}</h1>
      <div className="weather-info">
        <div style={{display:"flex"}}>
          <img style={{height:"100px"}} alt='humidity-icon' src={humidityImg} />
          <div style={{display:"flex",flexDirection:"column"}}>
            <p className="humidity">{main.humidity}%</p>
            <p className="humidity">Humidity</p>
          </div>
        </div>
        <div style={{display:"flex"}}>
          <img style={{height:"100px"}} alt='wid-icon' src={windImg} />
          <div style={{display:"flex",flexDirection:"column"}}>
            <p className="wind-speed">{wind.speed} m/s</p>
            <p className="wind-speed">Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;