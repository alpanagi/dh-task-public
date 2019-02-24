import { shallow } from 'enzyme';
import React from 'react';

import FilterBar from 'components/mainPage/FilterBar';
import FilterForm from 'components/mainPage/FilterForm';
import { MainPage } from 'components/MainPage';
import RestaurantList from 'components/mainPage/RestaurantList';

it('renders FilterForm, FilterBar, and RestaurantList', () => {
  const wrapper = shallow(
    <MainPage
      location={{}}
      loadQueryParams={() => null}
      fetchRestaurants={() => null}
      changeFilterFormVisibility={() => null}
    />
  );
  expect(wrapper.find(FilterForm).length).toEqual(1);
  expect(wrapper.find(FilterBar).length).toEqual(1);
  expect(wrapper.find(RestaurantList).length).toEqual(1);
});

it('calls loadQueryParams with the browser query string', () => {
  const loadQueryParamsMock = jest.fn();
  const wrapper = shallow(
    <MainPage
      location={{ search: '?name=test' }}
      loadQueryParams={loadQueryParamsMock}
      fetchRestaurants={() => null}
      changeFilterFormVisibility={() => null}
    />
  );
  expect(loadQueryParamsMock).toBeCalledWith('?name=test');
});

it('fetches restaurants', () => {
  const fetchRestaurantsMock = jest.fn();
  const wrapper = shallow(
    <MainPage
      location={{ search: '?name=test' }}
      loadQueryParams={() => null}
      fetchRestaurants={fetchRestaurantsMock}
      changeFilterFormVisibility={() => null}
    />
  );
  expect(fetchRestaurantsMock).toBeCalled();
});

it('changes filterFormVisiblity to false on url change', () => {
  const changeFilterFormVisibilityMock = jest.fn();
  const wrapper = shallow(
    <MainPage
      location={{ search: '?name=test' }}
      loadQueryParams={() => null}
      fetchRestaurants={() => null}
      changeFilterFormVisibility={changeFilterFormVisibilityMock}
    />
  );
  wrapper.update();
  expect(changeFilterFormVisibilityMock).toBeCalled();
});
