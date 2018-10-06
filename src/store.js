import { createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';
import Reducers from './Redux/';
import Sagas from './Sagas';
import Config from './Config/config';

const middlewares = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

    if (Config.reduxLogger) {
      const { createLogger } = require('redux-logger');

      const logger = createLogger({
        collapsed: true,
      })

      middlewares.push(logger);
    }

const store = createStore(Reducers, {}, applyMiddleware(...middlewares));

sagaMiddleware.run(Sagas);

export default store;
