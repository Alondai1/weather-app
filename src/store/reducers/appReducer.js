import types from "../types";

export default function 
    appReducer(state = {cuurentCity:null , favorites:[] }, action) {
    switch (action.type) {
        case types.SET_CURRENTCITY:
        return {...state , currentCity: action.data}; 
        case types.FETCH_FAVORITES:          
        return {...state , favorites: action.data}; 
        case types.TOGGLE_FAVORITE:          
        return {...state , favorites: action.data}; 
      default:
        return state;
    }
  }