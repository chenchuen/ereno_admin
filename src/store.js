import { createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';
import Reducers from './Redux/';
import Sagas from './Sagas';

const middlewares = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

    if (true) {
      const { logger } = require('redux-logger');
      middlewares.push(logger);
    }

const store = createStore(Reducers, {}, applyMiddleware(...middlewares));

sagaMiddleware.run(Sagas);

export default store;
