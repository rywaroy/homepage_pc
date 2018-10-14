import * as React from 'react';
import axios from 'axios';
import { Row, Col, Icon } from 'antd';
import * as dayjs from 'dayjs';
import './info.css';

interface IState {
  content: string
  image: string
  title: string
  comment: any[]
}

export default class ZhihuInfo extends React.Component<any, IState> {
  state: IState = {
    content: '',
    image: '',
    title: '',
    comment: [],
  }

  componentDidMount() {
		this.getInfo();
		this.getComment();
  }
  
  public getInfo() {
		axios.get(`https://api.isoyu.com/index.php/api/Zhihu/news?id=${this.props.match.params.id}`)
			.then(res => {
				if (res.data.code === 1) {
					const body = res.data.data.body;
					const content = body.replace(/http\w{0,1}:\/\/pic/g, 'https://images.weserv.nl/?url=pic');
					this.setState({
						content,
						image: res.data.data.image,
						title: res.data.data.title,
					});
				}
			});
  }
  
  public getComment() {
		axios.get(`https://api.isoyu.com/index.php/api/Zhihu/new_comment?id=${this.props.match.params.id}`)
			.then(res => {
				if (res.data.code === 1) {
					this.setState({
						comment: res.data.data.comments,
					});
				}
			});
  }
  
  render() {
		return (
			<div className="single__page">
				<Row>
					<Col span={2} />
					<Col span={20}>
						<div className="single__page-title">{this.state.title}</div>
						<img src={this.state.image} alt="" style={{ marginTop: '20px' }} />
						<div className="single__page-content" dangerouslySetInnerHTML={{ __html: this.state.content }} />
						<div className="comment__list">
							{
								this.state.comment.map((item: any, index: number) => (
									<div className="comment__list-item" key={index}>
										<div className="comment__list-top f-cb">
											<div className="comment__list-avatar fl" style={{ backgroundImage: `url(${item.avatar})` }} />
											<div className="comment__list-name fl">{item.author}</div>
											<div className="comment__list-time fr">{dayjs(item.time * 1000).format('YYYY-MM-DD hh:mm:ss')}</div>
										</div>
										<div className="comment__list-content">{item.content}</div>
										<div className="comment__list-bot f-cb">
											<div className="comment__list-list fr">
												<Icon type="like" style={{ marginRight: '5px' }} />{item.likes}
											</div>
										</div>
									</div>
								))
							}
						</div>
					</Col>
					<Col span={2} />
				</Row>
			</div>
		);
	}
}