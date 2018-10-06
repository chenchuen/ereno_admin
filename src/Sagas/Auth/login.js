import { take, call, put } from 'redux-saga/effects';

import Actions from '../../Redux/Actions';
import Types from '../../Redux/Auth/types';

export function* watchLogin(api) {
  const { username, password } = yield take(Types.AUTH_LOGIN_ATTEMPT);
  yield call(handleLogin, username, password, api);
}

export function* handleLogin(username, password, api) {
  console.log(username, password);

  yield put(Actions.authLoginSuccess);
  // yield put(Actions.authLoginFailure(errorMessage));
}
