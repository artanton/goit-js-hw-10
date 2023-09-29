import { fetchCatByBreed, fetchBreeds } from './cat-api';



export const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

// refs.select.addEventListener('input',showResult);
// console.dir(refs.select); 


fetchBreeds(refs);



