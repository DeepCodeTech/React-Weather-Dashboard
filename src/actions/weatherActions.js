import axios from 'axios';
import { GET_WEATHER, SET_LOADING, SET_ERROR,SET_SUGGESTIONS,CLEAR_WEATHER_DATA,CLEAR_ERROR } from './types'; // Corrected import

const apiKey = 'c6b32b34779cb78a64ae0c2d2e48a247';

export const getWeather = (city) => async dispatch => {
  try {
    dispatch(setLoading());
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    dispatch({
      type: GET_WEATHER,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: 'City not found. Please enter a valid city name.'
    });
  }
};
export const getCurrentWeather = (lat,lon) => async dispatch => {
    try {
      dispatch(setLoading());
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
      dispatch({
        type: GET_WEATHER,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: 'City not found. Please enter a valid city name.'
      });
    }
  };

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

export const fetchSuggestions = (query) => async (dispatch) => {
    try {
      const response = await axios.get(`https://www.accuweather.com/web-api/autocomplete?query=${query}&language=en-gb`);
      dispatch({
        type: SET_SUGGESTIONS,
        payload: response.data
      });
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      dispatch({
        type: SET_SUGGESTIONS,
        payload: null
      });
    }
};
export const clearWeatherData = () => {
    return {
      type: CLEAR_WEATHER_DATA
    };
};
  
export const clearError = () => {
    return {
      type: CLEAR_ERROR
    };
};