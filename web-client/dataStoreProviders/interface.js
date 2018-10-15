import md5 from 'md5';

class storageInterface {
  constructor(config) {
    this.config = {
      ...config,
      location: config.location ? config.location : location.pathname, //.replace(/\//g, '%2F')
    };
    this.providerConfig = config.dataStoreProvider.options;
  }
  save() {/**/}

  createKey() {
    const timestamp = new Date().getTime();
    return md5(`${this.config.location}${timestamp}`);
  }
}

export default storageInterface;
