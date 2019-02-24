import { FETCH_TOKEN } from 'actions/types';
import tokenReducer from 'reducers/token';

it('returns previous state on unknown action type', () => {
  expect(tokenReducer('token', { type: 'UNKNOWN' })).toEqual('token');
});

it('returns state with token on FETCH_TOKEN', () => {
  const state = tokenReducer(
    { token: 'token' },
    { type: FETCH_TOKEN, payload: '123' }
  );
  expect(state).toEqual('123');
});
