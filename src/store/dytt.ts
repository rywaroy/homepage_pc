import { observable, action } from 'mobx';

interface IInfo {
  title: string
  time: string
  intro: string
  content: string
}

export default class Dytt {

  @observable public data: any[] = [];
  @observable public info: IInfo = {
    title: '',
    time: '',
    intro: '',
    content: '',
  };

  @action
  setData(data: any[]) {
    this.data = data;
  }

  @action 
  setInfo(data: any) {
		this.info = data;
	}
}