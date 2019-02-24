import axios from 'axios';

import {
  ERROR, FETCH_RESTAURANT_DETAILS, FETCH_RESTAURANTS, FETCH_TOKEN,
  LOAD_QUERY_PARAMS, VISIBLE_FILTER_FORM,
} from 'actions/types';
import appHistory from 'appHistory';

export const fetchRestaurants = () => async (dispatch, getState) => {
  try {
    let token = getState().token;
    if (!token) {
      await dispatch(fetchToken());
      token = getState().token;
    }

    const response = await axios.get(
      'https://mockapi.pizza.de/v1/restaurants', { headers: { token } }
    );
    dispatch({ type: FETCH_RESTAURANTS, payload: response.data.data });
  } catch (e) {
    dispatch({ type: ERROR, payload: 'Error fetching restaurants' });
  }
};

export const fetchToken = () => async (dispatch, getState) => {
  try {
    const response = await axios.get('https://mockapi.pizza.de/v1/auth');
    dispatch({ type: FETCH_TOKEN, payload: response.data.token });
  } catch (e) {
    dispatch({ type: ERROR, payload: 'Error fetching token' });
  }
};

export const fetchRestaurantDetails = id => async (dispatch, getState) => {
  try {
    let token = getState().token;
    if (!token) {
      await dispatch(fetchToken());
      token = getState().token;
    }

    const response = await axios.get(
      `https://mockapi.pizza.de/v1/restaurants/${id}`, { headers: { token } }
    );
    dispatch({
      type: FETCH_RESTAURANT_DETAILS,
      payload: { id, details: response.data },
    });
  } catch (e) {
    dispatch({ type: ERROR, payload: 'Error fetching restaurant details' });
    appHistory.push('/');
  }
};

export const changeFilterFormVisibility = visibility => ({
  type: VISIBLE_FILTER_FORM,
  payload: visibility,
});

export const loadQueryParams = queryParamsString => ({
  type: LOAD_QUERY_PARAMS,
  payload: queryParamsString,
});
