import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Header, Item, Segment } from 'semantic-ui-react';

import ClickableItem from 'components/common/ClickableItem';
import RestaurantInfo from 'components/common/RestaurantInfo';
import filterAndSort from 'components/utils/filterAndSort';

export class RestaurantList extends React.Component {

  renderRestaurant(restaurant) {
    return (
      <ClickableItem key={restaurant.id} path={`/restaurants/${restaurant.id}`}>
        <RestaurantInfo restaurant={restaurant} clickable />
      </ClickableItem>
    );
  }

  render() {
    if (!this.props.restaurants) {
      return null;
    }

    return (
      <Segment basic>
        <Header as="h3" dividing>Restaurants</Header>
        <Item.Group divided relaxed link>
          {this.props.restaurants.map(this.renderRestaurant)}
        </Item.Group>
      </Segment>
    );
  }
};

const decoratedFilterAndSort = createSelector(
  [state => state.queryParams, state => state.restaurants],
  filterAndSort,
);

const mapStateToProps = state => {
  return { restaurants: decoratedFilterAndSort(state) };
}
export default connect(mapStateToProps)(RestaurantList);
