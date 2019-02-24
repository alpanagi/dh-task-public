import { FETCH_RESTAURANTS } from 'actions/types';
import restaurantsReducer from 'reducers/restaurants';

const restaurant = {
  "id": "40182",
  "general": {
      "name": "Tre Xanh",
      "open": true,
      "reachable": true,
      "categories": [
          "indisch,doner,indisch"
      ],
      "online": true,
      "tags": [
          "delivery_home",
          "delivery_pickup",
          "coupon",
          "online_payment",
          "white_label_external",
          "no_option_selected",
          "kinder_menu",
          "accepts_cash",
          "promoted"
      ],
      "logo_uri": "https://static-files.pizza.de/media/restaurant_logos/502580_Tre-Xanh_Logo_8e15990a2c1711e7a07ff8bc1207df82.jpg"
  },
  "address": {
      "latitude": 52.551553,
      "longitude": 13.4163927,
      "zipcode": "FOOBAR",
      "street_name": "Dumy Address",
      "street_number": "14",
      "city": "Berlin",
      "city_slug": "berlin",
      "state": "",
      "country": "DE",
      "etage": "",
      "door": "",
      "tags": [],
      "comments": "436",
      "company": "",
      "name": "",
      "lastname": ""
  },
  "rating": {
      "average": 1.7,
      "star1": 107,
      "star2": 204,
      "star3": 498,
      "star4": 251,
      "star5": 163
  },
  "min_order_value": 8
};
const normalizedRestaurant = {
  "id": "40182",
  "name": "Tre Xanh",
  "open": true,
  "reachable": true,
  "categories": [
      "indisch",
      "doner"
  ],
  "online": true,
  "tags": [
      "delivery_home",
      "delivery_pickup",
      "coupon",
      "online_payment",
      "white_label_external",
      "no_option_selected",
      "kinder_menu",
      "accepts_cash",
      "promoted"
  ],
  "logoUri": "https://static-files.pizza.de/media/restaurant_logos/502580_Tre-Xanh_Logo_8e15990a2c1711e7a07ff8bc1207df82.jpg",
  "address": {
      "latitude": 52.551553,
      "longitude": 13.4163927,
      "zipcode": "FOOBAR",
      "streetName": "Dumy Address",
      "streetNumber": "14",
      "city": "Berlin",
      "citySlug": "berlin",
      "state": "",
      "country": "DE",
      "etage": "",
      "door": "",
      "tags": [],
      "comments": "436",
      "company": "",
      "name": "",
      "lastname": ""
  },
  "rating": {
      "average": 1.7,
      "star1": 107,
      "star2": 204,
      "star3": 498,
      "star4": 251,
      "star5": 163
  },
  "minOrderValue": 8
};

it('returns previous state on unknown action type', () => {
  expect(restaurantsReducer([{ id: '123' }], { type: 'UNKNOWN' }))
    .toEqual([{ id: '123' }]);
});

it('returns state with normalized restaurants on FETCH_RESTAURANTS', () => {
  const state = restaurantsReducer(
    [],
    { type: FETCH_RESTAURANTS, payload: [restaurant] }
  );
  expect(state).toEqual([normalizedRestaurant]);
});

it('merges previous state with normalized restaurants from FETCH_RESTAURANTS',
  () => {
    const action = restaurantsReducer(
      [{ ...normalizedRestaurant, id: '123' }],
      { type: FETCH_RESTAURANTS, payload: [restaurant] }
    );
    expect(action).toEqual([
      { ...normalizedRestaurant, id: '123' },
      normalizedRestaurant
    ]);
  },
);
