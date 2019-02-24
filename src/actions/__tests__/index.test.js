import axios from 'axios';

import {
  changeFilterFormVisibility, fetchRestaurantDetails, fetchRestaurants,
  fetchToken, loadQueryParams,
} from 'actions';
import {
  ERROR, FETCH_RESTAURANT_DETAILS, FETCH_RESTAURANTS, FETCH_TOKEN,
  LOAD_QUERY_PARAMS, VISIBLE_FILTER_FORM,
} from 'actions/types';
import appHistory from 'appHistory';
import restaurants from './data/restaurants.data.json';
import normalizedRestaurantDetails from './data/restaurant-details-normalized.data.json';

jest.mock('axios');
jest.mock('appHistory');

beforeEach(() => {
  axios.get.mockImplementation(url => {
    if (url === 'https://mockapi.pizza.de/v1/restaurants')
      return Promise.resolve({ data: { data: restaurants }});
    else if (url === 'https://mockapi.pizza.de/v1/auth')
      return Promise.resolve({ data: { token: '1234' }});
    else if (url === 'https://mockapi.pizza.de/v1/restaurants/123')
      return Promise.resolve({ data: normalizedRestaurantDetails });
  });
});

describe('fetchToken', () => {
  it('returns token when request is successful', async () => {
    const getStateMock = jest.fn(() => ({ token: null }));
    const dispatchMock = jest.fn(async fn => {
      if (typeof fn === 'function') await fn(dispatchMock, getStateMock);
    });
    await dispatchMock(fetchToken());

    expect(dispatchMock.mock.calls[1][0])
      .toEqual({ type: FETCH_TOKEN, payload: '1234' });
  });

  it('returns Error when request is unsuccessful', async () => {
    axios.get.mockImplementation(() => Promise.reject({ status: 500 }));
    const getStateMock = jest.fn(() => ({ token: null }));
    const dispatchMock = jest.fn(async fn => {
      if (typeof fn === 'function') await fn(dispatchMock, getStateMock);
    });
    await dispatchMock(fetchToken());

    expect(dispatchMock.mock.calls[1][0])
      .toEqual({ type: ERROR, payload: 'Error fetching token' });
  });
});

describe('fetchRestaurants', () => {
  it('returns restaurants on successful request (token in state)', async () => {
    const getStateMock = jest.fn(() => ({ token: '1234' }));
    const dispatchMock = jest.fn(async fn => {
      if (typeof fn === 'function') await fn(dispatchMock, getStateMock);
    });
    await dispatchMock(fetchRestaurants());

    expect(dispatchMock.mock.calls[1][0])
      .toEqual({ type: FETCH_RESTAURANTS, payload: restaurants });
  });

  it('returns restaurants on successful request (no token in state)', async () => {
    const getStateMock = jest.fn()
      .mockImplementationOnce(() => ({ token: null }))
      .mockImplementationOnce(() => ({ token: '1234' }));
    const dispatchMock = jest.fn(async fn => {
      if (typeof fn === 'function') await fn(dispatchMock, getStateMock);
    });
    await dispatchMock(fetchRestaurants());

    expect(dispatchMock.mock.calls.length)
      .toEqual(4);
    expect(dispatchMock.mock.calls[2][0])
      .toEqual({ type: FETCH_TOKEN, payload: '1234' });
    expect(dispatchMock.mock.calls[3][0])
      .toEqual({
        type: FETCH_RESTAURANTS,
        payload: restaurants,
      });
  });

  it('returns Error when request is unsuccessful', async () => {
    axios.get.mockImplementation(() => Promise.reject({ status: 500 }));
    const getStateMock = jest.fn(() => ({ token: '1234' }));
    const dispatchMock = jest.fn(async fn => {
      if (typeof fn === 'function') await fn(dispatchMock, getStateMock);
    });
    await dispatchMock(fetchRestaurants());

    expect(dispatchMock.mock.calls[1][0])
      .toEqual({ type: ERROR, payload: 'Error fetching restaurants' });
  });
});


describe('fetchRestaurantDetails', () => {
  it('returns details on successful request (token not in state)', async () => {
    const getStateMock = jest.fn()
      .mockImplementationOnce(() => ({ token: null }))
      .mockImplementationOnce(() => ({ token: '1234' }));

    const dispatchMock = jest.fn(async fn => {
      if (typeof fn === 'function') await fn(dispatchMock, getStateMock);
    });
    await dispatchMock(fetchRestaurantDetails('123'));

    expect(dispatchMock.mock.calls.length)
      .toEqual(4);
    expect(dispatchMock.mock.calls[2][0])
      .toEqual({ type: FETCH_TOKEN, payload: '1234' });
    expect(dispatchMock.mock.calls[3][0])
      .toEqual({
        type: FETCH_RESTAURANT_DETAILS,
        payload: { id: '123', details: normalizedRestaurantDetails },
      });
  });

  it('returns sections on successful request (token in state)', async () => {
    const getStateMock = jest.fn(() => ({ token: '1234' }));
    const dispatchMock = jest.fn(async fn => {
      if (typeof fn === 'function') await fn(dispatchMock, getStateMock);
    });
    await dispatchMock(fetchRestaurantDetails('123'));

    expect(dispatchMock.mock.calls[1][0])
      .toEqual({
        type: FETCH_RESTAURANT_DETAILS,
        payload: { id: '123', details: normalizedRestaurantDetails },
      });
  });

  it('returns Error and redirects when request is unsuccessful', async () => {
    axios.get.mockImplementation(() => Promise.reject({ status: 500 }));
    const getStateMock = jest.fn(() => ({ token: '1234' }));
    const dispatchMock = jest.fn(async fn => {
      if (typeof fn === 'function') await fn(dispatchMock, getStateMock);
    });
    await dispatchMock(fetchRestaurantDetails('123'));

    expect(dispatchMock.mock.calls[1][0])
      .toEqual({ type: ERROR, payload: 'Error fetching restaurant details' });
    expect(appHistory.push.mock.calls[0][0])
      .toEqual('/');
  });
});

describe('changeFormVisibility', () => {
  it('returns action with correct visiblity', () => {
    expect(changeFilterFormVisibility(true))
      .toEqual({ type: VISIBLE_FILTER_FORM, payload: true });
  });
});

describe('loadQueryParams', () => {
  it('returns action with correct string', () => {
    expect(loadQueryParams('?name=test'))
      .toEqual({ type: LOAD_QUERY_PARAMS, payload: '?name=test' });
  });
});
