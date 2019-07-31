import * as React from 'react';
import * as Masonry from 'masonry-layout';
import { Row, Col, Icon } from 'antd';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import ImgPreview from '../../components/ImgPreview/ImgPreview';
import huabanStore from '../../store/huaban';
import loadingStore from '../../store/loading';
import './huaban.css';

interface IHuanban extends RouteComponentProps {
  huaban: huabanStore
  loading: loadingStore
}

interface IState {
  imgPreview: boolean
}

@inject('huaban', 'loading')
@observer
export default class Huaban extends React.Component<IHuanban, IState> {
  
  imgs: string[] = [];
  state = {
    imgPreview: false,
  };
  tImg: any
  msnry: any
  isLoad: boolean = false
  index: number = 0
  
  public componentDidMount() {
		if (this.props.huaban.list.length === 0) {
			this.getList();
		} else {
			this.msnryInit();
		}
  }
  
  public getList() {
    this.props.loading.show();
		this.props.huaban.setList([]);
		this.props.huaban.setOpacity(0);
		axios.get('https://api.isoyu.com/index.php/api/Picture/hua_ban')
			.then(res => {
				if (res.data.code === 1) {
					this.props.huaban.setList(res.data.data);
					this.imgs = res.data.data.map((item: any) => (
						item.img
					));
					setTimeout(() => {
						this.allImgLoad(() => {
							this.msnryInit();
							this.props.huaban.setOpacity(1);
							this.props.loading.hide();
						});
					}, 200);
				}
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
    const imgs: NodeListOf<HTMLElement> = document.querySelectorAll('.huaban__img');
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

  public showImgPreview(index: number) {
    this.index = index;
		this.setState({ imgPreview: true });
  }

  public close() { // 关闭
		this.setState({ imgPreview: false });
	}

  render() {
		const { opacity, list } = this.props.huaban;

		return (
			<Row>
				<Col span={2}/>
				<Col span={20}>
					<div className="huaban__top">
						<div className="huaban__change" onClick={() => this.getList()}>
							<Icon type="sync" />&nbsp;&nbsp;&nbsp;&nbsp;<span>换一组</span>
						</div>
					</div>
					<div className="grid huaban" style={{ opacity }}>
						{
							list.map((item, index) => (
								<div className="huaban__item grid-item" key={index} onClick={() => this.showImgPreview(index)}>
									<img src={item.img} width="100%" className="huaban__img" alt="" />
								</div>
							))
						}
					</div>
          {
						this.state.imgPreview ?
							<ImgPreview imgs={this.imgs} index={this.index} close={this.close.bind(this)} />
							:
							null
					}
				</Col>
				<Col span={2} />
			</Row>
    );
  }
}