export { fetchBreeds, fetchCatByBreed };
const API_KEY = `live_xgJbTp7HDySw1CIfSTFuu3jEoMUIvb2dpZqt0pkmAkb3BCQRTNCyGVNsaqN2MP7l`;
const URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return fetch(`${URL}/breeds?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(
    `${URL}/images/search?api_key=${API_KEY}&breed_id=${breedId}&limit=1`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
