import types from "../types";
import userService from "../../services/UserService";

export const createAction = (data, type = "") => {
  return {
    type,
    data,
  };
};

//   ------------------------------------------------------------------

export const setCurrentCity = city => {
  return dispatch => {
    return dispatch(createAction(city, types.SET_CURRENTCITY));
  };
};

export const getFavorites = () => {
  return dispatch => {
    return userService
      .getFavorites()
      .then(response => {
        dispatch(createAction(response, types.FETCH_FAVORITES));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const toggleFavorite = city => {
  return dispatch => {
    return userService
      .toggleFavorite(city)
      .then(response => {
        dispatch(createAction(response, types.TOGGLE_FAVORITE));
      })
      .catch(error => {
        throw error;
      });
  };
};
