import { mount } from 'enzyme';
import React from 'react';

import App from 'components/App';
import Header from 'components/Header';
import MainPage from 'components/MainPage';
import RestaurantPage from 'components/RestaurantPage';

import Wrapper from 'testHelpers/wrapper.helper.js';

it('renders a Route for Header, MainPage on /', () => {
  const wrapper = mount(
    <Wrapper location={{ pathname: '/' }}>
      <App />
    </Wrapper>
  );
  expect(wrapper.find(Header).length).toEqual(1);
  expect(wrapper.find(MainPage).length).toEqual(1);
  expect(wrapper.find(RestaurantPage).length).toEqual(0);
});

it('renders a Route for Header, RestaurantPage on /restaurants/:id', () => {
  const wrapper = mount(
    <Wrapper location={{ pathname: '/restaurants/1234' }}>
      <App />
    </Wrapper>
  );
  expect(wrapper.find(Header).length).toEqual(1);
  expect(wrapper.find(MainPage).length).toEqual(0);
  expect(wrapper.find(RestaurantPage).length).toEqual(1);
});

it('renders a Route for Header, MainPage on any other path', () => {
  const wrapper = mount(
    <Wrapper location={{ pathname: '/test' }}>
      <App />
    </Wrapper>
  );
  expect(wrapper.find(Header).length).toEqual(1);
  expect(wrapper.find(MainPage).length).toEqual(1);
  expect(wrapper.find(RestaurantPage).length).toEqual(0);
});
