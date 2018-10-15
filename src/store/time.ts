import { observable, action } from 'mobx';

export default class Time {

  @observable public sell: any[] = [];
  @observable public hot: any[] = [];
  @observable public soon: any[] = [];

  @action
  setSell(array: any[]) {
    this.sell = array;
  }

  @action
  setHot(array: any[]) {
    this.hot = array;
  }

  @action
  setSoon(array: any[]) {
    this.soon = array;
  }

}