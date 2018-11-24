import Types from './types';

const reportsGetCustomerInfoAttempt = (email) => ({
  type: Types.REPORT_GET_CUSTOMER_INFO_ATTEMPT,
  email
});

const reportsGetCustomerInfoSuccess = (customerInfo) => ({
  type: Types.REPORT_GET_CUSTOMER_INFO_SUCCESS,
  customerInfo
});

const reportsGetCustomerInfoFailure = (error) => ({
  type: Types.REPORT_GET_CUSTOMER_INFO_FAILURE,
  error
});

const reportsGetAllTransactionAttempt = (from, to, lastTransaction) => ({
  type: Types.REPORT_GET_ALL_TRANSACTION_ATTEMPT,
  from,
  to,
  lastTransaction,
});

const reportsGetAllTransactionSuccess = (transactionList) => ({
  type: Types.REPORT_GET_ALL_TRANSACTION_SUCCESS,
  transactionList,
});

const reportsGetAllTransactionFailure = (error) => ({
  type: Types.REPORT_GET_ALL_TRANSACTION_FAILURE,
  error,
});

export default {
  reportsGetCustomerInfoAttempt,
  reportsGetCustomerInfoSuccess,
  reportsGetCustomerInfoFailure,

  reportsGetAllTransactionAttempt,
  reportsGetAllTransactionSuccess,
  reportsGetAllTransactionFailure,
};
