import { take, put, call, select } from 'redux-saga/effects';

import Actions from '../../Redux/Actions';
import Types from '../../Redux/Reports/types';

export function* watchGetAllTransactions(api) {
  while (true) {
    const { from, to, lastTransaction } = yield take(Types.REPORT_GET_ALL_TRANSACTION_ATTEMPT);

    yield call(handleGetAllTransactions, from, to, lastTransaction, api);
  }
}

export function* handleGetAllTransactions(from, to, lastTransaction, api) {
  const state = yield select();

  const { token } = state.auth;

  const response = yield call(api.getAllTransactions, from, to, token);
  const { data } = response;
  
  if (data.status === 0) {
    //success
    const dataArray = data.data;
    let newDataArrayToReturn = [];
    let lastTransactionIndex = -1;
    let shouldResetReduxData = false;

    if (lastTransaction) {
      for (let i = 0; i < dataArray.length; i++) {
        //if there is a last transaction, we're gonna compare it with the new data
        //and if it's in the new data array, we'll only take data after this last trx
        if (dataArray[i].transactionUID === lastTransaction.transactionUID) {
          lastTransactionIndex = i;
          break;
        }
      }

      if (lastTransactionIndex >= 0) {
        newDataArrayToReturn = dataArray.slice(lastTransactionIndex + 1);
      }
    } else {
      //if no last transaction, it's new generate report request, so we should clear redux first
      shouldResetReduxData = true;
      newDataArrayToReturn = dataArray;
    }

    yield put(Actions.reportsGetAllTransactionSuccess(newDataArrayToReturn, shouldResetReduxData));
  } else if (data.status === -1) {
    //fail
    let error = 'Error getting data.';

    if (!token) {
        error = "Error getting data. Make sure you're logged in.";
    }

    yield put(Actions.reportsGetAllTransactionFailure(error));
  }
}
