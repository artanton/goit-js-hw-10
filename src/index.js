import { fetchCatByBreed, fetchBreeds } from './cat-api';

export const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

refs.loader.style.display = 'none';
refs.error.style.display = 'none';
refs.error.style.color = 'red';

refs.catInfo.style.display = 'flex';
refs.catInfo.style.gap = '40px';
refs.catInfo.style.position = 'fixed';
refs.catInfo.style.top = '100px';

function makeSelectOptions() {
  fetchBreeds()
    .then(data => {
      const selectMarkup = data
        .map(breed => {
          return `<option value=${breed.id}>${breed.name}</option>`;
        })
        .join(' ');
      refs.select.insertAdjacentHTML('beforeend', selectMarkup);
    })
    .catch(error => {
      console.log(error);
      return (refs.error.style.display = 'block');
    });
}
makeSelectOptions();

refs.select.addEventListener('input', showResult);

export let breedId = '';

function showResult(e) {
  breedId = e.target.value;
  refs.loader.style.display = 'block';

  return fetchCatByBreed(breedId)
    .then(data => {
      refs.loader.style.display = 'none';
      createMarkup(data);
    })
    .catch(error => {
      console.log(error);
      refs.loader.style.display = 'none';
      refs.error.style.display = 'block';
    });
}

function createMarkup(data) {
  const imageMarkup = `<img src="${data[0].url}" alt="" width=400>`;

  const breedMarkup = `<div style="max-width: 400px;">
  <h2>${data[0].breeds[0].name}</h2>
  <p>Description: ${data[0].breeds[0].description}</p>
  <p>Temperament: ${data[0].breeds[0].temperament}</p>
  </div>`;
  refs.catInfo.innerHTML = imageMarkup + breedMarkup;
}
