import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import ReactLoading from 'react-loading';

import ReduxActions from '../../Redux/Actions';

import Table from '../../Components/Table';

import 'react-datepicker/dist/react-datepicker.css';

const TABLE_PAGE_SIZE = 20;

class CustomerReport extends PureComponent {
  constructor(props) {
   super(props);

   const from = moment().subtract(12, 'months');
   const to = moment();

   this.state = {
      email: '',
      error: '',
      from,
      to,
      currentPageIndex: 0,
      searchForCustomer: '',
    };

    this.goBack = this.goBack.bind(this);
    this._handleChangeFromDate = this._handleChangeFromDate.bind(this);
    this._handleChangeToDate = this._handleChangeToDate.bind(this);
  }

  componentWillMount() {
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) {
      this.props.history.push('/login');

      return null;
    }

    this._generateReport();
  }

  componentDidUpdate(prevProps) {
    const { errorMessage } = this.props;

    if (prevProps.errorMessage !== errorMessage) {
      this.setState({
        error: errorMessage
      });
    }
  }

  goBack() {
    this.props.history.goBack();
  }

  _handleChangeFromDate(from) {
    this.setState({
      from,
    });
  }

  _handleChangeToDate(to) {
    this.setState({
      to,
    });
  }

  _generateReport = (event) => {
    if (event) {
      event.preventDefault();
    }

    this.setState({
      error: '',
    });

    const { from, to } = this.state;
    const { getAllCustomerInfo } = this.props;

    const formattedFrom = from.utc().format();
    const formattedTo = to.utc().format();

    getAllCustomerInfo(formattedFrom, formattedTo);
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
    const { loading } = this.props;

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

  _changePageIndex = (currentPageIndex) => {
    this.setState({
      currentPageIndex
    });
  }

  _onTablePageChanged = (pageIndex) => {
    this._changePageIndex(pageIndex);

    const { customerList, getAllCustomerInfo } = this.props;
    const { to } = this.state;

    const numOfPages = Math.ceil(customerList.length / TABLE_PAGE_SIZE);

    if ((pageIndex + 1) === numOfPages) {
      //last page
      const lastCustomer = customerList[customerList.length - 1];

      const formattedFrom = moment(lastCustomer.createdDate).utc().format();
      const formattedTo = to.utc().format();

      getAllCustomerInfo(formattedFrom, formattedTo, lastCustomer);
    }
  }

  _getTableColumns = () => {
    return [{
        Header: 'Customer name',
        accessor: 'name'
    }, {
      Header: 'User type',
      accessor: 'userType'
    }, {
      Header: 'Email',
      accessor: 'email',
    }, {
      Header: 'Location',
      accessor: 'state',
    }, {
      Header: 'Sign up date',
      accessor: 'SignUpDate',
      Cell: ({ value }) => moment(value).format('D MMM YY')
    }, {
      Header: 'Last login date',
      accessor: 'LastLoginDate',
      Cell: ({ value }) => moment(value).format('D MMM YY'),
    }]
  }

  _handleSearchCustomer = () => {
    const { searchForCustomer } = this.state;

    this.props.getCustomerInfo(searchForCustomer);
  }

  _renderTable = () => {
    const { customerList, loading } = this.props;
    const { currentPageIndex } = this.state;

    if (customerList.length) {
      return (
          <Table
            data={customerList}
            columns={this._getTableColumns()}
            onPageChanged={this._onTablePageChanged}
            loading={loading}
            pageSize={TABLE_PAGE_SIZE}
            page={currentPageIndex}
          />
      )
    }

    return <p>No data found</p>;
  }

  render() {
    const { from, to, searchForCustomer } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Customer Report</h1>
        </header>

        <p>Search for a customer</p>

        <div style={{ flexDirection: 'row' }}>
          <input
            type="text"
            value={searchForCustomer}
            onChange={({ target }) => this.setState({ searchForCustomer: target.value })}
            size="35"
          />

          <button
            style={{ marginLeft: 5 }}
            onClick={this._handleSearchCustomer}
            type="button"
          >
            Search
          </button>
        </div>

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

          {this._renderErrorMessage()}
          {this._renderLoading()}

          {this._renderTable()}
        </form>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.loggedIn,
    loading: state.reports.loading,
    customerInfo: state.reports.customerInfo,
    customerList: state.reports.customerList,
    errorMessage: state.reports.errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomerInfo: (email) =>
      dispatch(ReduxActions.reportsGetCustomerInfoAttempt(email)),
    getAllCustomerInfo: (from, to, lastCustomer) =>
      dispatch(ReduxActions.reportsGetAllCustomerAttempt(from, to, lastCustomer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerReport);
