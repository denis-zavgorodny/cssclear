class storageInterface {
  constructor(config) {
    this.config = {
      ...config,
      storageKey: config.storageKey.replace(/\//g, '%2F'),
    };
    this.providerConfig = config.dataStoreProvider.options;
  }
  save() {/**/}
}

export default storageInterface;
