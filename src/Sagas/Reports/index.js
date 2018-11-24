import { fork } from 'redux-saga/effects';

import { watchGetCustomerInfo } from './getCustomerInfo';
import { watchGetAllTransactions } from './getAllTransactions';

export default (api) => {
  function* rootSaga() {
    yield fork(watchGetCustomerInfo, api);
    yield fork(watchGetAllTransactions, api);
  }

  return {
    rootSaga
  };
};
