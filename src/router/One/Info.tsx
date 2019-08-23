import * as React from 'react';
import { Row, Col, Icon } from 'antd';
import axios from '../../utils/axios';

interface IOneInfo {
  type: string
  id: string
  content: string
  replyList: any[]
  title: string
  author: string
}

export default class OneInfo extends React.Component<any, IOneInfo> {
  constructor(props: any) {
    super(props);
    this.state = {
      	type: this.props.match.params.type,
		id: this.props.match.params.id,
		content: '',
		replyList: [],
		title: '',
		author: '',
    }
  }

  public componentDidMount() {
		let type: string = '';
		if (this.state.type === '1') {
			type = 'essay';
		}
		if (this.state.type === '2') {
			type = 'serialcontent';
		}
		if (this.state.type === '3') {
			type = 'question';
		}
		if (this.state.type === '4') {
			type = 'music';
		}
		if (this.state.type === '5') {
			type = 'movie';
		}
		this.getInfo(type);
		this.getComment(type === 'serialcontent' ? 'serial' : type);
  }
  
  public getInfo(type: string) {
    axios.get(`/one/info?id=${this.state.id}&type=${type}`)
			.then(res => {
				const data = res.data.data;
				let content = '';
				data.html_content.replace(/<div class="one-content-box">[\s\S]*?<\/div>/, (str: string) => {
					content = str;
				});
				this.setState({
					content,
					author: data.author_list[0].user_name,
					title: data.title,
				});
			});
  }

  public getComment(type: string) {
    axios.get(`/one/comment?id=${this.state.id}&type=${type}`)
			.then(res => {
				this.setState({
					replyList: res.data.data.data,
				});
			});
  }

  public render() {
    return (
      <div className="single__page">
				<Row>
					<Col span={2} />
					<Col span={20}>
						<div className="single__page-title">{this.state.title}</div>
						<div className="single__page-author">文/{this.state.author}</div>
						<div className="single__page-content" dangerouslySetInnerHTML={{ __html: this.state.content }} />
						<div className="comment__list">
							{
								this.state.replyList.map((item, index) => (
									<div className="comment__list-item" key={index}>
										<div className="comment__list-top f-cb">
											<div className="comment__list-avatar fl" style={{backgroundImage: `url(${item.user.web_url})` }} />
											<div className="comment__list-name fl">{item.user.user_name}</div>
											<div className="comment__list-time fr">{item.created_at}</div>
										</div>
										{
											item.quote ?
												<div className="comment__list-reply">{item.touser.user_name}: {item.quote}</div>
												:
												null
										}
										<div className="comment__list-content">{item.content}</div>
										<div className="comment__list-bot f-cb">
											<div className="comment__list-list fr">
												<Icon type="like" style={{ marginRight: '5px' }} />{item.praisenum}
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
    )
  }
}