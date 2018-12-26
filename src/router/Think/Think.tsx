import * as React from 'react';
import * as Masonry from 'masonry-layout';
import { RouteComponentProps } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Row, Col, Pagination } from 'antd';
import * as dayjs from 'dayjs';
import thinkStore from '../../store/think';
import axios from '../../utils/axios';
import { IList } from '../../model/think';
import './think.css';

interface IPorps extends RouteComponentProps {
  think: thinkStore
}

@inject('think')
@observer
export default class Think extends React.Component<IPorps, any> {

  msnry: any

  componentDidMount() {
		if (this.props.think.list.length === 0) {
			this.getList();
		} else {
			this.msnryInit();
		}
  }
  
  public getList() {
		axios('think', {
			params: {
				page: this.props.think.page,
				limit: this.props.think.limit,
			},
		}).then(res => {
			this.props.think.setList(res.data.data.list);
			this.props.think.setTotal(res.data.data.count);
			setTimeout(() => {
				this.msnryInit()
			}, 0);
		});
  }
  
  public msnryInit() {
    this.msnry = new Masonry('.grid', {
			// columnWidth: 300,
			itemSelector: '.grid-item',
			gutter: 20,
		});
  }

  // 页面切换
	public _onChange(page: number) {
		this.props.think.setPage(page);
		if (document.documentElement) {
      document.documentElement.scrollTop = 64;
    }
    if (document.body.scrollTop) {
      document.body.scrollTop = 64;
    }
		this.getList();
  }
  
  render() {
		return (
			<Row>
				<Col span={2} />
				<Col span={20}>
          <div className="think__box grid">
						{
							this.props.think.list.map((item: IList, index: number) => (
								<div className="think__item grid-item" key={index}>
									<div className="think__item-top f-cb">
										<div className="think__item-avatar fl bg-cover" style={{backgroundImage: `url(${item.avatar})`}} />
										<div className="think__item-name fl">{item.name}</div>
									</div>
									<div className="think__item-content">{item.content}</div>
									{
										item.photos.length > 0 ?
											<div className="think__item-photos f-cb">
												{
													item.photos.map((photo, i) => (
														<div className="think__item-photo bg-cover" key={i} style={{backgroundImage: `url(${photo}?imageView2/1/w/210/h/210/q/75)`}} />
													))
												}
											</div>
											:
											null
									}
									<div className="think__item-time">{dayjs(item.time).format('YYYY-MM-DD hh:mm')}</div>
								</div>
							))
						}
					</div>
					{
						this.props.think.total / this.props.think.limit <= 1 ?
							null
							:
							<div className="think__page">
								<Pagination
									current={this.props.think.page}
									total={this.props.think.total}
									pageSize={this.props.think.limit}
									onChange={this._onChange.bind(this)}
								/>
							</div>
					}
				</Col>
				<Col span={2} />
			</Row>
		);
	}

}