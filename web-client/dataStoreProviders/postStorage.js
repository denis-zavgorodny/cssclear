import fetch from 'isomorphic-fetch';
import storageInterface from './interface';

class firebaseStorage extends storageInterface {
  save(data) {
    const timestamp = new Date().getTime();
    const key = `${this.config.storageKey}_${timestamp}`;
    fetch(this.providerConfig.URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        key,
        data,
      }),
    }).then(() => {});
  }
}
export default firebaseStorage;
