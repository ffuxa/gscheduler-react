import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import * as serviceWorker from './serviceWorker';

// App and styles
import App from './App';
import 'bootstrap/dist/js/bootstrap.min';
import './index.css';

// Firebase
import { createFirestoreInstance, getFirestore, reduxFirestore } from "redux-firestore";
import { getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from './config/fbConfig';

/* See this video which explains well what is happening here!
 * https://www.youtube.com/watch?v=gf5bVfVlNUM&list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3&index=17
 *
 * UPDATE: Updated 'react-redux-firebase', see migration docs:
 * http://docs.react-redux-firebase.com/history/v3.0.0/docs/v3-migration-guide.html
 */
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase),
  )
);

const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch,
  createFirestoreInstance   // <- needed if using firestore
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
