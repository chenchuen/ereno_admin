import { fork } from 'redux-saga/effects';

import auth from './Auth';
import reports from './Reports';

import API from '../Services/API';

const api = API.create('https://us-central1-aladdinapp-942fe.cloudfunctions.net');

export default function* root() {
  yield fork(auth(api).rootSaga);
  yield fork(reports(api).rootSaga);
}
