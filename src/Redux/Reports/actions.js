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

export default {
  reportsGetCustomerInfoAttempt,
  reportsGetCustomerInfoSuccess,
  reportsGetCustomerInfoFailure,
};
