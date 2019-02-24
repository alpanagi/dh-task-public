import { shallow } from 'enzyme';
import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react';

import appHistory from 'appHistory';
import { HeaderButtons } from 'components/header/HeaderButtons';

jest.mock('appHistory');

it('renders a dropdown for sorting with the required values', () => {
  const wrapper = shallow(<HeaderButtons queryParams={{}} />);
  expect(wrapper.find(Dropdown).length).toEqual(1);
  expect(wrapper.find(Dropdown.Item).map(x => x.prop('text')))
    .toEqual([
      'None', 'Name Ascending', 'Name Descending', 'Rating Ascending',
      'Rating Descending', 'Minimum Order Ascending',
      'Minimum Order Descending',
    ]);
});

it('renders a filter button', () => {
  const wrapper = shallow(<HeaderButtons queryParams={{}} />);
  expect(wrapper.find(Button).render().text()).toEqual('Filter');
});

it('changes url to /?sort=name-asc when clicking correct Button', () => {
  const wrapper = shallow(<HeaderButtons queryParams={{}} />);
  wrapper.find({ text: 'Name Ascending' }).simulate('click');
  expect(appHistory.push).toBeCalledWith('/?sort=name-asc');
})

it('changes url to /?sort=name-desc when clicking correct Button', () => {
  const wrapper = shallow(<HeaderButtons queryParams={{}} />);
  wrapper.find({ text: 'Name Descending' }).simulate('click');
  expect(appHistory.push).toBeCalledWith('/?sort=name-desc');
})

it('changes url to /?sort=rating-asc when clicking correct Button', () => {
  const wrapper = shallow(<HeaderButtons queryParams={{}} />);
  wrapper.find({ text: 'Rating Ascending' }).simulate('click');
  expect(appHistory.push).toBeCalledWith('/?sort=rating-asc');
})

it('changes url to /?sort=rating-desc when clicking correct Button', () => {
  const wrapper = shallow(<HeaderButtons queryParams={{}} />);
  wrapper.find({ text: 'Rating Descending' }).simulate('click');
  expect(appHistory.push).toBeCalledWith('/?sort=rating-desc');
})

it('changes url to /?sort=min-order-asc when clicking correct Button', () => {
  const wrapper = shallow(<HeaderButtons queryParams={{}} />);
  wrapper.find({ text: 'Minimum Order Ascending' }).simulate('click');
  expect(appHistory.push).toBeCalledWith('/?sort=min-order-asc');
})

it('changes url to /?sort=min-order-desc when clicking correct Button', () => {
  const wrapper = shallow(<HeaderButtons queryParams={{}} />);
  wrapper.find({ text: 'Minimum Order Descending' }).simulate('click');
  expect(appHistory.push).toBeCalledWith('/?sort=min-order-desc');
})

it('changes url to / when clicking correct Button', () => {
  const wrapper = shallow(<HeaderButtons queryParams={{}} />);
  wrapper.find({ text: 'None' }).simulate('click');
  expect(appHistory.push).toBeCalledWith('/');
})

it('keeps other query params when updating sorting', () => {
  const wrapper = shallow(
    <HeaderButtons queryParams={{ name: 'test', indisch: true }} />
  );
  wrapper.find({ text: 'Rating Ascending' }).simulate('click');
  expect(appHistory.push)
    .toBeCalledWith('/?categories=indisch&name=test&sort=rating-asc');
})

it('updates sorting on query params on updating sorting', () => {
  const wrapper = shallow(
    <HeaderButtons queryParams={{ sort: 'min-asc' }} />
  );
  wrapper.find({ text: 'Rating Ascending' }).simulate('click');
  expect(appHistory.push).toBeCalledWith('/?sort=rating-asc');
})

it('changes filterFormVisibility to true on prop === false', () => {
  const changeFilterFormVisibilityMock = jest.fn();
  const wrapper = shallow(
    <HeaderButtons
      queryParams={{}}
      filterFormVisibility={false}
      changeFilterFormVisibility={changeFilterFormVisibilityMock}
    />
  );
  wrapper.find(Button).simulate('click');
  expect(changeFilterFormVisibilityMock.mock.calls[0][0]).toEqual(true);
});

it('changes filterFormVisibility to false on prop === true', () => {
  const changeFilterFormVisibilityMock = jest.fn();
  const wrapper = shallow(
    <HeaderButtons
      queryParams={{}}
      filterFormVisibility={true}
      changeFilterFormVisibility={changeFilterFormVisibilityMock}
    />
  );
  wrapper.find(Button).simulate('click');
  expect(changeFilterFormVisibilityMock.mock.calls[0][0]).toEqual(false);
});
