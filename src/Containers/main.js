import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from '../logo.svg';

class Main extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React boiiii</h1>
        </header>
        <p className="App-intro">
          <ul>
            <li><Link to="/">Main</Link></li>
            <li><Link to="/CustomerReport">CustomerReport</Link></li>
            <li><Link to="/EarningsReport">EarningsReport</Link></li>
            <li><Link to="/ReviewReport">ReviewReport</Link></li>
            <li><Link to="/TransactionReport">TransactionReport</Link></li>
            <li><Link to="/UserActivityLog">UserActivityLog</Link></li>
            <li><Link to="/VendorReport">VendorReport</Link></li>
          </ul>
        </p>
      </div>
    );
  }
}

export default Main;
