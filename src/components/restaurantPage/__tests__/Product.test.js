import { shallow } from 'enzyme';
import React from 'react';
import { Button, List } from 'semantic-ui-react';

import Product from 'components/restaurantPage/Product';
import normalizedRestaurantDetails from './data/restaurant-details-normalized.data.json';

it('renders the name of the product', () => {
  const wrapper = shallow(
    <Product product={normalizedRestaurantDetails.sections[0].items[0]} />
  );
  expect(wrapper.find(List.Header).render().text()).toEqual('Item 101');
});

it('renders the description of the product', () => {
  const wrapper = shallow(
    <Product product={normalizedRestaurantDetails.sections[0].items[0]} />
  );
  expect(wrapper.find(List.Description).render().text())
    .toEqual('Awesome Item #101');
});

it('renders the price of the product', () => {
  const wrapper = shallow(
    <Product product={normalizedRestaurantDetails.sections[0].items[0]} />
  );
  expect(wrapper.find('.price').render().text()).toEqual('39.3 €');
});

it('renders a button for the product', () => {
  const wrapper = shallow(
    <Product product={normalizedRestaurantDetails.sections[0].items[0]} />
  );
  expect(wrapper.find(Button).length).toEqual(1);
});
