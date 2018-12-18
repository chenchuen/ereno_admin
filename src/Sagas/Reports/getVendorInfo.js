import { take, call, select, put } from 'redux-saga/effects';

import Actions from '../../Redux/Actions';
import Types from '../../Redux/Reports/types';

export function* watchGetVendorInfo(api) {
  while (true) {
    const { vendorEmail } = yield take(Types.REPORT_GET_VENDOR_INFO_ATTEMPT);

    yield call(handleGetVendorInfo, vendorEmail, api);
  }
}

export function* handleGetVendorInfo(vendorEmail, api) {
  const state = yield select();

  const { token } = state.auth;

  const response = yield call(api.getUserInfo, vendorEmail, "vendor", token);

  if (response.ok && response.data) {
    if (response.data.status === 0) {
      yield put(Actions.reportsGetVendorInfoSuccess(response.data.data));
    } else {
      yield put(Actions.reportsGetVendorInfoFailure("Cannot find vendor. Please try another email."));
    }
  } else {
    yield put(Actions.reportsGetVendorInfoFailure("Something went wrong. Please try again."));
  }
}
