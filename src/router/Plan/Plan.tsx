import * as React from 'react';
import { Row, Col } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import ReactEchartsCore from 'echarts-for-react';
import planStore from '../../store/plan';
import axios from '../../utils/axios';
import { IList } from '../../model/plan';
import './plan.css';

interface IPorps extends RouteComponentProps {
  plan: planStore
}

@inject('plan')
@observer
export default class Plan extends React.Component<IPorps, any> {

  	componentDidMount() {
		this.props.plan.list.length === 0 && this.getAnalysis();
  	}
  
  	getAnalysis() {
		axios.get('plan/analysis')
			.then(res => {
				const data = res.data.data;
				this.props.plan.setList(data);
			});
	}

	public getOptionPie = (data: IList) => ({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['已打卡', '未打卡'],
    },
    series : [
      	{
			name: '打卡记录',
			type: 'pie',
			radius : '55%',
			center: ['50%', '60%'],
			data: [
				{ value: data.successTotal, name: '已打卡' },
				{value: data.failTotal, name: '未打卡'},
			],
			color: ['#1FB2F1', '#C91130'],
			itemStyle: {
				emphasis: {
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowColor: 'rgba(0, 0, 0, 0.5)',
				}
			},
      	},
    ]
	});
	
	public getOptionLine = (data: IList) => ({
		title: {
			text: data.title,
			x: 'left',
		},
		legend: {
			data: ['本月打卡数', '本月未打卡数'],
		},
		xAxis: {
			type: 'category',
			data: JSON.parse(JSON.stringify(data.date)),
		},
		yAxis: {
			type: 'value',
		},
		tooltip: {
      		trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow', // 默认为直线，可选为：'line' | 'shadow'
			},
    	},
		series: [
			{
				name: '本月打卡数',
				data: JSON.parse(JSON.stringify(data.success)),
				type: 'bar',
				color: ['#1FB2F1'],
			},
			{
				name: '本月未打卡数',
				data: JSON.parse(JSON.stringify(data.fail)),
				type: 'bar',
				color: ['#C91130'],
			},
		],
  });
  
  render() {
		return (
			<Row>
				<Col span={2} />
				<Col span={20}>
					<div className="plan__content">
						{
							this.props.plan.list.map((item: IList) => (
								<div className="plan__chart f-cb" key={item.id}>
									<div className="plan__pie">
										<ReactEchartsCore 
											option={this.getOptionPie(item)}
											style={{height: 300, width: 400}}/>
									</div>
									<div className="plan__line">
										<ReactEchartsCore 
											option={this.getOptionLine(item)}
											style={{height: 300, width: 1000}}/>
									</div>
								</div>
							))
						}
					</div>
				</Col>
				<Col span={2} />
			</Row>
		);
	}
}