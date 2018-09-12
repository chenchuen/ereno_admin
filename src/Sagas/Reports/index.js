import { fork } from 'redux-saga/effects';

import { watchGetCustomerInfo } from './getCustomerInfo';

export default (api) => {
  function* rootSaga() {
    yield fork(watchGetCustomerInfo);
  }

  return {
    rootSaga
  };
};
