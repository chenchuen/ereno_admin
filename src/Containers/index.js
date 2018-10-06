import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Link } from 'react-router-dom';

import Actions from '../Redux/Actions';

import './index.css';

class Main extends Component {
  _handleLogout = () => {
    this.props.logout();
  }

  render() {
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) {
      this.props.history.push('/login');

      return null;
    }

    return (
      <div className="MainContainer">
        <h1 className="App-title">Home</h1>

        <ul className="ListContainer">
          <li className="ListItem"><Link to="/CustomerReport">CustomerReport</Link></li>
          <li className="ListItem"><Link to="/EarningsReport">EarningsReport</Link></li>
          <li className="ListItem"><Link to="/ReviewReport">ReviewReport</Link></li>
          <li className="ListItem"><Link to="/TransactionReport">TransactionReport</Link></li>
          <li className="ListItem"><Link to="/UserActivityLog">UserActivityLog</Link></li>
          <li className="ListItem"><Link to="/VendorReport">VendorReport</Link></li>
        </ul>

        <button
          className="LogOutButton"
          onClick={this._handleLogout}
        >
          Log out
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.loggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () =>
      dispatch(Actions.authLogoutAttempt()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
