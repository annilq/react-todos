import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,applyMiddleware } from 'redux'
import { browserHistory, Router } from 'react-router'
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import routes from './routes';
import "antd/dist/antd.css";
import  './main.css';
import rootReducer from "./reducers/reducers";
const store = createStore(rootReducer,applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
