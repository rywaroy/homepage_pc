import * as React from 'react';
import { Row, Col } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import axios from '../../utils/axios';
import albumStore from '../../store/album';
import { IList } from '../../model/album';
import './album.css';

interface IPorps extends RouteComponentProps {
  album: albumStore
}

@inject('album')
@observer
export default class Album extends React.Component<IPorps, any> {

	componentDidMount() {
		this.props.album.list.length === 0 && this.getList();
	}

	// 获取相册列表
	public getList() {
		axios.get('album')
			.then(res => {
				this.props.album.setList(res.data.data);
			});
	}

	// 跳转到相册详情页
	public linkInfo(id: number) {
		this.props.history.push(`/album/${id}`);
	}

	render() {
		return (
			<Row>
				<Col span={2} />
				<Col span={20}>
					<div className="album f-cb">
						{
							this.props.album.list.map((item: IList, index: number) => (
								<div className="album__item" key={index} onClick={() => this.linkInfo(item.id)}>
									<div className="album__item-img bg-cover" style={{ backgroundImage: 'url(' + item.img + ')' }} />
									<div className="album__item-title">{item.title}</div>
								</div>
							))
						}
					</div>
				</Col>
				<Col span={2} />
			</Row>
		);
	}
}
