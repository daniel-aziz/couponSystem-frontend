import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import throttle from 'lodash/throttle'
import reportWebVitals from './reportWebVitals';
import Layout from './components/mainLayout/layout/layout';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { myStore } from './redux/Store';
import { saveState } from '../src/redux/localStorage'
import SplashScreen from './splashScreen';

myStore().store.subscribe(throttle(() => {
  saveState(
      myStore().store.getState()
  )
}, 1000));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore().store}>
      <PersistGate loading={<SplashScreen/>} persistor={myStore().persistor}>
        <Layout />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


