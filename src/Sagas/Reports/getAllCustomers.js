import { take, call, put, select } from 'redux-saga/effects';

import Actions from '../../Redux/Actions';
import Types from '../../Redux/Reports/types';

export function* watchGetAllCustomers(api) {
  while (true) {
    const { from, to, lastCustomer } = yield take(Types.REPORT_GET_ALL_CUSTOMER_ATTEMPT);

    yield call(handleGetAllCustomers, from, to, lastCustomer, api);
  }
}

export function* handleGetAllCustomers(from, to, lastCustomer, api) {
  const state = yield select();
  const { token } = state.auth;

  const response = yield call(api.getAllCustomers, from, to, token);
  const { ok, data } = response;

  if (ok && data.status === 0) {
    let dataToReturn = data.data;
    let shouldResetReduxData = false;
    let lastCustomerIndex = -1;

    if (!lastCustomer) {
      //no last customer, means it's a new query. we'll reset redux
      shouldResetReduxData = true;
    } else {
      for (let i = 0; i < dataToReturn.length; i++) {
        //if there is a last transaction, we're gonna compare it with the new data
        //and if it's in the new data array, we'll only take data after this last trx
        if (dataToReturn[i].transactionUID === lastCustomer.transactionUID) {
          lastCustomerIndex = i;
          break;
        }
      }

      if (lastCustomerIndex >= 0) {
        dataToReturn = dataToReturn.slice(lastCustomerIndex + 1);
      }
    }

    yield put(Actions.reportsGetAllCustomerSuccess(dataToReturn, shouldResetReduxData));
  }
}
