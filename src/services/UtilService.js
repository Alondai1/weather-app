export default {
  store,
  load,
  getUserLocation,
};

function store(key, any) {
  localStorage[key] = JSON.stringify(any);
}

function load(key) {
  var str = localStorage[key] || "null";
  return JSON.parse(str);
}

function getUserLocation() {
  if (!navigator.geolocation) {
    return;
  } else {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
}
