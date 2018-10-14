import fetch from 'isomorphic-fetch';

const storageSelector = 'STORAGE_SELECTOR';

function getFromStorage(key) {
  let data;
  try {
    data = localStorage.getItem(key);
    return JSON.parse(data);
  } catch (error) {
    return false;
  }
}
function setToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    return false;
  }
}

class selectorProvider {
  constructor(pathToJSON) {
    this.selectors = [];
    this.pathToJSON = pathToJSON;
  }
  fetchData() {
    return new Promise((resolve, reject) => {
      const data = getFromStorage(storageSelector);
      if (data) {
        resolve(data);
      } else {
        fetch(this.pathToJSON).then(response => response.json()).then((dataJSON) => {
          setToStorage(storageSelector, dataJSON);
          resolve(dataJSON);
        }).catch((error) => {
          reject(error);
        });
      }
    });
  }
}

export default selectorProvider;
