import { combineReducers } from 'redux';

import Reports from './Reports'

export default combineReducers ({
  reports: Reports.reducer,
});
