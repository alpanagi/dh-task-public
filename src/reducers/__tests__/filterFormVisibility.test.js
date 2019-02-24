import { VISIBLE_FILTER_FORM } from 'actions/types';
import filterFormVisibilityReducer from 'reducers/filterFormVisibility';

it('returns previous state on unknown action type', () => {
  expect(filterFormVisibilityReducer(false, { type: 'UNKNOWN' }))
    .toEqual(false);
});

it('returns state with action.paylod on VISIBLE_FILTER_FORM', () => {
  const state = filterFormVisibilityReducer(
    false,
    { type: VISIBLE_FILTER_FORM, payload: true }
  );
  expect(state).toEqual(true);
});
