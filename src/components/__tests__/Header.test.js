import { mount } from 'enzyme';
import React from 'react';
import { Link } from 'react-router-dom';

import BackButton from 'components/header/BackButton';
import Header from 'components/Header';
import HeaderButtons from 'components/header/HeaderButtons';

import Wrapper from 'testHelpers/wrapper.helper.js';

it('renders a Link for the logo image', () => {
  const wrapper = mount(
    <Wrapper>
      <Header />
    </Wrapper>
  );
  expect(wrapper.find(Link).find('img').prop('src')).toEqual('/logo.png');
});

it('renders a Link for the company name header', () => {
  const wrapper = mount(
    <Wrapper>
      <Header />
    </Wrapper>
  );
  expect(wrapper.find(Link).find('h2').render().text()).toEqual('DH Task');
});

it('renders only HeaderButtons on /', () => {
  const wrapper = mount(
    <Wrapper location={{ pathname: '/' }}>
      <Header />
    </Wrapper>
  );
  expect(wrapper.find(HeaderButtons).length).toEqual(1);
  expect(wrapper.find(BackButton).length).toEqual(0);
});

it('renders only BackButton on /restaurants/:id', () => {
  const wrapper = mount(
    <Wrapper location={{ pathname: '/restaurants/1234' }}>
      <Header />
    </Wrapper>
  );
  expect(wrapper.find(HeaderButtons).length).toEqual(0);
  expect(wrapper.find(BackButton).length).toEqual(1);
});

it('renders no buttons on any other path', () => {
  const wrapper = mount(
    <Wrapper location={{ pathname: '/test' }}>
      <Header />
    </Wrapper>
  );
  expect(wrapper.find(HeaderButtons).length).toEqual(0);
  expect(wrapper.find(BackButton).length).toEqual(0);
});
