import { observable, action } from 'mobx';
import * as dayjs from 'dayjs';

export interface IOne {
  list: any[]
  date: string
  setList: (array: any[]) => void
}

export default class One {

  @observable public list: any = [];
  @observable public date: string = dayjs().format('YYYY-MM-DD');

  // constructor() {
  //   this.list = [];
  //   this.date = dayjs().format('YYYY-MM-DD');
  // }

  @action public setList(array: any[]) {
    this.list = array;
  }
}