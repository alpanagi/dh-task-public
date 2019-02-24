import _ from 'lodash';

import { categoryNames, statusNames, tagNames } from 'appData';

const filterRestaurants = (queryParams, restaurants) => {
  let currentFilters = [];

  Object.keys(statusNames)
    .filter(param => queryParams[param])
    .forEach(param => currentFilters.push(x => x[param] === true));

  const categories = Object.keys(categoryNames)
    .filter(param => queryParams[param])
  if (categories.length > 0) {
    currentFilters.push(
      x => x.categories.some(category => categories.includes(category))
    );
  }

  const tags = Object.keys(tagNames).filter(param => queryParams[param])
  if (tags.length > 0) {
    currentFilters.push(x => x.tags.some(tag => tags.includes(tag)));
  }

  if (queryParams.name) {
    currentFilters.push(x => x.name.toLowerCase().includes(
      queryParams.name.toLowerCase()
    ));
  }

  if (queryParams.zipcode) {
    currentFilters.push(x => x.address.zipcode.toLowerCase().includes(
      queryParams.zipcode.toLowerCase()
    ));
  }

  if (queryParams.streetname) {
    currentFilters.push(x => x.address.streetName.toLowerCase().includes(
      queryParams.streetname.toLowerCase()
    ));
  }

  if (queryParams.streetnumber) {
    currentFilters.push(x => x.address.streetNumber.toLowerCase().includes(
      queryParams.streetnumber.toLowerCase()
    ));
  }

  if (queryParams.rating) {
    currentFilters.push(x => x.rating.average >= queryParams.rating);
  }

  if (queryParams.minorder) {
    currentFilters.push(x => x.minOrderValue >= queryParams.minorder);
  }

  return restaurants.filter(x => currentFilters.every(filter => filter(x)));
};

const sortRestaurants = (sort, restaurants) => {
  switch(sort) {
    case 'name-asc':
      return _.sortBy(restaurants, x => x.name.toLowerCase());
    case 'name-desc':
      return _.orderBy(restaurants, x => x.name.toLowerCase(), ['desc']);
    case 'rating-asc':
      return _.sortBy(restaurants, x => x.rating.average);
    case 'rating-desc':
      return _.orderBy(restaurants, x => x.rating.average, ['desc']);
    case 'min-order-asc':
      return _.sortBy(restaurants, x => x.minOrderValue);
    case 'min-order-desc':
      return _.orderBy(restaurants, x => x.minOrderValue, ['desc']);
    default:
      return restaurants;
  }
};

export default (queryParams, restaurants) => {
  return sortRestaurants(
    queryParams.sort,
    filterRestaurants(queryParams, restaurants),
  );
};
