import detailsReducer from 'reducers/details';
import restaurantDetails from './data/restaurant-details.data.json';
import normalizedRestaurantDetails from './data/restaurant-details-normalized.data.json';

import { FETCH_RESTAURANT_DETAILS } from 'actions/types';

it('returns previous state on unknown action type', () => {
  expect(detailsReducer({ id: '123' }, { type: 'UNKNOWN' }))
    .toEqual({ id: '123' });
});

it('returns state with normalized details on FETCH_RESTAURANT_DETAILS', () => {
  const state = detailsReducer(
    {},
    {
      type: FETCH_RESTAURANT_DETAILS,
      payload: { id: '123', details: restaurantDetails },
    },
  );

  expect(state[123]).toEqual(normalizedRestaurantDetails);
});

it('merges previous state with normalized details on FETCH_RESTAURANT_DETAILS',
  () => {
    const prevState = detailsReducer(
      {},
      {
        type: FETCH_RESTAURANT_DETAILS,
        payload: { id: '123', details: restaurantDetails },
      },
    );
    const state = detailsReducer(
      prevState,
      {
        type: FETCH_RESTAURANT_DETAILS,
        payload: { id: '124', details: restaurantDetails },
      },
    );

    expect(state[123]).toEqual(normalizedRestaurantDetails);
    expect(state[124]).toEqual(normalizedRestaurantDetails);
  },
);
