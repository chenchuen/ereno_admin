import { put, take, select, call } from 'redux-saga/effects';

import Actions from '../../Redux/Actions';
import Types from '../../Redux/Reports/types';

export function* watchGetUnapprovedVendors(api) {
  while (true) {
    const { from, to, lastVendor } = yield take(Types.REPORT_GET_UNAPPROVED_VENDORS_ATTEMPT);

    yield call(handleGetUnapprovedVendors, from, to, lastVendor, api);
  }
}

export function* handleGetUnapprovedVendors(from, to, lastVendor, api) {
  const state = yield select();
  const { token } = state.auth;

  const response = yield call(api.getUnapprovedVendors, from, to, token);

  if (response.ok && response.data.status === 0) {
    //all good
    let dataToReturn = response.data.data;
    let shouldResetReduxData = false;
    let lastVendorIndex = -1;

    if (!lastVendor) {
      shouldResetReduxData = true;
    } else {
      for (let i = 0; i < dataToReturn.length; i++) {
        //if there is a last vendor, we're gonna compare it with the new data
        //and if it's in the new data array, we'll only take data after this last vendor

        //TO DO ONCE VENDOR UID IS HERE
      }
    }

    yield put(Actions.reportsGetUnapprovedVendorsSuccess(dataToReturn, shouldResetReduxData));
  } else {
    yield put(Actions.reportsGetUnapprovedVendorsFailure("Something went wrong. Please try again later."));
  }

}
