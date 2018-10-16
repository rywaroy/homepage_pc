import * as React from 'react';
import { Row, Col, Tabs } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import timeStore from '../../store/time';
import loadingStore from '../../store/loading';
import Sell from './Sell';
import Hot from './Hot';
import Soon from './Soon';
import './time.css';

const TabPane = Tabs.TabPane;

interface IProps extends RouteComponentProps {
  time: timeStore
  loading: loadingStore
}

@inject('time', 'loading')
@observer
export default class Time extends React.Component <IProps, any> {

  render() {
		return (
			<div className="card__content">
				<Row>
					<Col span={2} />
					<Col span={20}>
						<div className="card__container">
							<Tabs type="card">
								<TabPane tab="正在售票" key="1">
									<Sell {...this.props} />
								</TabPane>
								<TabPane tab="正在热映" key="2">
									<Hot {...this.props} />
								</TabPane>
								<TabPane tab="即将上映" key="3">
									<Soon {...this.props} />
								</TabPane>
							</Tabs>
						</div>
					</Col>
					<Col span={2} />
				</Row>
			</div>
		);
	}
}