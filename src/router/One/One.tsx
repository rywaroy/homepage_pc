import * as React from 'react';
import { Row, Col, DatePicker } from 'antd';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import axios from '../../utils/axios';
import oneStore from '../../store/one';
import * as dayjs from 'dayjs';
import './one.css';

interface IOne extends RouteComponentProps {
	one: oneStore
}

@inject('one')
@observer
export default class One extends React.Component<IOne, any> {

  public componentDidMount() {
    this.props.one.list.length === 0 && this.getInfo();
  }

  public getInfo() { // 获取one列表
    axios.get(`/one/list?date=${this.props.one.date}`)
			.then(res => {
        const data = res.data.data.content_list;
        this.props.one.setList(data);
			});
  }

  public onTimeChange(date: Date, dateString: string): void {
		if (dateString !== this.props.one.date) {
			this.props.one.setDate(dateString);
			this.getInfo();
		}
  }
  
  public getDisabledDate(current: any): boolean {
		return current > dayjs().valueOf();
  }
  
  public renderList() { // 渲染列表
    if (this.props.one.list.length > 0) {
			return (
				this.props.one.list.map((item: any, index: number) => {
					if (Number(item.category) < 6) {
						return (
							<Col className="gutter-row" xxl={4} xl={6} lg={8} key={index}>
								<div className="one__item" onClick={() => this.link(item.category, item.item_id)}>
									{this.renderTag(item.category, item.tag_list)}
									{
										item.category === '0'
											?
											<div>
												<img src={item.img_url} alt="" width={'100%'} className="item-img" />
												<div className="one__item-inb-title">{item.title} | {item.pic_info}</div>
												<div className="one__item-inb-word">{item.forward}</div>
												<div className="one__item-inb-book">{item.words_info}</div>
											</div>
											:
											<div>
												<div className="one__item-title">{item.title}</div>
												<div className="one__item-author">文/{item.author.user_name}</div>
												<img src={item.img_url} alt="" width={'100%'} className="item-img" />
												<div className="one__item-forward">{item.forward}</div>
											</div>
									}
								</div>
							</Col>
						);
					} else {
						return null;
					}
				})
			);
		} else {
			return null;
		}
  }

  public renderTag(tag: string, taglist: any[]) {
    switch (tag) {
      case '0':
        return null;
      case '1':
        return <div className="one__item-tag">{taglist[0] ? taglist[0].title : '阅读'}</div>;
      case '2':
        return <div className="one__item-tag">连载</div>;
      case '3':
        return <div className="one__item-tag">问答</div>;
      case '4':
        return <div className="one__item-tag">音乐</div>;
      case '5':
        return <div className="ione__tem-tag">影视</div>;
      default:
        return null;
      }
  }

  // 跳转详情
	public link(type: string, id: number) {
		if (type !== '0') {
			this.props.history.push(`/one/${type}/${id}`);
		}
	}

  public render() {
    return (
      	<Row>
			<Col span={2}/>
			<Col span={20}>
				<div className="one__content">
					<div className="one__header f-cb">
						<a href="http://www.wandoujia.com/apps/one.hh.oneclient" target="_blank" className="one__from">来源</a>
						<div className="one__last fr f-cb">
							<div className="fl">往期内容：</div>
							<DatePicker
				placeholder={'选择日期'}
								onChange={this.onTimeChange.bind(this)}
				disabledDate={this.getDisabledDate}/>
						</div>
					</div>
					<div style={{marginBottom: '16px'}}>
						<Row gutter={16}>
							{this.renderList()}
						</Row>
					</div>
				</div>
			</Col>
			<Col span={2} />
		</Row>
    )
  }
}