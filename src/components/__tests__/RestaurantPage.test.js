import { shallow } from 'enzyme';
import React from 'react';

import RestaurantInfo from 'components/common/RestaurantInfo';
import ProductsSection from 'components/restaurantPage/ProductsSection';
import { RestaurantPage } from 'components/RestaurantPage';

import normalizedRestaurantDetails from './data/restaurant-details-normalized.data.json';

it('does not render component when missing restaurant prop', () => {
  const wrapper = shallow(
    <RestaurantPage
      match={{ params: { id: '123' }}}
      fetchRestaurantDetails={() => undefined}
    />
  );
  expect(wrapper.type()).toEqual(null);
});

describe('RestaurantPage with props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <RestaurantPage
        details={normalizedRestaurantDetails}
        match={{ params: { id: '123' }}}
        fetchRestaurantDetails={() => undefined}
      />
    );
  });

  it('renders a RestaurantInfo component', () => {
    expect(wrapper.find(RestaurantInfo).length).toEqual(1);
  });

  it('renders each section using a ProductSection component', () => {
    expect(wrapper.find(ProductsSection).length).toEqual(5);
  });

  it('passes a restaurant to RestaurantInfo', () => {
    expect(wrapper.find(RestaurantInfo).prop('restaurant'))
      .toEqual(normalizedRestaurantDetails);
  });

  it('passes a restaurant to each ProductsSection', () => {
    expect(wrapper.find(ProductsSection).map(x => x.prop('section').id))
      .toEqual([745491, 125496, 294066, 201024, 24411]);
  });
});
