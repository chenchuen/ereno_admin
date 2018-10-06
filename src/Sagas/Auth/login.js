import { take, call, put } from 'redux-saga/effects';

import Actions from '../../Redux/Actions';
import Types from '../../Redux/Auth/types';

export function* watchLogin(api) {
  const { username, password, history } = yield take(Types.AUTH_LOGIN_ATTEMPT);
  yield call(handleLogin, username, password, history, api);
}

export function* handleLogin(username, password, history, api) {
  console.log(username, password);

  const success = true;

  if (success) {
    yield put(Actions.authLoginSuccess());

    history.push('/');
  } else {
    const errorMessage = "error";
    yield put(Actions.authLoginFailure(errorMessage));
  }
}
