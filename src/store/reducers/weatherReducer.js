import types from "../types";

export default function 
    weatherReducer(state = {}, action) {
    switch (action.type) {
        case types.FETCH_FORECAST:
        return {...state , nextDaysForecast: action.data}; 
      default:
        return state;
    }
  }