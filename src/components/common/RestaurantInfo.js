import React from 'react';
import { Label, Item } from 'semantic-ui-react';

import RatingLabel from 'components/common/RatingLabel';

class RestaurantInfo extends React.PureComponent {

  render() {
    const restaurant = this.props.restaurant;
    if (!restaurant) {
      return null;
    }

    const { streetName, streetNumber, zipcode, city } = restaurant.address;
    return (
      <>
        <Item.Image
          size="tiny"
          src={restaurant.logoUri}
          alt={restaurant.name}
        />
        <Item.Content verticalAlign="middle">
          <Item.Header className="ui">
            {restaurant.name}
            <RatingLabel rating={restaurant.rating.average} />
          </Item.Header>
          <Item.Meta>
            {`${streetName} ${streetNumber}, ${zipcode} ${city}`}
          </Item.Meta>
          <Item.Extra>
            {restaurant.categories.map(x => <Label key={x}>{x}</Label>)}
          </Item.Extra>
        </Item.Content>
      </>
    );
  }
};
export default RestaurantInfo;
