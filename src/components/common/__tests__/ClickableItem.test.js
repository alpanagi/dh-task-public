import { shallow } from 'enzyme';
import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from 'semantic-ui-react';

import ClickableItem from 'components/common/ClickableItem';

it('renders children', () => {
  const wrapper = shallow(
    <ClickableItem path="/">
      <div>test1</div>
      <div>test2</div>
    </ClickableItem>
  );
  expect(wrapper.find('div').map(x => x.render().text()))
    .toEqual(['test1', 'test2']);
})

it('renders a Link with the correct path if path is set', () => {
  const wrapper = shallow(
    <ClickableItem path="/restaurants/1234">
    </ClickableItem>
  );
  expect(wrapper.find(Item).prop('as')).toEqual(Link);
  expect(wrapper.find(Item).prop('to').pathname).toEqual('/restaurants/1234');
});
