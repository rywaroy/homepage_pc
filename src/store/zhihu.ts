import { observable, action } from 'mobx';

export default class Zhihu {
  @observable public list: any[] = [];

  @action
  setList(array: any[]) {
    this.list = array;
  }
}