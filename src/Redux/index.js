import { combineReducers } from 'redux';

import Auth from './Auth';
import Reports from './Reports'

export default combineReducers ({
  auth: Auth.reducer,
  reports: Reports.reducer,
});
