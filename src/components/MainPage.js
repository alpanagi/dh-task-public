import React from 'react';
import { connect } from 'react-redux';

import {
  changeFilterFormVisibility, fetchRestaurants, loadQueryParams
} from 'actions';
import FilterBar from 'components/mainPage/FilterBar';
import FilterForm from 'components/mainPage/FilterForm';
import RestaurantList from 'components/mainPage/RestaurantList';

export class MainPage extends React.Component {

  componentDidMount() {
    this.props.loadQueryParams(this.props.location.search);
    this.props.changeFilterFormVisibility(false);
    this.props.fetchRestaurants();
  }

  componentDidUpdate() {
    this.props.loadQueryParams(this.props.location.search);
    this.props.changeFilterFormVisibility(false);
  }

  render() {
    return (
      <>
        <FilterForm />
        <FilterBar />
        <RestaurantList />
      </>
    );
  };
};

const mapDispatchToProps = ({
  changeFilterFormVisibility,
  fetchRestaurants,
  loadQueryParams,
});
export default connect(null, mapDispatchToProps)(MainPage);
