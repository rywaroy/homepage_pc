import { observable, action } from 'mobx';
import { IList } from '../model/album';

export default class Album {

  @observable public list: IList[] = [];

  @action
  setList(array: IList[]) {
    this.list = array;
  }
}