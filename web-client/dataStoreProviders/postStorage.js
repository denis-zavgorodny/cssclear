import fetch from 'isomorphic-fetch';
import storageInterface from './interface';

class firebaseStorage extends storageInterface {
  save(data) {
    const key = this.createKey();
    fetch(this.providerConfig.URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        key,
        url: this.config.storageKey,
        data,
      }),
    }).then(() => {});
  }
}
export default firebaseStorage;
