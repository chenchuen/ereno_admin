import { take, put, call, select } from 'redux-saga/effects';

import Actions from '../../Redux/Actions';
import Types from '../../Redux/Reports/types';

export function* watchApproveVendor(api) {
  while (true) {
    const { vendorUID, status } = yield take(Types.REPORTS_APPROVE_VENDOR_ATTEMPT);

    yield call(handleApproveVendor, vendorUID, status, api);
  }
}

export function* handleApproveVendor(vendorUID, status, api) {
  const state = yield select();
  const { token } = state.auth;

  console.log(status, vendorUID);
  const response = yield call(api.approveVendor, vendorUID, token);
  console.log(response);

  //TODO
}
