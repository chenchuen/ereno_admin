import React, { Component } from 'react';
import { Provider } from 'react-redux';
import admin from 'firebase-admin'

import serviceAccount from './aladdinapp-942fe-firebase-adminsdk-j60zx-9cf851fd22.json';
import Router from './Router';
import store from './store.js';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
export default App;


// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import firebase from 'firebase';
// import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
//
// import Router from './Router';
// import Reducers from './Redux/';
// import Sagas from './Sagas';
// import './App.css';
//
//
// class App extends Component {
//   componentWillMount() {
//     const middlewares = [];
//
//     const sagaMiddleware = createSagaMiddleware();
//     middlewares.push(sagaMiddleware);
//
//     if (true) {
//       const { logger } = require('redux-logger');
//       middlewares.push(logger);
//     }
//
//     const store = createStore(Reducers, {}, applyMiddleware(...middlewares));
//     sagaMiddleware.run(Sagas);
//
//     this.startUpFirebase();
//   }
//
//
//   startUpFirebase = () => {
//     const config = {
//       apiKey: 'AIzaSyCoeUXmwEIwUdkF4BWZKLVaSGRcrQPLkvg',
//       authDomain: 'aladdinapp-942fe.firebaseapp.com',
//       databaseURL: 'https://aladdinapp-942fe.firebaseio.com',
//       projectId: 'aladdinapp-942fe',
//       storageBucket: 'aladdinapp-942fe.appspot.com',
//       messagingSenderId: '617243251381'
//     };
//
//     if (!firebase.apps.length) {
//       firebase.initializeApp(config);
//     } else {
//       firebase.app();
//     }
//   }
//
//   ReactDOM.render() {
//       return (
//         <Provider store={this.store}>
//           <Router />
//         </Provider>
//       );
//     }
//
//   // render() {
//   //   return (
//   //     <div className="App">
//   //       <header className="App-header">
//   //         <img src={logo} className="App-logo" alt="logo" />
//   //         <h1 className="App-title">Welcome to React boiiii</h1>
//   //       </header>
//   //       <p className="App-intro">
//   //         To get started, edit <code>src/App.js</code> and save to reload.
//   //       </p>
//   //     </div>
//   //   );
//   // }
// }
//
// export default App;
