import { fork } from 'redux-saga/effects';

import reports from './Reports';

export default function* root() {
  yield fork(reports().rootSaga);
}
