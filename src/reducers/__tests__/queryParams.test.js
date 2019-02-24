import { LOAD_QUERY_PARAMS } from 'actions/types';
import queryParamsReducer from 'reducers/queryParams';

it('returns previous state on unknown action type', () => {
  expect(queryParamsReducer({ name: 'test' }, { type: 'UNKNOWN' }))
    .toEqual({ name: 'test' });
});

it('returns queryParams on LOAD_QUERY_PARAMS', () => {
  expect(queryParamsReducer(
    {},
    { type: LOAD_QUERY_PARAMS, payload: '?sort=name-asc' },
  )).toEqual({ sort: 'name-asc' });
});

it('replaces previous state', () => {
  expect(queryParamsReducer(
    { sort: 'name-asc' },
    { type: LOAD_QUERY_PARAMS, payload: '?name=test' },
  )).toEqual({ name: 'test' });
});

it('removes unkown params', () => {
  expect(queryParamsReducer(
    {},
    { type: LOAD_QUERY_PARAMS, payload: '?name=test&data=test' },
  )).toEqual({ name: 'test' });
});

it('removes params with unacceptable values', () => {
  expect(queryParamsReducer(
    {},
    { type: LOAD_QUERY_PARAMS, payload: '?sort=unkown&name=test' },
  )).toEqual({ name: 'test' });
});

it('normalizes categories, removing unkown ones', () => {
  expect(queryParamsReducer(
    {},
    { type: LOAD_QUERY_PARAMS, payload: '?categories=indisch,unknown' },
  )).toEqual({ indisch: true });
});

it('normalizes tags, removing unkown ones', () => {
  expect(queryParamsReducer(
    {},
    { type: LOAD_QUERY_PARAMS, payload: '?tags=unknown,delivery_home' },
  )).toEqual({ delivery_home: true });
});

it('normalizes statuses, removing unkown ones', () => {
  expect(queryParamsReducer(
    {},
    { type: LOAD_QUERY_PARAMS, payload: '?status=open,unknown,reachable' },
  )).toEqual({ open: true, reachable: true });
});

it('keeps rating if number', () => {
  expect(queryParamsReducer(
    {},
    { type: LOAD_QUERY_PARAMS, payload: '?name=test&rating=4' },
  )).toEqual({ name: 'test', rating: '4' });
});

it('removes rating if not a number', () => {
  expect(queryParamsReducer(
    {},
    { type: LOAD_QUERY_PARAMS, payload: '?name=test&rating=abc' },
  )).toEqual({ name: 'test' });
});

it('keeps minorder if number', () => {
  expect(queryParamsReducer(
    {},
    { type: LOAD_QUERY_PARAMS, payload: '?name=test&minorder=4' },
  )).toEqual({ name: 'test', minorder: '4' });
});

it('removes minorder if not a number', () => {
  expect(queryParamsReducer(
    {},
    { type: LOAD_QUERY_PARAMS, payload: '?name=test&minorder=abc' },
  )).toEqual({ name: 'test' });
});
