import { call, put, take, select } from 'redux-saga/effects'
import Types from '../../Redux/Reports/types';

export function* watchGetCustomerInfo(api) {
  while (true) {
    const { email } = yield take(Types.REPORT_GET_CUSTOMER_INFO_ATTEMPT);

    yield call(getCustomerInfo, email, api);
  }
}

export function* getCustomerInfo(email, api) {
  const state = yield select();

  const { token } = state.auth;

  const response = yield call(api.getUserInfo, email, token);

  console.log(response);
}
