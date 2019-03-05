import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import One from './One/One';
import OneInfo from './One/Info';
import Huaban from './Huaban/Huaban';
import Zhihu from './Zhihu/Zhihu';
import ZhihuInfo from './Zhihu/Info';
import Time from './Time/Time';
import TimeInfo from './Time/Info';
import Douban from './Douban/Douban';
import DoubanInfo from './Douban/Info';
// import Dytt from './Dytt/Dytt';
import Learn from './Learn/Learn';
import LearnInfo from './Learn/Info';
import Article from './Article/Article';
import ArticleInfo from './Article/Info';
import Album from './Album/Album';
import Group from './Album/Group';
import Think from './Think/Think';
import Plan from './Plan/Plan';

export default class Root extends React.Component<any, any> {
  public render() {
    return (
      <Switch>
        <Route exact={true} path="/one" component={One} />
        <Route exact={true} path="/one/:type/:id" component={OneInfo} />
        <Route exact={true} path="/huaban" component={Huaban} />
        <Route exact={true} path="/zhihu" component={Zhihu} />
        <Route exact={true} path="/zhihu/:id" component={ZhihuInfo} />
        <Route exact={true} path="/time" component={Time} />
        <Route exact={true} path="/time/:id" component={TimeInfo} />
        <Route exact={true} path="/douban" component={Douban} />
        <Route exact={true} path="/douban/:id" component={DoubanInfo} />
        {/* <Route exact={true} path="/movie/dytt" component={Dytt} /> */}
        <Route exact={true} path="/learn" component={Learn} />
        <Route exact={true} path="/learn/:id" component={LearnInfo} />
        <Route exact={true} path="/article" component={Article} />
        <Route exact={true} path="/article/:id" component={ArticleInfo} />
        <Route exact={true} path="/album" component={Album} />
				<Route exact={true} path="/album/:id" component={Group} />
        <Route exact={true} path="/think" component={Think} />
				<Route exact={true} path="/plan" component={Plan} />
        <Route component={Learn} />
      </Switch>
    )
  }
}