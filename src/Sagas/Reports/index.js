import { fork } from 'redux-saga/effects';

import { watchGetAllCustomers } from './getAllCustomers';
import { watchGetCustomerInfo } from './getCustomerInfo';
import { watchGetVendorInfo } from './getVendorInfo';
import { watchGetAllTransactions } from './getAllTransactions';

export default (api) => {
  function* rootSaga() {
    yield fork(watchGetAllCustomers, api);
    yield fork(watchGetCustomerInfo, api);

    yield fork(watchGetVendorInfo, api);

    yield fork(watchGetAllTransactions, api);
  }

  return {
    rootSaga
  };
};
