import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectRef = document.querySelector('.breed-select');
const articleConteinerRef = document.querySelector('.cat-info');
const loadRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');

errorRef.classList.add('is-hidden');
selectRef.classList.add('is-hidden');

selectRef.addEventListener('change', onSelectCat);
loadCatsInfo();

function loadCatsInfo() {
  fetchBreeds()
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
  fetchCatByBreed(selectedCat)
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
