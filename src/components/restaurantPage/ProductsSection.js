import React from 'react';
import { List, Segment } from 'semantic-ui-react';

import Product from 'components/restaurantPage/Product';

class ProductsSection extends React.Component {

  render() {
    const section = this.props.section;
    if (!section) {
      return null;
    }

    return (
      <Segment basic>
        <h1>{section.name}</h1>
        <List relaxed>
          {section.items.map(item => <Product key={item.id} product={item} />)}
        </List>
      </Segment>
    );
  }
}
export default ProductsSection;
