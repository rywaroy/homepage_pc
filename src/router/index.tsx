import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import One from './One/One';
import OneInfo from './One/Info';

export default class Root extends React.Component<any, any> {
  public render() {
    return (
      <Switch>
        <Route exact={true} path="/magazine/one" component={One} />
        <Route exact={true} path="/magazine/one/detail/:type/:id" component={OneInfo} />
      </Switch>
    )
  }
}