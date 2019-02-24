import { shallow } from 'enzyme';
import React from 'react';
import { Header } from 'semantic-ui-react';

import RestaurantInfo from 'components/common/RestaurantInfo';
import { RestaurantList } from 'components/mainPage/RestaurantList';

import normalizedRestaurants from './data/restaurants-normalized.data.json';

it('does not render component when missing restaurants prop', () => {
  const wrapper = shallow(
    <RestaurantList
      fetchRestaurants={() => undefined}
    />
  );
  expect(wrapper.type()).toEqual(null);
});

it('renders a Restaurants header', () => {
  const wrapper = shallow(
    <RestaurantList
      fetchRestaurants={() => undefined}
      restaurants={[]}
    />
  );
  expect(wrapper.find(Header).length).toEqual(1);
});

it('renders a RestaurantInfo component for each restaurant', () => {
  const wrapper = shallow(
    <RestaurantList
      fetchRestaurants={() => undefined}
      restaurants={normalizedRestaurants}
    />
  );
  expect(wrapper.find(RestaurantInfo).length).toEqual(9);
});
