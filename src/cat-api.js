import { refs, breedId } from './index.js';

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_ocuj1A4H8ghKfDbxZ2gghlptMTZix8FFA7xiBhJpDsyFKRSAhAAm7ItegZSezajL';

const BASE_URL = 'https://api.thecatapi.com/v1';
const COLLECTION_ENDPOINT = '/breeds';
const IMAGE_ENDPOINT = '/images/search';

export function fetchBreeds() {
  return axios.get(`${BASE_URL}${COLLECTION_ENDPOINT}`).then(response => {
    return response.data;
  });
}

export function fetchCatByBreed() {
  return axios
    .get(`${BASE_URL}${IMAGE_ENDPOINT}?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    });
}


