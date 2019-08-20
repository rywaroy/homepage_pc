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
		const { page, limit } = this.props.article;
		axios.get('article', {
			params: {
				page,
				limit,
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
		this.props.history.push(`/article/` + id);
	}

	render() {
		const { list, total, limit, page } = this.props.article;

		return (
			<Row>
				<Col span={2} />
				<Col span={20}>
					<div className="article f-cb">
						{
							list.map((item: IList, index: number) => (
								<div className="article__item" key={index} onClick={() => {this.linkInfo(item.id)}}>
									<div className="article__img-box">
										<div className="article__img bg-cover" style={{backgroundImage: `url(${item.img})`}} />
									</div>
									<div className="article__content">
									 	<div className="article__top f-cb">
								 			
								 			<div className="article__time fl">{dayjs(item.updatedAt).format('YYYY-MM-DD')}</div>
											<div className="article__tag fl">「{item.tag.title}」</div>
											<div className="article__watch fr">{item.watch}</div>
										</div>
										<h3 className="article__name text-ovh">{item.title}</h3>
										<p className="article__intro">{item.intro}</p>
									</div>
								</div>
							))
						}
						{
							total / limit <= 1 ?
								null
								:
								<div className="article__page">
									<Pagination
										current={page}
										total={total}
										pageSize={limit}
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