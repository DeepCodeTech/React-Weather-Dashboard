import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import WeatherDashboard from './components/weatherDashboard/weatherDashboard';
import dayImg from "../src/assets/day-img.gif";
import nightImg from "../src/assets/night-img.gif";
import "./App.css";

function App() {
  const now = new Date();
  const currentHour = now.getHours();
  const body = document.querySelector('body');
  if (currentHour >= 6 && currentHour < 18) {
    body.style.backgroundImage = `url(${dayImg})`;
  } else {
    body.style.backgroundImage = `url(${nightImg})`;
  }
  return (
    <Provider store={store}>
      <div className="App">
        <WeatherDashboard />
      </div>
    </Provider>
  );
}

export default App;