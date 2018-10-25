import { observable, action } from 'mobx';
import { IList } from '../model/learn';
 
export default class Learn {

  @observable public list: IList[] = [];
  @observable public page: number = 1;
  @observable public limit: number = 10;
  @observable public total: number = 0;

  @action
  setList(array: IList[]) {
    this.list = array;
  }

  @action 
  setPage(num: number) {
		this.page = num;
  }
  
  @action 
  setTotal(num: number) {
		this.total = num;
	}
}