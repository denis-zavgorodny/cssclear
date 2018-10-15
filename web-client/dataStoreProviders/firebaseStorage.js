import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import storageInterface from './interface';

class firebaseStorage extends storageInterface {
  constructor(...options) {
    super(...options);
    firebase.initializeApp(this.providerConfig);
    firebase.auth().onAuthStateChanged(() => {
      this.storage = firebase.database();
    });
  }
  save(data) {
    const key = this.createKey();
    this.storage.ref(key).set({
      url: this.config.storageKey,
      data,
    });
  }
}
export default firebaseStorage;
