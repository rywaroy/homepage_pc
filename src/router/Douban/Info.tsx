import * as React from 'react';
import { Row, Col, Pagination, Icon } from 'antd';
import axios from '../../utils/axios';
import './info.css';

interface IIntro {
  title: string
  aka: any[]
  summary: string
  languages: string
  genres: string
  durations: string
  casts: any[]
}

interface IState {
  isLoad: boolean
  intro: IIntro
  imageList: any[]
  imagePage: number
  imageLimit: number
  imageTotal: number
  commentList: any[]
  commentPage: number
  commentLimit: number
  commentTotal: number
}

export default class DoubanInfo extends React.Component<any, IState> {

  state = {
    isLoad: false,
    intro: {
      title: '',
      aka: [],
      summary: '',
      languages: '',
      genres: '',
      durations: '',
      casts: [],
    },
    imageList: [], // 图片列表
    imagePage: 1, // 图片页码
    imageLimit: 9, // 每页图片数量
    imageTotal: 0, // 图片总数
    commentList: [], // 图片列表
    commentPage: 1, // 图片页码
    commentLimit: 9, // 每页图片数量
    commentTotal: 0, // 图片总数
  };

  componentDidMount() {
		this.getInfo();
		this.getImage();
		this.getComment();
  }
  
  // 获取详情
	public getInfo() {
		axios.get('douban/info', {
			params: {
				id: this.props.match.params.id,
			},
		}).then(res => {
			this.setState({
				isLoad: true,
				intro: res.data.data,
			});
		});
  }
  
  // 获取图片
	public getImage() {
		axios.get('douban/image', {
			params: {
				id: this.props.match.params.id,
				page: this.state.imagePage,
				limit: this.state.imageLimit,
			},
		}).then(res => {
			const data = res.data.data;
			this.setState({
				imageList: data.photos,
				imageTotal: data.total,
			});
		});
  }
  
  // 获取评论
	public getComment() {
		axios.get('douban/comment', {
			params: {
				id: this.props.match.params.id,
				page: this.state.commentPage,
				limit: this.state.commentLimit,
			},
		}).then(res => {
			const data = res.data.data;
			this.setState({
				commentList: data.comments,
				commentTotal: data.total,
			});
		});
  }
  
  // 图片页码切换
	public imageChange(page: number) {
		this.setState({ imagePage: page }, () => {
			this.getImage();
		});
  }
  
  // 影评页码切换
	public commentChange(page: number) {
		this.setState({ commentPage: page }, () => {
			this.getComment();
		});
  }
  
  // 渲染
	renderItem(arr: any) {
		return (
			arr.map((item: any, index: number) => (
				<span key={index} className="douban__info-intro-item">{item}</span>
			))
		);
  }
  
  // 渲染人物
	renderPeople(arr: any) {
		return (
			arr.map((item: any, index: number) => {
				return (
					<div className="douban__info-p-item" key={index}>
						<img src={item.avatars.large} alt="" width={200} height={283} className="info-p-img"/>
						<div>{item.name}</div>
						<div>{item.name_en}</div>
					</div>
				);
			})
		);
  }
  
  // 渲染影评
	renderComment() {
		return (
			<div className="comment__list">
				{
					this.state.commentList.map((item: any, index: number) => (
						<div className="comment__list-item" key={index}>
							<div className="comment__list-top f-cb">
								<div className="comment__list-avatar fl" style={{ backgroundImage: `url(${item.author.avatar})` }} />
								<div className="comment__list-name fl">{item.author.name}</div>
								<div className="fl" style={{ lineHeight: '30px', marginLeft: '5px' }}>
									<Icon type="star" />
									{item.rating.value}
								</div>
								<div className="comment__list-time fr">{item.created_at}</div>
							</div>
							<div className="comment__list-content">{item.content}</div>
							<div className="comment__list-bot f-cb">
								<div className="comment__list-list fr">
									<Icon type="like" style={{ marginRight: '5px' }} />{item.useful_count}
								</div>
							</div>
						</div>
					))
				}
			</div>
		);
  }
  
  render() {
		return (
			<Row>
				<Col span={2}/>
				<Col span={20}>
					{this.state.isLoad ?
						<div className="douban__info">
							<div className="douban__title">{this.state.intro.title}</div>
							<div className="douban__en-title">{this.state.intro.aka[1]}</div>
							<div className="douban__info-summary">{this.state.intro.summary}</div>
							<div className="douban__intro">
								<div className="douban__cell">语言：{this.renderItem(this.state.intro.languages)}</div>
								<div className="douban__cell">类型：{this.renderItem(this.state.intro.genres)}</div>
								<div className="douban__cell">时长：{this.renderItem(this.state.intro.durations)}</div>
							</div>
							<div className="douban__subtitle">演员</div>
							<div className="f-cb">
								{this.renderPeople(this.state.intro.casts)}
							</div>
							<div className="douban__subtitle">图片</div>
							<div className="douban__info-images f-cb">
								{
									this.state.imageList.map((item: any, index: number) => (
										<div className="douban__info-image fl bg-cover" key={index} style={{ backgroundImage: `url(${item.image})` }} />
									))
								}
							</div>
							<div className="douban__info-page">
								<Pagination
									current={this.state.imagePage}
									pageSize={this.state.imageLimit}
									total={this.state.imageTotal}
									onChange={this.imageChange.bind(this)}
								/>
							</div>

							<div className="douban__subtitle">影评</div>
							{this.renderComment()}
							<div className="douban__info-page">
								<Pagination
									current={this.state.commentPage}
									pageSize={this.state.commentLimit}
									total={this.state.commentTotal}
									onChange={this.commentChange.bind(this)}/>
							</div>
						</div>
						:
						null
					}

				</Col>
				<Col span={2} />
			</Row>
		);
	}

}