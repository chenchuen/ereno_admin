import { createReducer } from 'reduxsauce';
import Reducers from './reducers';
import Types from './types';

export default {
  reducer: createReducer(Reducers.INITIAL_STATE, {
    [Types.REPORT_GET_ALL_CUSTOMER_ATTEMPT]: Reducers.getAllCustomersAttempt,
    [Types.REPORT_GET_ALL_CUSTOMER_SUCCESS]: Reducers.getAllCustomersSuccess,
    [Types.REPORT_GET_ALL_CUSTOMER_FAILURE]: Reducers.getAllCustomersFailure,

    [Types.REPORT_GET_CUSTOMER_INFO_ATTEMPT]: Reducers.getCustomerInfoAttempt,
    [Types.REPORT_GET_CUSTOMER_INFO_SUCCESS]: Reducers.getCustomerInfoSuccess,
    [Types.REPORT_GET_CUSTOMER_INFO_FAILURE]: Reducers.getCustomerInfoFailure,

    [Types.REPORT_GET_ALL_VENDOR_ATTEMPT]: Reducers.getAllVendorAttempt,
    [Types.REPORT_GET_ALL_VENDOR_SUCCESS]: Reducers.getAllVendorSuccess,
    [Types.REPORT_GET_ALL_VENDOR_FAILURE]: Reducers.getAllVendorFailure,

    [Types.REPORT_GET_VENDOR_INFO_ATTEMPT]: Reducers.getVendorInfoAttempt,
    [Types.REPORT_GET_VENDOR_INFO_SUCCESS]: Reducers.getVendorInfoSuccess,
    [Types.REPORT_GET_VENDOR_INFO_FAILURE]: Reducers.getVendorInfoFailure,

    [Types.REPORT_GET_ALL_TRANSACTION_ATTEMPT]: Reducers.getAllTransactionsAttempt,
    [Types.REPORT_GET_ALL_TRANSACTION_SUCCESS]: Reducers.getAllTransactionsSuccess,
    [Types.REPORT_GET_ALL_TRANSACTION_FAILURE]: Reducers.getAllTransactionsFailure,
  })
};
