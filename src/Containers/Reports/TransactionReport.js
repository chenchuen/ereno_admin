import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import ReactLoading from 'react-loading';

import Actions from '../../Redux/Actions';

import Table from '../../Components/Table';

import './css/TransactionReport.css';
import 'react-datepicker/dist/react-datepicker.css';

const TABLE_PAGE_SIZE = 20;

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
      currentPageIndex: 0,
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

    const formattedFrom = from.utc().format();
    const formattedTo = to.utc().format();

    getAllTransactions(formattedFrom, formattedTo);
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
    this._changePageIndex(0);
  }

  _getTableColumns = () => {
    return [{
        Header: 'Customer name',
        accessor: 'customerName'
    }, {
      Header: 'Service category',
      accessor: 'selectedCategory'
    }, {
      Header: 'Service subcategory',
      accessor: 'selectedSubcategory',
    }, {
      Header: 'Date',
      accessor: 'createdDate',
      Cell: ({ value }) => moment(value).format('D MMM YY')
    }, {
      Header: 'Vendor name',
      accessor: 'vendorName',
    }, {
      Header: 'Status',
      accessor: 'status',
    }]
  }

  _changePageIndex = (currentPageIndex) => {
    this.setState({
      currentPageIndex
    });
  }

  _onTablePageChanged = (pageIndex) => {
    this._changePageIndex(pageIndex);

    const { data, getAllTransactions } = this.props;
    const { to } = this.state;

    const numOfPages = Math.ceil(data.length / TABLE_PAGE_SIZE);

    if ((pageIndex + 1) === numOfPages) {
      //last page
      const lastTransaction = data[data.length - 1];

      const formattedFrom = moment(lastTransaction.createdDate).utc().format();
      const formattedTo = to.utc().format();

      getAllTransactions(formattedFrom, formattedTo, lastTransaction);
    }
  }

  _renderTable = () => {
    const { data, loading } = this.props;
    const { currentPageIndex } = this.state;

    if (data.length) {
      return (
          <Table
            data={data}
            columns={this._getTableColumns()}
            onPageChanged={this._onTablePageChanged}
            loading={loading}
            pageSize={TABLE_PAGE_SIZE}
            page={currentPageIndex}
          />
      )
    }

    return false;
  }

  render() {
    const { from, to } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Transaction Report</h1>
        </header>

        <p>Please select a date to generate a report from.</p>

        <form onSubmit={this._generateReport} style={{ paddingBottom: 10 }}>
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

        {this._renderTable()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.loggedIn,
    loading: state.reports.loading,
    error: state.reports.errorMessage,
    data: state.reports.transactionList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTransactions: (from, to, lastTransaction) =>
      dispatch(Actions.reportsGetAllTransactionAttempt(from, to, lastTransaction)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionReport);
