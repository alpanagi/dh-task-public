import axios from 'axios';
import { mount } from 'enzyme';
import React from 'react';
import { Button, Dropdown, Form } from 'semantic-ui-react';

import appHistory from 'appHistory';
import App from 'components/App';
import RestaurantInfo from 'components/common/RestaurantInfo';
import restaurants from './data/restaurants.data.json';

import Wrapper from 'testHelpers/wrapper.helper';

jest.mock('axios');
axios.get.mockImplementation(url => {
  if (url === 'https://mockapi.pizza.de/v1/restaurants')
    return Promise.resolve({ data: { data: restaurants }});
  else if (url === 'https://mockapi.pizza.de/v1/auth')
    return Promise.resolve({ data: { token: '1234' }});
});

jest.mock('appHistory');

it('calls mockapi to get restaurant data', done => {
  const wrapper = mount(
    <Wrapper>
      <App />
    </Wrapper>
  );
  setTimeout(() => {
    wrapper.update();
    expect(wrapper.find(RestaurantInfo).length).toEqual(25);
    done();
  }, 1000);
});

it('redirects to a different url when selecting a sorting method', done => {
  const wrapper = mount(
    <Wrapper>
      <App />
    </Wrapper>
  );
  setTimeout(() => {
    wrapper.find(Dropdown).first().find('span').last().simulate('click');
    wrapper.update();
    expect(appHistory.push.mock.calls[0][0]).toEqual('/?sort=min-order-desc');
    done();
  }, 1000);
});

it('opens filter form on Filter click', done => {
  const wrapper = mount(
    <Wrapper>
      <App />
    </Wrapper>
  );
  setTimeout(() => {
    expect(wrapper.find(Form).length).toEqual(0);
    wrapper.find(Button).first().simulate('click');
    wrapper.update();
    expect(wrapper.find(Form).length).toEqual(1);
    done();
  }, 1000);
});


it('closes filter form on #filterformcancel click', done => {
  const wrapper = mount(
    <Wrapper>
      <App />
    </Wrapper>
  );
  setTimeout(() => {
    expect(wrapper.find(Form).length).toEqual(0);
    wrapper.find(Button).first().simulate('click');
    wrapper.update();
    expect(wrapper.find(Form).length).toEqual(1);
    wrapper.find('#filterformcancel').first().simulate('click');
    wrapper.update();
    expect(wrapper.find(Form).length).toEqual(0);
    done();
  }, 1000);
});
