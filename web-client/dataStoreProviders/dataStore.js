class dataStore {
  constructor(store) {
    this.store = store;
  }

  save(data) {
    this.store.save(data);
  }
}
export default dataStore;
