import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import detailsReducer from 'reducers/details';
import filterFormVisibilityReducer from 'reducers/filterFormVisibility';
import queryParamsReducer from 'reducers/queryParams';
import restaurantsReducer from 'reducers/restaurants';
import tokenReducer from 'reducers/token';

export default combineReducers({
  details: detailsReducer,
  filterFormVisibility: filterFormVisibilityReducer,
  form: formReducer,
  queryParams: queryParamsReducer,
  restaurants: restaurantsReducer,
  token: tokenReducer,
});
