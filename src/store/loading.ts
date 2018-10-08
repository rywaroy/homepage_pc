import { observable, action } from 'mobx';

export interface ILoading {
  active:boolean
}

export default class Loading  {

  @observable public active:boolean

  constructor() {
    this.active = false;
  }

  @action public show():void {
    this.active = true;
  }

  @action public hide():void {
    this.active = false;
  }
}