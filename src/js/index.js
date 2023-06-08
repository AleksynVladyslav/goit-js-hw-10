const API_KEY = `live_xgJbTp7HDySw1CIfSTFuu3jEoMUIvb2dpZqt0pkmAkb3BCQRTNCyGVNsaqN2MP7l`;
const URL = 'https://api.thecatapi.com/v1';

const selectRef = document.querySelector('.breed-select');
const articleConteinerRef = document.querySelector('.cat-info');
const loadRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');

errorRef.classList.add('is-hidden');
selectRef.classList.add('is-hidden');

selectRef.addEventListener('change', onSelectCat);
fetchBreeds();

function fetchBreeds() {
  fetch(`${URL}/breeds?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(catsInfo => {
      selectRef.classList.remove('is-hidden');
      loadRef.classList.add('is-hidden');
      createOptions(catsInfo);
    })
    .catch(() => {
      selectRef.classList.add('is-hidden');
      errorRef.classList.remove('is-hidden');
      loadRef.classList.add('is-hidden');
    });
}

function createOptions(catsInfo) {
  const murkup = catsInfo
    .map(catInfo => {
      return `<option value = ${catInfo.id}>${catInfo.name} </option>`;
    })
    .join('');
  selectRef.innerHTML = murkup;
}

function onSelectCat(event) {
  articleConteinerRef.innerHTML = ' ';
  const selectedCat = event.target.value;
  fetch(
    `${URL}/images/search?api_key=${API_KEY}&breed_id=${selectedCat}&limit=1`
  )
    .then(response => response.json())
    .then(cat => {
      const name = cat[0].breeds[0].name;
      const url = cat[0].url;
      const description = cat[0].breeds[0].description;
      const temperament = cat[0].breeds[0].temperament;
      return { name, url, description, temperament };
    })
    .then(data => {
      articleConteinerRef.innerHTML = '';
      createArticleMurcup(data);
    })
    .catch(() => errorRef.classList.remove('is-hidden'));
}

function createArticleMurcup({ name, url, description, temperament }) {
  loadRef.classList.remove('is-hidden');
  setTimeout(() => {
    loadRef.classList.add('is-hidden');

    articleConteinerRef.innerHTML = `<img src = ${url} alt = ${name} width='400' ><div class= "conteiner"><h1 class ="name"> ${name}</h1><p class ="description">  ${description}</p><p class ="temperament"> <span>Temperament:</span> ${temperament}</P></div>`;
  }, 1000);
}
