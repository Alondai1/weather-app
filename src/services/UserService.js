import utilService from "./UtilService";

export default {
  getFavorites,
  toggleFavorite,
  
};

const gFavorites = [];


function getFavorites() {
  let userFavorites = utilService.load("favorites");
  if (!userFavorites) userFavorites = gFavorites;
  utilService.store("favorites", userFavorites);
  return new Promise((resolve, reject) => {
    resolve(userFavorites);
  });
}

function toggleFavorite(city) {
  let userFavorites = utilService.load("favorites");
  if (!userFavorites) userFavorites = gFavorites;
  const idx = userFavorites.findIndex(fav => fav.id === city.id);
  if (idx < 0) {
    city.isFav = true;
    userFavorites.push(city);
  } else {
    userFavorites.splice(idx, 1);
  }
  utilService.store("favorites", userFavorites);
  return new Promise((resolve, reject) => {
    resolve(userFavorites);
  });
}
