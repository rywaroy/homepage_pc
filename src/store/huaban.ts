import { observable, action } from 'mobx';

export default class Huaban {

  @observable public list: any[] = [];
  @observable public opacity: number = 0;

  @action
  setList(array: any[]) {
    this.list = array;
  }

  @action 
  setOpacity(num: number) {
		this.opacity = num;
	}
}
