import { shallow } from 'enzyme';
import React from 'react';
import { Button, List } from 'semantic-ui-react';

import Product from 'components/restaurantPage/Product';
import ProductsSection from 'components/restaurantPage/ProductsSection';
import normalizedRestaurantDetails from './data/restaurant-details-normalized.data.json';

it('does not render component when missing section prop', () => {
  const wrapper = shallow(<ProductsSection />);
  expect(wrapper.type()).toEqual(null);
});

it('renders a Product for each item in a section with correct product', () => {
  const wrapper = shallow(
    <ProductsSection section={normalizedRestaurantDetails.sections[0]} />
  );
  expect(wrapper.find(Product).length).toEqual(6);
  expect(wrapper.find(Product).map(x => x.key()))
    .toEqual(['31231', '531550', '582635', '764284', '527228', '147330']);
  expect(wrapper.find(Product).map(x => x.prop('product')))
    .toEqual(normalizedRestaurantDetails.sections[0].items);
});
