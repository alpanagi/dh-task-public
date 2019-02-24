import { mount } from 'enzyme';
import React from 'react';
import { Field } from 'redux-form';
import { Dropdown, Header, Form } from 'semantic-ui-react';

import FilterForm from 'components/mainPage/FilterForm';

import Wrapper from 'testHelpers/wrapper.helper';

it('does not render form when filterFormVisibility === false', () => {
  const wrapper = mount(<Wrapper><FilterForm /></Wrapper>);
  expect(wrapper.find(Form).length).toEqual(0);
});

it('renders a form', () => {
  const wrapper = mount(
    <Wrapper initialValues={{ filterFormVisibility: true }}>
      <FilterForm />
    </Wrapper>
  );
  expect(wrapper.find(Form).length).toEqual(1);
});

it('renders Headers for Fitler By, Status, Categories, Tags', () => {
  const wrapper = mount(
    <Wrapper initialValues={{ filterFormVisibility: true }}>
      <FilterForm />
    </Wrapper>
  );
  expect(wrapper.find(Header).length).toEqual(4);
  expect(wrapper.find(Header).map(x => x.render().text()))
    .toEqual(['Filter By', 'Status', 'Categories', 'Tags']);
});

it('renders all labels', () => {
  const wrapper = mount(
    <Wrapper initialValues={{ filterFormVisibility: true }}>
      <FilterForm />
    </Wrapper>
  );
  expect(wrapper.find('label')
    .map(x => x.render().text()))
    .toEqual([
      'Restaurant Name', 'Street Name', 'Street Number', 'Zipcode',
      'Minimum Rating', 'Minimum Order', 'Open', 'Reachable', 'Online',
      'Americanisch', 'Schnitzel Steaks', 'Doner', 'Baguette', 'Fisch',
      'Asiatisch', 'Burger', 'Pizza-Pasta', 'Desserts-Snacks', 'Vegetarisch',
      'Indisch', 'Getrankelieferservice', 'Sushi', 'Delivery Home',
      'Delivery Pickup', 'Coupon', 'Online Payment', 'White Label External',
      'No Option Selected', 'Kinder Menu', 'Accepts Cash', 'Promoted',
    ]);
});

it('renders all inputs with correct names', () => {
  const wrapper = mount(
    <Wrapper initialValues={{ filterFormVisibility: true }}>
      <FilterForm />
    </Wrapper>
  );
  expect(wrapper.find(Field).map(x => x.prop('name')))
    .toEqual([
      'name', 'streetname', 'streetnumber', 'zipcode', 'rating',
      'minorder', 'open', 'reachable', 'online', 'amerikanisch',
      'schnitzel-steaks', 'doner', 'baguette', 'fisch', 'asiatisch',
      'burger', 'pizza-pasta', 'desserts-snacks', 'vegetarisch', 'indisch',
      'getrankelieferservice', 'sushi', 'delivery_home', 'delivery_pickup',
      'coupon', 'online_payment', 'white_label_external',
      'no_option_selected', 'kinder_menu', 'accepts_cash', 'promoted',
    ]);
});

it('renders rating dropdown', () => {
  const wrapper = mount(
    <Wrapper initialValues={{ filterFormVisibility: true }}>
      <FilterForm />
    </Wrapper>
  );
  expect(wrapper.find(Dropdown).length).toEqual(1);
});

describe('data from query params', () => {
  it('shows values as they are in the query params', () => {
    const wrapper = mount(
      <Wrapper initialValues={{
        filterFormVisibility: true,
        queryParams: { name: 'thisisatest', streetname: 'dummy' },
      }}>
        <FilterForm />
      </Wrapper>
    );
    wrapper.update();
    expect(wrapper.find('input[name="name"]').prop('value'))
      .toEqual('thisisatest');
    expect(wrapper.find('input[name="streetname"]').prop('value'))
      .toEqual('dummy');
  });
});
