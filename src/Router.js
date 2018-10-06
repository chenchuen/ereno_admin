import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Containers/index';
import Login from './Containers/Auth/login';
import CustomerReport from './Containers/Reports/CustomerReport';
import EarningsReport from './Containers/Reports/EarningsReport';
import ReviewReport from './Containers/Reports/ReviewReport';
import TransactionReport from './Containers/Reports/TransactionReport';
import UserActivityLog from './Containers/Reports/UserActivityLog';
import VendorReport from './Containers/Reports/VendorReport';

export default () =>
  (<BrowserRouter>
    <Switch>
      <Route path="/login" exact render={props => <Login {...props} />} />
      <Route path="/" exact render={props => <Home {...props} />} />
      <Route path="/CustomerReport" exact render={props => <CustomerReport {...props} />} />
      <Route path="/EarningsReport" exact render={props => <EarningsReport {...props} />} />
      <Route path="/ReviewReport" exact render={props => <ReviewReport {...props} />} />
      <Route path="/TransactionReport" exact render={props => <TransactionReport {...props} />} />
      <Route path="/UserActivityLog" exact render={props => <UserActivityLog {...props} />} />
      <Route path="/VendorReport" exact render={props => <VendorReport {...props} />} />
    </Switch>
  </BrowserRouter>);
