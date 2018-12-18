import React, { Component } from 'react';
import { connect } from 'react-redux';

import Actions from '../../Redux/Actions';

class VendorReport extends Component {
  constructor(props) {
   super(props);

   this.state = {
     searchForVendor: '',
   }

   this.goBack = this.goBack.bind(this);
  }

  componentWillMount() {
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) {
      this.props.history.push('/login');

      return null;
    }
  }

  goBack() {
    this.props.history.goBack();
  }

  _handleSearchVendor = () => {
    const { searchForVendor } = this.state;

    if (searchForVendor) {
      this.props.searchForVendor(searchForVendor);
    }
  }

  render() {
    const { searchForVendor } = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">VendorReport</h1>

          <p>Search for a vendor</p>

          <div style={{ flexDirection: 'row' }}>
            <input
              type="text"
              value={searchForVendor}
              onChange={({ target }) => this.setState({ searchForVendor: target.value })}
              size="35"
            />

            <button
              style={{ marginLeft: 5 }}
              onClick={this._handleSearchVendor}
              type="button"
            >
              Search
            </button>
          </div>

          <button onClick={this.goBack}>Go Back</button>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      isLoggedIn: state.auth.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchForVendor: (vendorEmail) =>
      dispatch(Actions.reportsGetVendorInfoAttempt(vendorEmail)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorReport);
