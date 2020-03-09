import * as React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './router';
import Menu from './components/Menu/Menu';
import Loading from './components/Loading/Loading';
import { Provider } from 'mobx-react';
import axios from './utils/axios';
import store from './store';
import './App.css';

const {Header, Footer, Sider, Content} = Layout;

class App extends React.Component {

	componentDidMount() {
		this.getBlogContent();
	}

	// 获取博客信息
	getBlogContent() {
		axios.get('base/content')
			.then(res => {
				store.base.setContent(res.data.data);
			});
	}

  public render() {
    return (
			<Provider {...store}>
				<Router>
					<Layout style={{minHeight: '100vh'}}>
						<Loading/>
						<Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0, zIndex: 5}}>
							<Menu/>
						</Sider>
						<Layout style={{marginLeft: 200}}>
							<Header>
								<div className="header">{store.base.content.word}</div>
								<div className="header__mobile">
									手机端
									<div className="header__mobile-box">
										<div className="header__mobile-code" />
									</div>
								</div>
							</Header>
							<Content>
								<Routers/>
							</Content>
							<Footer>
								<div className="footer">网站大部分 API
									均由产品公司自身提供，本人皆从网络获取。获取与共享之行为或有侵犯产品权益的嫌疑。若被告知需停止共享与使用，本人会及时删除此页面与整个项目。请您暸解相关情况，并遵守产品协议。
									<p><a href="http://www.beian.miit.gov.cn/" className="beian">浙ICP备18011239号-2</a></p>
								</div>
							</Footer>
						</Layout>
					</Layout>
				</Router>
			</Provider>
    );
  }
}

export default App;
