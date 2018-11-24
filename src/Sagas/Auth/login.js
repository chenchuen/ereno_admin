import { take, call, put } from 'redux-saga/effects';

import Actions from '../../Redux/Actions';
import Types from '../../Redux/Auth/types';

export function* watchLogin(api) {
  while (true) {
    const { username, password, history } = yield take(Types.AUTH_LOGIN_ATTEMPT);
    yield call(handleLogin, username, password, history, api);
  }
}

export function* handleLogin(username, password, history, api) {
  const response = yield call(api.login, username, password);

  const { data } = response;

  if (data.token) {
    yield put(Actions.authLoginSuccess(data.token));

    history.push('/');
  } else {
    console.log(response);
    const { message } = response.data;

    yield put(Actions.authLoginFailure(message));
  }
}
