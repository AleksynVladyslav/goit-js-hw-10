import { fetchBreeds, fetchCatByBreed } from './cat-api';
export { selectRef };
const selectRef = document.querySelector('.breed-select');
const articleConteinerRef = document.querySelector('.cat-info');

fetch(
  'https://api.thecatapi.com/v1/breeds?api_key=live_xgJbTp7HDySw1CIfSTFuu3jEoMUIvb2dpZqt0pkmAkb3BCQRTNCyGVNsaqN2MP7l'
)
  .then(response => response.json())
  .then(cats => {
    fetchBreeds(cats);
  })
  .catch(err => console.log(console.log(err)));

selectRef.addEventListener('change', onSelectCat);

function onSelectCat(event) {
  const selectedCat = event.target.value;
  console.log(selectedCat);
  fetchCatByBreed(selectedCat);
  fetch(
    `https://api.thecatapi.com/v1/images/search?api_key=live_xgJbTp7HDySw1CIfSTFuu3jEoMUIvb2dpZqt0pkmAkb3BCQRTNCyGVNsaqN2MP7lbreed_ids=${selectedCat}&limit=1`
  )
    .then(response => response.json())
    .then(cats => fetchCatByBreed(cats))
    .then(cat => console.log(createArticleMurcup(cat)))
    .catch(err => console.log(err));
}

function createArticleMurcup(data) {
  articleConteinerRef.innerHTML = `<img src = ${data.url}><h1>${data.name}</h1><p>${data.description}</p><p>${data.temperament}</P>`;
}
