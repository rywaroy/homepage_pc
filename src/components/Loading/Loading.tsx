import * as React from 'react';
import { observer, inject } from 'mobx-react';
import loadingStore from '../../store/loading';
import './loading.css';

interface ILoading {
	loading: loadingStore
}

@inject('loading')
@observer
export default class Loading extends React.Component<any, ILoading> {
	public render() {
		return (
			<div className="loading" style={{display: this.props.loading.active ? 'block' : 'none'}}>
				<div className="loading__dog" />
			</div>
		)
	}
}
