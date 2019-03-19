import { observable, action } from 'mobx';

export default class Base {
	@observable public content: any = {}

	@action setContent(data: any) {
		this.content = data
	}
}