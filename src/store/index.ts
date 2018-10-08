import Loading, { ILoading } from './loading';

interface IStore {
  loading: ILoading
}

class Store {
  public loading: ILoading

  constructor() {
    this.loading = new Loading();
  }
}

export default new Store();
export { IStore, ILoading };