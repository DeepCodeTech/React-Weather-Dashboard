import { GET_WEATHER, SET_LOADING, SET_ERROR,SET_SUGGESTIONS,CLEAR_WEATHER_DATA,CLEAR_ERROR } from '../actions/types';

const initialState = {
  weatherData: null,
  loading: false,
  error: null,
  suggestions:null
};

const weatherReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_WEATHER:
      return {
        ...state,
        weatherData: action.payload,
        loading: false,
        error: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SET_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.payload
      };
    case CLEAR_WEATHER_DATA:
        return {
          ...state,
          weatherData: null
        };
    case CLEAR_ERROR:
        return {
          ...state,
          error: null
        };
    default:
      return state;
  }
};
export default weatherReducer;
