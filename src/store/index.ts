import Loading, { ILoading } from './loading';
import One, { IOne } from './one';

interface IStore {
  loading: ILoading
  one: IOne
}

class Store {
  public loading: ILoading
  public one: IOne

  constructor() {
    this.loading = new Loading();
    this.one = new One();
  }
}

export default new Store();
export { IStore, ILoading, IOne };