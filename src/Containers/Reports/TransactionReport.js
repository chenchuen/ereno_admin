import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import ReactLoading from 'react-loading';

import Actions from '../../Redux/Actions';

import './css/TransactionReport.css';
import 'react-datepicker/dist/react-datepicker.css';

class TransactionReport extends Component {
  constructor(props) {
   super(props);

   const from = moment().subtract(12, 'months');
   const to = moment();

   this.state = {
      from,
      to,
      loading: false,
      error: '',
   }

   this.goBack = this.goBack.bind(this);
   this._handleChangeFromDate = this._handleChangeFromDate.bind(this);
   this._handleChangeToDate = this._handleChangeToDate.bind(this);
  }

  componentWillMount() {
    const { isLoggedIn, getAllTransactions } = this.props;
    const { from, to } = this.state;

    if (!isLoggedIn) {
      this.props.history.push('/login');

      return null;
    }

    getAllTransactions(from, to);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading) {
      this.setState({
        loading: this.props.loading
      });
    }

    if (prevProps.error !== this.props.error) {
      this.setState({
        error: this.props.error
      });
    }
  }

  goBack() {
    this.props.history.goBack();
  }

  _renderErrorMessage = () => {
    const { error } = this.state;

    if (error) {
      return (
        <p style={{ color: 'red', padding: 10 }}>{error}</p>
      )
    }

    return false;
  }

  _renderLoading = () => {
    const { loading } = this.state;

    if (loading) {
      return (
        <div style={{ padding: 10, paddingTop: 15 }}>
          <label>Loading...</label>

          <ReactLoading
            type="cubes"
            height={150}
            width={60}
            color="#4286f4"
          />
        </div>
      )
    }

    return false;
  }

  _handleChangeFromDate(from) {
    this.setState({
      from,
    });
  }

  _handleChangeToDate(to) {
    this.setState({
      to,
    })
  }

  _generateReport = (event) => {
    event.preventDefault();

    this.setState({
      error: '',
    });

    const { from, to } = this.state;

    const formattedFrom = from.utc().format();
    const formattedTo = to.utc().format();

    this.props.getAllTransactions(formattedFrom, formattedTo);
  }

  render() {
    const { from, to } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Transaction Report</h1>
        </header>

        <p>Please select a date to generate a report from.</p>

        <form onSubmit={this._generateReport}>
          <div>
            <label className="DatePickerLabel">From</label>

            <DatePicker
              selected={from}
              onChange={this._handleChangeFromDate}
              dateFormat="DD/MM/YYYY"
              selectsStart
              startDate={from}
              endDate={to}
            />
          </div>

          <div>
            <label className="DatePickerLabel">To</label>

            <DatePicker
              selected={to}
              onChange={this._handleChangeToDate}
              dateFormat="DD/MM/YYYY"
              selectsEnd
              startDate={from}
              endDate={to}
            />
          </div>

          <button
            className="ExitButton"
            type="button"
            onClick={this.goBack}
          >
            Go Back
          </button>

          <button
            className="GenerateReportButton"
            type="submit"
          >
            Generate Report
          </button>
        </form>

        {this._renderErrorMessage()}
        {this._renderLoading()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.loggedIn,
    loading: state.reports.loading,
    error: state.reports.errorMessage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTransactions: (from, to) =>
      dispatch(Actions.reportsGetAllTransactionAttempt(from, to)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionReport);
