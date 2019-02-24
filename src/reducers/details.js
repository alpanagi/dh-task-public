import _ from 'lodash';

import { FETCH_RESTAURANT_DETAILS } from 'actions/types';

const normalizeDetails = details => {
  return {
    name: details.info.name,
    categories: details.info.categories,
    tags: details.info.tags,
    logoUri: details.info.logoUri,
    ...(_.omit(details, 'info')),
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_RESTAURANT_DETAILS:
      return {
        ...state,
        [action.payload.id]: normalizeDetails(action.payload.details),
      };
    default:
      return state;
  }
};
