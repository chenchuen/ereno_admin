import { createReducer } from 'reduxsauce';
import Reducers from './reducers';
import Types from './types';

export default {
  reducer: createReducer(Reducers.INITIAL_STATE, {
    [Types.REPORT_GET_CUSTOMER_INFO_ATTEMPT]: Reducers.getCustomerInfoAttempt,
    [Types.REPORT_GET_CUSTOMER_INFO_SUCCESS]: Reducers.getCustomerInfoSuccess,
    [Types.REPORT_GET_CUSTOMER_INFO_FAILURE]: Reducers.getCustomerInfoFailure,

    [Types.REPORT_GET_ALL_TRANSACTION_ATTEMPT]: Reducers.getAllTransactionsAttempt,
    [Types.REPORT_GET_ALL_TRANSACTION_SUCCESS]: Reducers.getAllTransactionsSuccess,
    [Types.REPORT_GET_ALL_TRANSACTION_FAILURE]: Reducers.getAllTransactionsFailure,
  })
};
