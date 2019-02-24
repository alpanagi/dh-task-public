import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import appHistory from 'appHistory';
import App from 'components/App';
import reducers from 'reducers';

ReactDOM.render(
  <Provider store={createStore(reducers, applyMiddleware(thunk))}>
    <Router history={appHistory}>
      <App />
    </Router>
  </Provider>,
  document.querySelector('#root'),
);
