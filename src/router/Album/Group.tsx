import * as React from 'react';
import * as Masonry from 'masonry-layout';
import { Row, Col } from 'antd';
import ImgPreview from '../../components/ImgPreview/ImgPreview';
import axios from '../../utils/axios';

interface IState {
  imgPreview: boolean
  opacity: number
  list: IList[]
}

interface IList {
  url: string
}

export default class Group extends React.Component<any, IState> {
  
  imgs: string[] = [];
  state = {
    imgPreview: false,
    list: [],
    opacity: 0,
  };
  tImg: any
  msnry: any
  isLoad: boolean = false
  index: number = 0

	componentDidMount() {
		this.getAlbums();
	}

	public getAlbums() {
		axios.get('album/group', {
			params: {
				id: this.props.match.params.id,
			},
		}).then(res => {
			this.imgs = res.data.data.map((item: IList) => (
				item.url
			));
			this.setState({
				list: res.data.data,
			}, () => {
				this.allImgLoad(() => {
					this.msnryInit();
					this.setState({ opacity: 1 });
        });
			});
		});
	}

	public allImgLoad(callback: () => void) {
    const imgs: NodeListOf<HTMLElement> = document.querySelectorAll('.album__img');
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
		} else {
			this.isLoad = true;
			this.tImg = setTimeout(() => {
				this.allImgLoad(callback); // 递归扫描
			}, 500);
		}
  }

	public msnryInit() {
    this.msnry = new Masonry('.grid', {
			columnWidth: 300,
			itemSelector: '.grid-item',
			gutter: 10,
		});
  }

	public showImgPreview(index: number) {
    this.index = index;
		this.setState({ imgPreview: true });
  }

  public close() { // 关闭
		this.setState({ imgPreview: false });
	}

	render() {
		return (
			<Row>
				<Col span={2} />
				<Col span={20}>
					<div className="grid album" style={{ opacity: this.state.opacity }}>
						{
							this.state.list.map((item: IList, index: number) => (
								<div className="group__item grid-item" key={index} onClick={() => this.showImgPreview(index)}>
									<img src={`${item.url}?imageView2/2/w/300/q/75|imageslim`} width="100%" className="album__img" alt="" />
								</div>
							))
						}
						{
							this.state.imgPreview ?
								<ImgPreview imgs={this.imgs} index={this.index} close={this.close.bind(this)} />
								:
								null
						}
					</div>
				</Col>
				<Col span={2} />
			</Row>
		);
	}
}
