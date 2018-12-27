import { call, take, put, select } from 'redux-saga/effects';

import Actions from '../../Redux/Actions';
import Types from '../../Redux/Reports/types';

export function* watchGetAllVendors(api) {
  while (true) {
    const { from, to, lastVendor} = yield take(Types.REPORT_GET_ALL_VENDOR_ATTEMPT);

    yield call(handleGetAllVendors, from, to, lastVendor, api);
  }
}

export function* handleGetAllVendors(from, to, lastVendor, api) {
  const state = yield select();

  const { token } = state.auth;

  const response = yield call(api.getAllVendors, from, to, token);

  console.log(response);

  if (response.ok && response.data.status === 0) {
    let dataToReturn = response.data.data;
    let shouldResetReduxData = false;
    let lastVendorIndex = -1;

    if (!lastVendor) {
      shouldResetReduxData = true;
    } else {
      for (let i = 0; i < dataToReturn.length; i++) {
        //if there is a last vendor, we're gonna compare it with the new data
        //and if it's in the new data array, we'll only take data after this last vendor
        if (dataToReturn[i].vendorUid === lastVendor.vendorUid) {
          lastVendorIndex = i;
          break;
        }
      }

      if (lastVendorIndex >= 0) {
        dataToReturn = dataToReturn.slice(lastVendorIndex + 1);
      }
    }

    yield put(Actions.reportsGetAllVendorSuccess(dataToReturn, shouldResetReduxData));
  } else {
    yield put(Actions.reportsGetAllVendorFailure("Something went wrong. Please try again later."));
  }
}
