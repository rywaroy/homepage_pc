import { observable, action } from 'mobx';
import * as dayjs from 'dayjs';

export default class One {

  @observable public list: any = [];
  @observable public date: string = dayjs().format('YYYY-MM-DD');

  @action
  public setList(array: any[]) {
    this.list = array;
  }
}
