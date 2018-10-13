import * as React from 'react';
import './imgpreview.css';

interface IProps {
  imgs: string[]
  index: number
  close: () => void
}

interface IState {
  index: number
}

export default class ImgPreview extends React.Component<IProps, IState> {

  len: number

  constructor(props: IProps) {
		super(props);
		this.state = {
			index: this.props.index,
		};
		this.len = this.props.imgs.length;
  }
  
  public prev() { // 上一张
		if (this.state.index <= 0) {
			return;
		}
		this.setState({ index: this.state.index - 1 });
	}

	next() { // 下一张
		if (this.state.index >= this.len - 1) {
			return;
		}
		this.setState({ index: this.state.index + 1 });
  }
  
  render() {
		return (
			<div className="img-preview">
				<div className="img-preview__close" onClick={() => this.props.close()} />
				<div className="img-preview__left" onClick={() => this.prev()} />
				<img src={this.props.imgs[this.state.index]} alt="" className="img-preview__item" />
				<div className="img-preview__right" onClick={() => this.next()} />
			</div>
		);
	}
}