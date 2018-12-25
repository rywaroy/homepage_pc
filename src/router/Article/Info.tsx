import * as React from 'react';
import { Row, Col, Input, Button, message } from 'antd';
import * as dayjs from 'dayjs';
import axios from '../../utils/axios';
import { IInfoState, IComment } from '../../model/article';

const { TextArea } = Input;

export default class Info extends React.Component<any, IInfoState> {

	state = {
		title: '',
		content: '',
		comment: [], // 评论列表
		name: '', // 评论的昵称
		commentContent: '', // 评论的内容
	};

	componentDidMount() {
		this.getInfo();
		this.getComment();
	}

	// 获取详情
	public getInfo() {
		axios.get(`article/${this.props.match.params.id}`)
			.then(res => {
				const data = res.data.data;
				this.setState({
					title: data.title,
					content: data.content,
				});
			});
	}

	// 获取评论
	public getComment() {
		axios.get(`article/${this.props.match.params.id}/comment`)
			.then(res => {
				this.setState({
					comment: res.data.data,
				});
			});
	}

	// 提交评论
	public sendComment() {
		if (!this.state.commentContent) {
			message.error('请输入评论内容');
			return;
		}
		axios.post(`article/${this.props.match.params.id}/comment`, {
			name: this.state.name,
			content: this.state.commentContent,
		}).then(res => {
			message.success('提交成功');
			this.getComment();
			this.setState({
				name: '',
				commentContent: '',
			});
		});
	}

	render() {
		return (
			<Row>
				<Col span={2} />
				<Col span={20}>
					<div className="single__page">
						<div className="single__page-title">{this.state.title}</div>
						<div className="single__page-content" dangerouslySetInnerHTML={{ __html: this.state.content }} />
					</div>
					<div className="comment__list">
						{
							this.state.comment.map((item: IComment, index: number) => (
								<div className="comment__list-item" key={index}>
									<div className="comment__list-top f-cb">
										<div className="comment__list-name fl">{item.name}</div>
										<div className="comment__list-time fr">{dayjs(item.time).format('YYYY-MM-DD HH:mm')}</div>
									</div>
									<div className="comment__list-content">{item.content}</div>
								</div>
							))
						}
					</div>
					<div className="comment__form">
						<div className="comment__form-title">发表评论</div>
						<div className="comment__form-name">
							<Input placeholder="昵称，非必填" size="large" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
						</div>
						<div className="comment__form-content">
							<TextArea placeholder="评论内容" autosize={{ minRows: 2, maxRows: 10 }} value={this.state.commentContent}  onChange={e => this.setState({ commentContent: e.target.value })} />
						</div>
						<Button type="primary" onClick={() => this.sendComment()}>提交</Button>
					</div>
				</Col>
				<Col span={2} />
			</Row>
		);
	}
}