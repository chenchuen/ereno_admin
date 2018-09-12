import { createReducer } from 'reduxsauce';
import Reducers from './reducers';
import Types from './types';

export default {
  reducer: createReducer(Reducers.INITIAL_STATE, {
    [Types.REPORT_GET_CUSTOMER_INFO_ATTEMPT] : Reducers.getCustomerInfoAttempt,
    [Types.REPORT_GET_CUSTOMER_INFO_SUCCESS] : Reducers.getCustomerInfoSuccess,
    [Types.REPORT_GET_CUSTOMER_INFO_FAILURE] : Reducers.getCustomerInfoFailure,
  })
};
