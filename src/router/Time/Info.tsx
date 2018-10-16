import * as React from 'react';
import { Row, Col } from 'antd';
import * as dayjs from 'dayjs';
import axios from '../../utils/axios';

interface IStage {
  load: boolean
  info: any
  performer: any[]
  comment: any
  tidbits: any[]
}

export default class MovieInfo extends React.Component<any, IStage> {

  state: IStage = {
    load: false,
    info: {},
    performer: [],
    comment: {
      mini: {},
      plus: {}
    },
    tidbits: [],
  }

  componentDidMount() {
		this.getInfo();
  }
  
  // 获取影片详情
	public getInfo() {
		axios.get('time/info', {
			params: {
				id: this.props.match.params.id,
			},
		}).then(res => {
			const data = res.data.data;
			this.setState({
				load: true,
				info: data.info,
				performer: data.performer,
				comment: data.comment,
				tidbits: data.tidbits,
			});
		});
  }

  // 跳转预告片外链
	public videoLink(url: string) {
		window.open(url);
  }
  
  // 渲染演员信息
	renderPerformer() {
		return (
			this.state.performer.map((type: any, indexType: number) => (
				<div key={indexType}>
					<div className="card__info-sub-title">{type.typeName}&nbsp;&nbsp;&nbsp;&nbsp;{type.typeNameEn}</div>
					<div className="card__info-performer-list f-cb">
						{type.persons.map((person: any, personType: number) => (
							<div className="card__info-performer-item fl" key={personType}>
								<div className="card__info-performer-avatar" style={{backgroundImage: `url(${person.image})`}} />
								<div className="card__info-performer-name">
									{person.name} <br />
									{person.nameEn}
								</div>
							</div>
						))}

					</div>
				</div>
			))
		);
  }
  
  // 渲染预告
	renderTidbits() {
		return (
			<Row gutter={16}>
				{this.state.tidbits.map((item: any, index: number) => (

					<Col span={6} xl={6} md={8} xs={12} key={index}>
						<div className="card__info-video-box" key={index}>
							<div className="card__info-video-link" onClick={() => this.videoLink(item.url)}>
								<img src={item.image} width={'100%'} alt="" />
								<div className="card__info-video-btn" />
							</div>
							<div className="card__info-video-title">{item.title}</div>
						</div>
					</Col>
				))}
			</Row>
		);
  }
  
  // 渲染评论
	renderComment() {
		return (
			<div>
				<div className="card__info-sub-title card__info-comment-title">精选影评</div>
				{this.state.comment.plus.list.map((item: any, index: number) => (
					<div className="comment__list-item" key={index}>
						<div className="comment__list-top f-cb">
							<div className="comment__list-avatar fl" style={{ backgroundImage: `url(${item.headImg})` }} />
							<div className="comment__list-name fl">{item.nickname}</div>
							<div className="comment__list-time fr">{dayjs(new Date(item.commentDate * 1000)).format('YYYY-MM-DD hh:mm:ss')}</div>
						</div>
						<div className="comment__list-content">{item.content}</div>
					</div>
				))}
				<div className="card__info-sub-title card__info-comment-title">短评</div>
				{this.state.comment.mini.list.map((item: any, index: number) => (
					<div className="comment__list-item" key={index}>
						<div className="comment__list-top f-cb">
							<div className="comment__list-avatar fl" style={{ backgroundImage: `url(${item.headImg})` }} />
							<div className="comment__list-name fl">{item.nickname}</div>
							<div className="comment__list-time fr">{dayjs(new Date(item.commentDate * 1000)).format('YYYY-MM-DD hh:mm:ss')}</div>
						</div>
						<div className="comment__list-content">{item.content}</div>
					</div>
				))}
			</div>
		);
	}
  
  render() {
		return (
			<div>
				<Row>
					<Col span={2} />
					<Col span={20}>
						{this.state.load
							?
							<div className="card__info-content">
								<div className="card__info-title">{this.state.info.basic.name} {this.state.info.basic.nameEn}</div>
								<div className="card__info-sub-title">剧情简介</div>
								<div className="card__info-sub-text">{this.state.info.basic.story}</div>

								{/* 渲染演员信息 */}
								<div className="card__info-title">演员列表</div>
								{this.renderPerformer()}

								{/* 渲染预告 */}
								<div className="card__info-title">预告片&拍摄花絮</div>
								<div className="card__info-video-list f-cb">
									{this.renderTidbits()}
								</div>

								{/* 渲染评论 */}
								<div className="card__info-title">评论</div>
								{this.renderComment()}
							</div>
							:
							null
						}
					</Col>
					<Col span={2} />
				</Row>
			</div>
		);
	}
}