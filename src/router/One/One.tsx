import * as React from 'react';
import { observer, inject } from 'mobx-react';
import axios from '../../utils/axios';
import oneStore from '../../store/one';
// import { IStore } from '../../store';

// @inject((store: IStore) => ({
//   ...store.one
// }))

interface IOne {
  one: oneStore
}

@inject('one')
@observer
export default class One extends React.Component<any, IOne> {

  public componentDidMount() {
    this.getInfo();
  }

  getInfo() { // 获取one列表
    // const one: object = this.props;
    // console.log(one.setList)
    // console.log(this.props.one);
    // console.log(one);
    axios.get(`/one/list?date=${this.props.one.date}`)
			.then(res => {
        const data = res.data.data.content_list;
        this.props.one.setList(data);
			});
  }

  public render() {
    return (
      <div>1111</div>
    )
  }
}