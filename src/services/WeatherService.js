import axios from "axios";
import utilService from "./UtilService";

const API_KEY = " m9lAGyPN4SxWZAFBBSghB43DxuBB1VDj ";

export default {
  getNextDaysForecast,
  getSearchResults,
  getUserCity,
  getCityInfo,
};

async function getNextDaysForecast(cityId) {
  try {
    const res = await axios.get(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityId}?apikey=${API_KEY}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
}

async function getSearchResults(value) {
  try {
    const res = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${value}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
}

async function getUserCity() {
  const coords = await utilService.getUserLocation();
  if (!coords) return;
  const lat = coords.coords.latitude;
  const lon = coords.coords.longitude;
  try {
    const res = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat}%2C${lon}`
    );
    const cityObj = {
      id: res.data.ParentCity.Key,
      description: res.data.Country.EnglishName,
      title: res.data.EnglishName,
      isFav: false,
    };
    return cityObj;
  } catch (err) {
    throw err;
  }
}

async function getCityInfo(cityId) {
  try {
    const res = await axios.get(
      `https://dataservice.accuweather.com/currentconditions/v1/${cityId}?apikey=${API_KEY}`
    );
    return res.data[0];
  } catch (err) {
    throw err;
  }
}
