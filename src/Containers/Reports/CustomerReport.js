import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReduxActions from '../../Redux/Actions';

class CustomerReport extends Component {
  constructor(props){
   super(props);
   this.goBack = this.goBack.bind(this);
   this.state = {
      email: '',
      error: '',
    };
  }
  goBack(){
    this.props.history.goBack();
  }
  _handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }
  _getCustomerInfo = () => {
    if (this.state.email !== ''){
      this.setState({ error: '' });
      this.props.getCustomerInfo(this.state.email);
    } else {
      this.setState({ error: 'Please input valid email!' });
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CustomerReport</h1>
        </header>

        <label>Email</label>
        <input type='text' value={this.state.email} onChange={this._handleEmailChange} />

        <button onClick={this._getCustomerInfo}>Search</button>

        <label>{this.state.error}</label>

        <div>
          <button onClick={this.goBack}>Go Back</button>
        </div>
      </div>

    );
  }
}

const mapStateToProps = ( reports ) => {
  const { customerInfo } = reports;

  return { customerInfo };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomerInfo: (email) =>
      dispatch(ReduxActions.reportsGetCustomerInfoAttempt(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerReport);
