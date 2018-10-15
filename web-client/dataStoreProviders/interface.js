import md5 from 'md5';

class storageInterface {
  constructor(config) {
    this.config = {
      ...config,
      storageKey: config.storageKey ? config.storageKey : location.pathname, //.replace(/\//g, '%2F')
    };
    this.providerConfig = config.dataStoreProvider.options;
  }
  save() {/**/}

  createKey() {
    const timestamp = new Date().getTime();
    return md5(`${this.config.storageKey}${timestamp}`);
  }
}

export default storageInterface;
