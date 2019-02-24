import { shallow } from 'enzyme';
import React from 'react';
import { Label, Item } from 'semantic-ui-react';

import RatingLabel from 'components/common/RatingLabel';
import RestaurantInfo from 'components/common/RestaurantInfo';

import normalizedRestaurants from './data/restaurants-normalized.data.json';

it('does not render component when missing restaurant prop', () => {
  const wrapper = shallow(<RestaurantInfo />);
  expect(wrapper.type()).toEqual(null);
});

it('renders logo with the correct url and alt', () => {
  const wrapper = shallow(
    <RestaurantInfo restaurant={normalizedRestaurants[0]} />
  );
  expect(wrapper.find(Item.Image).prop('alt')).toEqual('Tre Xanh');
  expect(wrapper.find(Item.Image).prop('src')).toEqual('https://static-files.pizza.de/media/restaurant_logos/502580_Tre-Xanh_Logo_8e15990a2c1711e7a07ff8bc1207df82.jpg');
});

it('renders name', () => {
  const wrapper = shallow(
    <RestaurantInfo restaurant={normalizedRestaurants[0]} />
  );
  expect(wrapper.find(Item.Header).render().text())
    .toEqual('Tre Xanh1.7');
});

it('renders RatingLabel with correct prop', () => {
  const wrapper = shallow(
    <RestaurantInfo restaurant={normalizedRestaurants[0]} />
  );
  expect(wrapper.find(RatingLabel).length).toEqual(1);
});

it('renders address', () => {
  const wrapper = shallow(
    <RestaurantInfo restaurant={normalizedRestaurants[0]} />
  );
  expect(wrapper.find(Item.Meta).render().text())
    .toEqual('Dumy Address 14, FOOBAR Berlin');
});

it('renders categories with respective keys', () => {
  const wrapper = shallow(
    <RestaurantInfo restaurant={normalizedRestaurants[0]} />
  );
  const categories = ["indisch", "doner"];
  expect(wrapper.find(Item.Extra).find(Label).map(x => x.key()))
    .toEqual(categories);
  expect(wrapper.find(Item.Extra).find(Label).map(x => x.render().text()))
    .toEqual(categories);
});
