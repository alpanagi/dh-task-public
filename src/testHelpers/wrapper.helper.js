import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from 'reducers';

export default ({children, location, initialValues = {}}) => {
  location = location || { pathname: '/', search: '' };

  return (
    <Provider
      store={createStore(reducers, initialValues, applyMiddleware(thunk))}
    >
      <MemoryRouter intialIndex={0} initialEntries={[location]}>
        {children}
      </MemoryRouter>
    </Provider>
  );
};
