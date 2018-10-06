import { fork } from 'redux-saga/effects';

import { watchLogin } from './login';

export default (api) => {
  function* rootSaga() {
    yield fork(watchLogin, api);
  }

  return {
    rootSaga
  };
};
