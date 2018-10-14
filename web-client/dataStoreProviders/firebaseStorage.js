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
    const timestamp = new Date().getTime();
    this.storage.ref(`${this.config.storageKey}_${timestamp}`).set(data);
  }
}
export default firebaseStorage;
