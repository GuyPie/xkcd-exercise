import axios from 'axios';

export function getComics(startIndex, endIndex) {
  const promises = [];

  for (let i = startIndex; i < endIndex; i++) {
    promises.push(axios.get(`/${i}/info.0.json`));
  }

  return Promise.all(promises);
}
