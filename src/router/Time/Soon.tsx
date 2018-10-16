import * as React from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import { Card } from 'antd';
import timeStore from '../../store/time';
import loadingStore from '../../store/loading';
import axios from '../../utils/axios';

interface IProps extends RouteComponentProps {
  time: timeStore
  loading: loadingStore
}

@observer
export default class Soon extends React.Component<IProps, any> {
  
  componentDidMount() {
    this.props.time.soon.length === 0 && this.getList();
  }

  // 获取列表
	public getList() {
		this.props.loading.show();
		axios.get('time/soon')
			.then(res => {
				this.props.time.setSoon(res.data.data.attention);
				setTimeout(() => {
					this.props.loading.hide();
				}, 1000);
			});
  }
  
  // 链接到详情
	public linkMovieInfo(id: number) {
		this.props.history.push(`/movie/time/info/${id}`);
  }
  
  render() {
		return (
			<div className="card__tab f-cb">
				{
					this.props.time.soon.map((item, index) => (
						<Card title={item.title} style={{ width: '250px' }} key={index} className="fl card__movie-item" onClick={() => this.linkMovieInfo(item.id)}>
							<img src={item.image} alt="" width={200} height={300} />
							<div className="card__movie-title">{item.commonSpecial}</div>
							<div className="card__movie-intro">主演：{item.actor1} {item.actor2}</div>
							<div className="card__movie-intro">导演：{item.director}</div>
							<div className="card__movie-intro">上映时间：{item.rYear}-{item.rMonth}-{item.rDay}</div>
							<div className="card__movie-intro">类型：{item.type}</div>
						</Card>
					))
				}

			</div>
		);
	}
}