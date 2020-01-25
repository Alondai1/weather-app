import types from "../types";
import weatherService from "../../services/WeatherService";



export const createAction = (data , type = '') => {
    return {
      type,
      data
    }
  };

  // -----------------------------------------------------------------------------
  export const getNextDaysForecast = (cityKey) => {    
    return (dispatch) => {
      return  weatherService.getNextDaysForecast(cityKey)
        .then(response => {          
          dispatch(createAction(response, types.FETCH_FORECAST))
        })
        .catch(error => {
          throw(error);
        });
    };
  };
  