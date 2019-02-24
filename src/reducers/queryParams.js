import _ from 'lodash';
import queryString from 'query-string';

import { LOAD_QUERY_PARAMS } from 'actions/types';
import {
  categoryNames, textFieldNames, sortingNames, statusNames, tagNames
} from 'appData';

const normalizeList = (names, listString) => {
  const resultObj = {};
  listString.split(',').forEach(item => {
    if (Object.keys(names).includes(item)) {
      resultObj[item] = true;
    }
  });

  return resultObj;
};

const normalizeQueryParams = queryParams => {
  const normalizedParams = _.pick(queryParams, ...Object.keys(textFieldNames));
  if (Object.keys(sortingNames).includes(queryParams.sort)) {
    normalizedParams.sort = queryParams.sort;
  }
  if (!isNaN(queryParams.rating)) {
    normalizedParams.rating = queryParams.rating;
  }
  if (!isNaN(queryParams.minorder)) {
    normalizedParams.minorder = queryParams.minorder;
  }
  if (queryParams.categories) {
    Object.assign(
      normalizedParams,
      normalizeList(categoryNames, queryParams.categories),
    );
  }
  if (queryParams.tags) {
    Object.assign(normalizedParams, normalizeList(tagNames, queryParams.tags));
  }
  if (queryParams.status) {
    Object.assign(
      normalizedParams,
      normalizeList(statusNames, queryParams.status),
    );
  }
  return normalizedParams;
};

export default (state = {}, action) => {
  switch(action.type) {
    case LOAD_QUERY_PARAMS:
      return normalizeQueryParams(queryString.parse(action.payload));
    default:
      return state;
  }
};
