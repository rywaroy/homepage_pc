import { observable, action } from 'mobx';

export default class Douban {
  @observable public list: any[] = []
	@observable public page: number = 1;
	@observable public limit: number = 9;
	@observable public total: number = 0;
  @observable public city: string = '杭州';
  
  @action
  setList(data: any[]) {
		this.list = data;
  }
  
  @action
  setTotal(data: number) {
		this.total = data;
	}

  @action
  setPage(data: number) {
		this.page = data;
	}

  @action
  setCity(data: string) {
		this.city = data;
	}
}