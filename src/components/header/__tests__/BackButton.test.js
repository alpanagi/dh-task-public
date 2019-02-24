import { shallow } from 'enzyme';
import React from 'react';
import { Button } from 'semantic-ui-react';

import appHistory from 'appHistory';
import BackButton from 'components/header/BackButton';

jest.mock('appHistory');

it('renders a button', () => {
  const wrapper = shallow(<BackButton location={{}} />);
  expect(wrapper.find(Button).length).toEqual(1);
});

it('goes to / when clicked with no state in history', () => {
  const wrapper = shallow(<BackButton location={{}} />);
  wrapper.find(Button).simulate('click');
  expect(appHistory.push.mock.calls[0][0]).toEqual('/');
});

it('calls go back when clicked with state in history', () => {
  const wrapper = shallow(<BackButton location={{ state: true }} />);
  wrapper.find(Button).simulate('click');
  expect(appHistory.goBack).toBeCalled();
});
