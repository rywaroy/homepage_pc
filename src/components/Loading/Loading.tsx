import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { IStore } from '../../store';
import './loading.css';

@inject((store: IStore) => ({
  ...store.loading
}))
@observer
export default class Loading extends React.Component {
	public render() {
    const loading:any  = this.props;
		return (
			<div className="loading" style={{display: loading.active ? 'block' : 'none'}}>
				<div className="loading__dog" />
			</div>
		)
	}
}
