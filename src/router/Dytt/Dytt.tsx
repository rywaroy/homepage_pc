import * as React from 'react';
import { Row, Col } from 'antd';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import axios from '../../utils/axios';
import dyttStore from '../../store/dytt';
import loadingStore from '../../store/loading';
import './dytt.css';

interface IDytt extends RouteComponentProps {
  dytt: dyttStore
  loading: loadingStore
}

@inject('dytt', 'loading')
@observer
export default class Dytt extends React.Component<IDytt, any> {
  componentDidMount() {
		this.props.dytt.data.length === 0 && this.getInfo();
  }
  
  // 获取数据
	public getInfo() {
		this.props.loading.show();
		axios.get('dytt/all', {
			params: {
				page: 1,
			},
		}).then(res => {
			this.props.dytt.setData(res.data.data);
			this.props.loading.hide();
		});
  }
  
  // 链接到详情页
	public linkInfo(data: any) {
		this.props.dytt.setInfo(data);
		this.props.history.push(`/movie/dytt/info`);
  }
  
  render() {
		return (
			<Row>
				<Col span={2}/>
				<Col span={20}>
					<div className="dytt">
						{/* {
							this.props.dytt.data.map((item, index) => (
								<div className="dytt__item" key={index} onClick={() => { this.linkInfo(item.content); }}>
									<div className="dytt__top f-cb">
										<div className="dytt__name fl">{item.title}</div>
										<div className="dytt__time fr">{item.time}</div>
									</div>
									<div className="dytt__content">{item.intro}</div>
								</div>
							))
						} */}
					</div>
				</Col>
				<Col span={2} />
			</Row>
		);
	}
}