import { fork } from 'redux-saga/effects';

import auth from './Auth';
import reports from './Reports';

export default function* root() {
  yield fork(auth().rootSaga);
  yield fork(reports().rootSaga);
}
