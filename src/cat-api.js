import {refs} from './index.js';

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_ocuj1A4H8ghKfDbxZ2gghlptMTZix8FFA7xiBhJpDsyFKRSAhAAm7ItegZSezajL';

const BASE_URL = 'https://api.thecatapi.com/v1/images/search';

export function fetchBreeds() {
  axios
    .get(BASE_URL)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.data;
    })

    .then(data => {
        const container = document.createElement('div'); 
        data.forEach(element => {
          const option = document.createElement('option');
          option.value = element.id;
          option.textContent = element.name;
          container.appendChild(option); 
        });
        refs.select.appendChild(container); 
       
      })
    .catch(error => {
      console.error(error);
    });
}
