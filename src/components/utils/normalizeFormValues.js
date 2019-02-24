import _ from 'lodash';

import { categoryNames, statusNames, tagNames } from 'appData';

export default formValues => {
  let normalizedFormValues =
    _.pick(formValues, 'name', 'streetname', 'streetnumber', 'zipcode');
  if (!isNaN(Number(formValues.rating))) {
    _.set(normalizedFormValues, 'rating', formValues.rating);
  }
  if (!isNaN(Number(formValues.minorder))) {
    _.set(normalizedFormValues, 'minorder', formValues.minorder);
  }
  _.set(
    normalizedFormValues,
    'status',
    Object.keys(statusNames).filter(x => formValues[x]).join(',')
  );
  _.set(
    normalizedFormValues,
    'categories',
    Object.keys(categoryNames).filter(x => formValues[x]).join(',')
  );
  _.set(
    normalizedFormValues,
    'tags',
    Object.keys(tagNames).filter(x => formValues[x]).join(',')
  );
  normalizedFormValues = _.omitBy(normalizedFormValues, _.isEmpty);

  return normalizedFormValues;
};
