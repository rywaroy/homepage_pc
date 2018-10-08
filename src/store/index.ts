import Loading, { ILoading } from './loading';

interface IStore {
  loading: ILoading
}

class Store {
  public loadingStore: ILoading

  constructor() {
    this.loadingStore = new Loading();
  }
}

export default new Store();
export { IStore, ILoading };