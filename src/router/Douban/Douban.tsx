import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Row, Col, Card, Pagination, Input } from 'antd';
import doubanStore from '../../store/douban';
import axios from '../../utils/axios';
import './douban.css';

const Search = Input.Search;

interface IProps extends RouteComponentProps {
  douban: doubanStore
}

@inject('douban', 'loading')
@observer
export default class Douban extends React.Component<any, IProps> {
  componentDidMount() {
		this.props.douban.list.length === 0 && this.getList();
  }
  
  public getList() {
    this.props.loading.show();
		axios.get('douban/list', {
			params: {
				city: this.props.douban.city,
				page: this.props.douban.page,
				limit: this.props.douban.limit,
			},
		}).then(res => {
      if (document.documentElement) {
        document.documentElement.scrollTop = 64;
      }
      if (document.body.scrollTop) {
        document.body.scrollTop = 64;
      }
			setTimeout(() => {
				this.props.loading.hide();
				this.props.douban.setList(res.data.data.subjects);
				this.props.douban.setTotal(res.data.data.total);
			}, 1000);
		});
  }

  	// 页面切换
  public _onChange(page: number) {
    this.props.douban.setPage(page);
		this.getList();
  }
  
  // 搜索
	public search(value: string) {
		this.props.douban.setCity(value);
		this.getList();
  }
  
  // 跳转
  public link(id: number) {
		this.props.history.push(`/douban/${id}`);
  }
  
  // 渲染列表
	renderList() {
		return (
			this.props.douban.list.map((item: any, index: number) => (
				<Card title={item.title} style={{ width: 290 }} className="fl douban__list-item" key={item.id} onClick={() => this.link(item.id)}>
					<img src={item.images.large} width="240" height="336" alt="" style={{ display: 'block' }}/>
					<div className="douban__list-content">
						<div className="douban__cast">演员表：{this.renderCast(item.casts)}</div>
						<div className="douban__cast">导演：{this.renderCast(item.directors)}</div>
						<div className="douban__cast">类型：{this.renderGenres(item.genres)}</div>
						<div className="douban__cast">评分：{item.rating.average}</div>
						<div className="douban__cast">时长：{item.durations[0]}</div>
						<div className="douban__cast">上映时间：{item.mainland_pubdate}</div>
					</div>
				</Card>
			))
		);
  }
  
  // 渲染演员
	renderCast(array: any[]) {
		return (
			array.map((item: any, index: number) => (
				<a href={item.alt} className="douban__cast-item" target="_blank" key={index}>{item.name}</a>
			))
		);
  }
  
  // 渲染类型
	renderGenres(array: any[]) {
		return (
			array.map((item: any, index: number) => (
				<span className="douban__cast-item" key={index}>{item}</span>
			))
		);
  }
  
  render() {
		return (
			<Row>
				<Col span={1} />
				<Col span={22}>
					<div className="douban__top f-cb">
						<Search
							placeholder="输入城市名字"
							onSearch={this.search.bind(this)}
							style={{ width: 200 }}
							className="fl"
							defaultValue={this.props.douban.city}
						/>
						<a href="http://www.wandoujia.com/apps/com.douban.movie" target="_blank" className="fr">来源</a>
					</div>
					<div className="douban__content f-cb">
						<div className="douban__list">
							{this.renderList()}
						</div>
					</div>
					<Pagination
						defaultCurrent={1}
						current={this.props.douban.page}
						total={this.props.douban.total}
						pageSize={this.props.douban.limit}
						onChange={this._onChange.bind(this)}
					/>

				</Col>
				<Col span={1} />
			</Row>
		);
	}
}