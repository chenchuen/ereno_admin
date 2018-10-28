import { take, put, call, select } from 'redux-saga/effects';

import Actions from '../../Redux/Actions';
import Types from '../../Redux/Reports/types';

export function* watchGetAllTransactions(api) {
  while (true) {
    const { from, to } = yield take(Types.REPORT_GET_ALL_TRANSACTION_ATTEMPT);

    yield call(handleGetAllTransactions, from, to, api);
  }
}

export function* handleGetAllTransactions(from, to, api) {
  const state = yield select();

  const { token } = state.auth;

  const response = yield call(api.getAllTransactions, from, to, token);
  const { data } = response;

  if (data.status === 0) {
    //success
    const dataArray = Object.keys(data.data).map(i => data.data[i]);

    yield put(Actions.reportsGetAllTransactionSuccess(dataArray));
  } else if (data.status === -1) {
    //fail
    let error = 'Error getting data.';

    if (!token) {
        error = "Error getting data. Make sure you're logged in.";
    }

    yield put(Actions.reportsGetAllTransactionFailure(error));
  }
}
