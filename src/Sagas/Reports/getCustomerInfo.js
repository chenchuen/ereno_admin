import { call, put, take, select } from 'redux-saga/effects'

import Actions from '../../Redux/Actions';
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

  const response = yield call(api.getUserInfo, email, "customer", token);

  if (response.ok && response.data) {
    if (response.data.status === 0) {
        yield put(Actions.reportsGetCustomerInfoSuccess(response.data.data));
    } else {
      yield put(Actions.reportsGetCustomerInfoFailure("Cannot find user"));
    }
  } else {
    yield put(Actions.reportsGetCustomerInfoFailure("Something went wrong. Please try again later."))
  }
}
