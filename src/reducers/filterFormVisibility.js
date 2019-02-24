import { VISIBLE_FILTER_FORM } from 'actions/types';

export default (state = false, action) => {
  switch (action.type) {
    case VISIBLE_FILTER_FORM:
      return action.payload;
    default:
      return state;
  }
};
