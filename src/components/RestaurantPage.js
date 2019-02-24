import React from 'react';
import { connect } from 'react-redux';
import { Item, Segment } from 'semantic-ui-react';

import { fetchRestaurantDetails } from 'actions';
import RestaurantInfo from 'components/common/RestaurantInfo';
import ProductsSection from 'components/restaurantPage/ProductsSection';

export class RestaurantPage extends React.Component {

  componentDidMount() {
    this.props.fetchRestaurantDetails(this.props.match.params.id);
  }

  render() {
    const details = this.props.details;
    if (!details) {
      return null;
    }

    return (
      <>
        <Segment basic>
          <Item.Group>
            <Item>
              <RestaurantInfo restaurant={details} />
            </Item>
          </Item.Group>
        </Segment>
        {details.sections.map(
          section => <ProductsSection key={section.id} section={section} />
        )}
      </>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    details: state.details[id],
  };
}
const mapDispatchToProps = {
  fetchRestaurantDetails,
};
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage);
