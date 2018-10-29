import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Row, Col, Pagination } from 'antd';
import * as dayjs from 'dayjs';
import articleStore from '../../store/article';
import axios from '../../utils/axios';
import { IList } from '../../model/article';
import './article.css';

interface IPorps extends RouteComponentProps {
  article: articleStore
}

@inject('article')
@observer
export default class Article extends React.Component<IPorps, any> {
  componentDidMount() {
		this.props.article.list.length === 0 && this.getList();
	}

	// 获取文章列表
	getList() {
		axios.get('article/list', {
			params: {
				page: this.props.article.page,
				limit: this.props.article.limit,
			},
		}).then(res => {
			const data = res.data.data;
			this.props.article.setList(data.list);
			this.props.article.setTotal(data.total);
		});
	}

	// 页面切换
	_onChange(page: number) {
		this.props.article.setPage(page);
		if (document.documentElement) {
      document.documentElement.scrollTop = 64;
    }
    if (document.body.scrollTop) {
      document.body.scrollTop = 64;
    }
		this.getList();
	}

	// 跳转详情
	linkInfo(id: number) {
		this.props.history.push(`/blog/article/info/` + id);
	}

	render() {
		return (
			<Row>
				<Col span={2} />
				<Col span={20}>
					<div className="article">
						{
							this.props.article.list.map((item: IList, index: number) => (
								<div className="article__item" key={index} onClick={() => {this.linkInfo(item.id)}}>
									<div className="article__top f-cb">
										<div className="article__name fl">{item.title}</div>
										<div className="article__time fr">{dayjs(item.time).format('YYYY-MM-DD')}</div>
										<div className="article__tag fr" style={{ backgroundColor: item.tag.color }}>{item.tag.title}</div>
										{
											item.top > 0 ?
												<div className="article__tag fr" style={{ backgroundColor: '#FFD700' }}>置顶</div>
												:
												null
										}
									</div>
									<div className="article__content">{item.intro}</div>
									<div className="article__bot f-cb">
										<div className="article__watch fr">{item.watch}</div>
									</div>
								</div>
							))
						}
						{
							this.props.article.total / this.props.article.limit <= 1 ?
								null
								:
								<div className="article__page">
									<Pagination
										current={this.props.article.page}
										total={this.props.article.total}
										pageSize={this.props.article.limit}
										onChange={this._onChange.bind(this)}
									/>
								</div>
						}
					</div>
				</Col>
				<Col span={2} />
			</Row>
		);
	}
}