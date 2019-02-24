import { shallow } from 'enzyme';
import React from 'react';
import { Button, Label } from 'semantic-ui-react';

import appHistory from 'appHistory';
import { FilterBar } from 'components/mainPage/FilterBar';

jest.mock('appHistory');

it('does not render FilterBar when no queryParams', () => {
  const wrapper = shallow(<FilterBar queryParams={{}} />);
  expect(wrapper.type()).toEqual(null);
});

it('renders clear filters button', () => {
  const wrapper = shallow(<FilterBar queryParams={{ name: 'test' }} />);
  expect(wrapper.find(Button).render().text()).toEqual('Clear Filters');
});

it('renders correct label for name, streetname, streetnumber', () => {
  const wrapper = shallow(
    <FilterBar
      queryParams={{ name: 'test', streetname: 'Dumy', streetnumber: '14' }}
    />
  );
  expect(wrapper.find(Label).map(x => x.render().text()))
    .toEqual(['Name: test', 'Street Name: Dumy', 'Street Number: 14']);
});

it('renders correct label for zipcode, rating, minimumorder', () => {
  const wrapper = shallow(
    <FilterBar
      queryParams={{ zipcode: 'FOOBAR', rating: '4', minorder: '4' }}
    />
  );
  expect(wrapper.find(Label).map(x => x.render().text()).sort())
    .toEqual(['Minimum Order: 4', 'Rating: 4', 'Zipcode: FOOBAR']);
});

it('renders correct label for sorting', () => {
  const wrapper = shallow(<FilterBar queryParams={{ sort: 'name-asc' }} />);
  expect(wrapper.find(Label).map(x => x.render().text()).sort())
    .toEqual(['Sort: Name Ascending']);
});

it('renders correct labels for categories', () => {
  const wrapper = shallow(
    <FilterBar queryParams={{ indisch: true, amerikanisch: true }} />
  );
  expect(wrapper.find(Label).map(x => x.render().text()))
    .toEqual(['Category: Indisch', 'Category: Americanisch']);
});

it('renders correct labels for tags', () => {
  const wrapper = shallow(
    <FilterBar queryParams={{ delivery_home: true, coupon: true }} />
  );
  expect(wrapper.find(Label).map(x => x.render().text()))
    .toEqual(['Tag: Delivery Home', 'Tag: Coupon']);
});

it('renders correct labels for status', () => {
  const wrapper = shallow(
    <FilterBar queryParams={{ open: true, reachable: true }} />
  );
  expect(wrapper.find(Label).map(x => x.render().text()))
    .toEqual(['Status: Open', 'Status: Reachable']);
});

it('goes to / when clicking clear filters', () => {
  const wrapper = shallow(<FilterBar queryParams={{ name: 'test' }} />);
  wrapper.find(Button).simulate('click');
  expect(appHistory.push).toBeCalledWith('/');
});
