import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Backdrop, CircularProgress } from '@mui/material';
import { getWeather, fetchSuggestions,getCurrentWeather } from '../../actions/weatherActions';
import WeatherDisplay from '../weatherDisplay/weatherDisplay';
import img from "../../assets/nav.png";
import './weatherDashboard.css';

function WeatherDashboard() {
    const [city, setCity] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();
    const weatherData = useSelector(state => state.weather.weatherData);
    const loading = useSelector(state => state.weather.loading);
    const error = useSelector(state => state.weather.error);
    const suggestions = useSelector(state => state.weather.suggestions);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch({ type: 'CLEAR_ERROR' });
      if (city.trim() !== '') {
        dispatch(getWeather(city));
        setInputFocused(false);
        setShowSuggestions(false);
      }
      else{
        setShowError(true);
      }
    };
  
    const handleChange = (e) => {
      const inputValue = e.target.value;
      setShowError(false);
      setCity(inputValue);
      if (inputValue.trim() !== '') {
        dispatch(fetchSuggestions(inputValue));
        setShowSuggestions(true);
        dispatch({ type: 'CLEAR_WEATHER_DATA' });
        dispatch({ type: 'CLEAR_ERROR' });
      } else {
        setShowSuggestions(false);
      }
    };
  
    const handleSelectSuggestion = (selectedCity) => {
      setCity(selectedCity);
      dispatch(getWeather(selectedCity));
      setShowSuggestions(false);
      setInputFocused(false);
    };

    const handleFocus = () => {
      setInputFocused(true);
    };

    const handleUseCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(getCurrentWeather(latitude, longitude));
          setInputFocused(false);
          setShowSuggestions(false);
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    };
    useEffect(() => {
      if (weatherData?.name) {
        setCity(weatherData.name);
      }
    }, [weatherData]);

    const onClearField= ()=>{
      setCity('');
      setInputFocused(false);
      setShowSuggestions(false);
      dispatch({ type: 'CLEAR_WEATHER_DATA' });
      dispatch({ type: 'CLEAR_ERROR' });
    }
  
    return (
      <div className="container">
        <h1 style={{marginBottm:"10px"}}>Weather Dashboard</h1>
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
          <input
            type="text"
            value={city}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Enter city name"
          />
          {city !== '' && <button title='clear data' className='clear-button' onClick={onClearField} />}
          <button title='search city' type="submit" className='search-button'/>
          </div>
          {inputFocused && 
          <button title='' type="button" className='btn-location' style={{display:"flex",flexDirection:"row"}} onClick={handleUseCurrentLocation}>
            <img alt='navigation' src={img}></img>
            <span>Use your Current Location</span>
          </button>
          }
          <span className={`show-error ${showError ? "active":""}`}>{showError ? "* Please Enter a valid city name":""}</span>
        </form>
        {showSuggestions && (
          <div className="suggestions">
            {suggestions?.map((suggestion) => (
              <div
                key={suggestion.id}
                className="suggestion"
                onClick={() => handleSelectSuggestion(suggestion.name)}
              >
                {suggestion.name}
              </div>
            ))}
          </div>
        )}
        {loading &&
          <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
          <Backdrop open={true} style={{ zIndex: 1, color: '#fff' }}>
            <CircularProgress color="inherit" />
          </Backdrop>
          </Grid>
        }
        {error && <p>{error}</p>}
        {!loading && !error && weatherData && <WeatherDisplay weatherData={weatherData} />}
      </div>
    );
}
  
export default WeatherDashboard;
