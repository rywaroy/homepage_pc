import * as React from 'react';
import { Row, Col } from 'antd';
import axios from '../../utils/axios';
import './markdown.css';

interface IState {
  content: string
}

export default class LearnInfo extends React.Component<any, IState> {
  state: IState = {
    content: '',
  }

  componentDidMount() {
		this.getInfo();
  }
  
  // 获取详情
	getInfo() {
		axios.get('learn/info', {
			params: {
				id: this.props.match.params.id,
			},
		}).then(res => {
			const data = res.data.data;
			this.setState({
				content: data.html,
			});
		});
  }
  
  render() {
		return (
			<Row>
				<Col span={2} />
				<Col span={20}>
					<div className="single__page">
						<div className="single__page-content markdown-body" dangerouslySetInnerHTML={{ __html: this.state.content }} />
					</div>
				</Col>
				<Col span={2} />
			</Row>
		);
	}
}