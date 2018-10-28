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

export default class Root extends React.Component<any, any> {
  public render() {
    return (
      <Switch>
        <Route exact={true} path="/magazine/one" component={One} />
        <Route exact={true} path="/magazine/one/detail/:type/:id" component={OneInfo} />
        <Route exact={true} path="/magazine/huaban" component={Huaban} />
        <Route exact={true} path="/magazine/zhihu" component={Zhihu} />
        <Route exact={true} path="/magazine/zhihu/info/:id" component={ZhihuInfo} />
        <Route exact={true} path="/movie/time" component={Time} />
        <Route exact={true} path="/movie/time/info/:id" component={TimeInfo} />
        <Route exact={true} path="/movie/douban" component={Douban} />
        <Route exact={true} path="/movie/douban/info/:id" component={DoubanInfo} />
        {/* <Route exact={true} path="/movie/dytt" component={Dytt} /> */}
        <Route exact={true} path="/blog/learn" component={Learn} />
        <Route exact={true} path="/blog/learn/info/:id" component={LearnInfo} />
      </Switch>
    )
  }
}