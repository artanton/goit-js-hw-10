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

  return fetchCatByBreed(breedId)
    .then(data => {
      const imageMarkup = `<img src="${data[0].url}" alt="" width=400>`;

      const breedMarkup = 
      `<div>
      <h2>${data.name}</h2>
      <p>Description: ${data.description}</p>
      <p>Temperament: ${data.temperament}</p>
      </div>`;
      refs.catInfo.innerHTML = imageMarkup + breedMarkup;

      // console.log(data)
    })
    .catch(error => {
      console.log(error);
      refs.error.style.display = 'block';
    });
}

// function createMarkup (){

// }
