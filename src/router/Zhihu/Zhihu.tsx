import * as React from 'react';
import * as Masonry from 'masonry-layout';
import { RouteComponentProps } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import axios from 'axios';
import { Row, Col } from 'antd';
import zhihuStore from '../../store/zhihu';
import loadingStore from '../../store/loading';
import './zhihu.css';

interface IProps extends RouteComponentProps {
  zhihu: zhihuStore
  loading: loadingStore
}

interface IState {
  opacity: number
}

@inject('zhihu', 'loading')
@observer
export default class Zhihu extends React.Component<IProps, IState> {

  tImg: any
  msnry: any
  isLoad: boolean = false

  state: IState = {
    opacity: 0,
  }

  public componentDidMount() {
    if (this.props.zhihu.list.length === 0) {
      this.getList();
    } else {
      this.msnryInit();
			this.setState({ opacity: 1 });
    }
  }

  public getList() {
		this.props.loading.show()
		axios.get('https://api.isoyu.com/index.php/api/Zhihu/zhihu_daily')
			.then(res => {
				const list = res.data.data.stories;
				this.props.zhihu.setList(list);
				this.allImgLoad(() => {
					this.msnryInit();
					this.props.loading.hide();
					this.setState({ opacity: 1 });
				});
			});
  }

  public msnryInit() {
    this.msnry = new Masonry('.grid', {
			columnWidth: 300,
			itemSelector: '.grid-item',
			gutter: 10,
		});
  }
  
  public allImgLoad(callback: () => void) {
    const imgs: NodeListOf<HTMLElement> = document.querySelectorAll('.zhihu__img');
    for (let i = 0; i < imgs.length; i++) {
      if (imgs[i].offsetHeight === 0) {
        this.isLoad = false;
        break;
      }
    }
		if (this.isLoad) {
			clearTimeout(this.tImg); // 清除定时器
			// 回调函数
			callback();
			// 为false，因为找到了没有加载完成的图，将调用定时器递归
		} else {
			this.isLoad = true;
			this.tImg = setTimeout(() => {
				this.allImgLoad(callback); // 递归扫描
			}, 500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
		}
  }

  public linkInfo(id: number) {
		this.props.history.push(`/zhihu/${id}`);
  }
  
  render() {
		return (
			<Row>
				<Col span={2} />
				<Col span={20}>
					<div className="grid zhihu" style={{ opacity: this.state.opacity }}>
						{
							this.props.zhihu.list.map((item, index) => (
								<div className="zhihu__item grid-item" key={index} onClick={() => this.linkInfo(item.id)}>
									<img src={item.images[0]} width="100%" className="zhihu__img" alt="" />
									<p className="zhihu__info">{item.title}</p>
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