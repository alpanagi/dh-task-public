import _ from 'lodash';

import { FETCH_RESTAURANTS } from 'actions/types';

const normalizeRestaurant = restaurant => {
  return {
    id: restaurant.id,
    name: restaurant.general.name,
    open: restaurant.general.open,
    reachable: restaurant.general.reachable,
    categories: _.uniq(restaurant.general.categories[0].split(',')),
    online: restaurant.general.online,
    tags: restaurant.general.tags,
    logoUri: restaurant.general.logo_uri,
    address: {
        latitude: restaurant.address.latitude,
        longitude: restaurant.address.longitude,
        zipcode: restaurant.address.zipcode,
        streetName: restaurant.address.street_name,
        streetNumber: restaurant.address.street_number,
        city: restaurant.address.city,
        citySlug: restaurant.address.city_slug,
        state: restaurant.address.state,
        country: restaurant.address.country,
        etage: restaurant.address.etage,
        door: restaurant.address.door,
        tags: restaurant.address.tags,
        comments: restaurant.address.comments,
        company: restaurant.address.company,
        name: restaurant.address.name,
        lastname: restaurant.address.lastname,
    },
    rating: {
        average: restaurant.rating.average,
        star1: restaurant.rating.star1,
        star2: restaurant.rating.star2,
        star3: restaurant.rating.star3,
        star4: restaurant.rating.star4,
        star5: restaurant.rating.star5,
    },
    minOrderValue: restaurant.min_order_value,
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_RESTAURANTS:
      const normalizedRestaurants = (action.payload.map(normalizeRestaurant));
      const uniqueRestaurants = _.uniqBy(
        [...state, ...normalizedRestaurants],
        'id',
      );
      return uniqueRestaurants;
    default:
      return state;
  }
};
