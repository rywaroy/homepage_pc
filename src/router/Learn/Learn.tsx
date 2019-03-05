import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Row, Col, Pagination } from 'antd';
import axios from '../../utils/axios';
import * as dayjs from 'dayjs';
import learnStore from '../../store/learn';
import { IList } from '../../model/learn';
import './learn.css';

interface IProps extends RouteComponentProps {
  learn: learnStore,
}

@inject('learn')
@observer
export default class Learn extends React.Component<IProps, any> {
  componentDidMount() {
		this.props.learn.list.length === 0 && this.getList();
  }
  
  // 获取文章列表
	public getList() {
		axios.get('learn', {
			params: {
				page: this.props.learn.page,
				limit: this.props.learn.limit,
			},
		}).then(res => {
			const data = res.data.data;
			this.props.learn.setList(data.list);
			this.props.learn.setTotal(data.total);
		});
  }
  
  // 页面切换
  public _onChange(page: number) {
		this.props.learn.setPage(page)
		if (document.documentElement) {
      document.documentElement.scrollTop = 64;
    }
    if (document.body.scrollTop) {
      document.body.scrollTop = 64;
    }
		this.getList()
  }
  
  // 跳转详情
	linkInfo(id: number) {
		this.props.history.push(`/learn/` + id);
  }
  
  public render() {
		return (
			<Row>
				<Col span={2}/>
				<Col span={20}>
					<div className="learn">
						{
							this.props.learn.list.map((item: IList, index: number) => (
								<div className="learn__item" key={index} onClick={() => { this.linkInfo(item.id); }}>
									<div className="learn__top f-cb">
										<div className="learn__name fl">{item.title}</div>
										<div className="learn__time fr">{dayjs(item.time).format('YYYY-MM-DD')}</div>
										<div className="learn__tag fr">{item.tag}</div>
									</div>
									<div className="learn__content">{item.intro}</div>
								</div>
							))
						}
						{
							this.props.learn.total / this.props.learn.limit <= 1 ?
								null
								:
								<div className="learn__page">
									<Pagination
										current={this.props.learn.page}
										total={this.props.learn.total}
										pageSize={this.props.learn.limit}
										onChange={this._onChange.bind(this)} />
								</div>
						}
					</div>
				</Col>
				<Col span={2} />
			</Row>
		);
	}
}
