export { fetchBreeds, fetchCatByBreed };
import { selectRef } from './index.js';

function fetchBreeds(catsInfo) {
  const murkup = catsInfo
    .map(catInfo => {
      return `<option value = ${catInfo.id}>${catInfo.name} </option>`;
    })
    .join('');
  selectRef.innerHTML = murkup;
}

function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/breeds/search?api_key=live_xgJbTp7HDySw1CIfSTFuu3jEoMUIvb2dpZqt0pkmAkb3BCQRTNCyGVNsaqN2MP7lbreed_ids=${breedId}limit=1`
  )
    .then(response => response.json())
    .then(e => e.find(cat => cat.id == breedId))
    .catch(err => console.log(err));
}
