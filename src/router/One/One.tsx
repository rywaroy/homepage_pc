import * as React from 'react';
import { observer, inject } from 'mobx-react';
import axios from '../../utils/axios';
import { IStore } from '../../store';

@inject((store: IStore) => ({
  ...store.one
}))
@observer
export default class One extends React.Component {



  public componentDidMount() {
    this.getInfo();
  }

  public getInfo():void { // 获取one列表
    const one:any = this.props;
    console.log(one);
    axios.get(`/one/list?date=${one.date}`)
			.then(res => {
        // const data = res.data.data.content_list;
        // one.setList(data);
			});
  }

  public render() {
    return (
      <div>1111</div>
    )
  }
}