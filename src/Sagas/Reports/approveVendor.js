import { take, put, call, select } from 'redux-saga/effects';

import Actions from '../../Redux/Actions';
import Types from '../../Redux/Reports/types';

export function* watchApproveVendor(api) {
  while (true) {
    const { vendorUID } = yield take(Types.REPORTS_APPROVE_VENDOR_ATTEMPT);

    yield call(handleApproveVendor, vendorUID, api);
  }
}

export function* handleApproveVendor(vendorUID, api) {
  const state = yield select();
  const { token } = state.auth;

  const response = yield call(api.approveVendor, vendorUID, token);
  console.log(response);

  //TODO
}
