import React from 'react';
import { Button, List } from 'semantic-ui-react';

class Product extends React.PureComponent {

  onButtonClick = product => event => console.log(product);

  render() {
    const product = this.props.product;

    return (
      <List.Item>
        <List.Content floated="right">
          <span className="price" style={{ marginRight: '10px' }}>
            {product.price} €
          </span>
          <Button primary onClick={this.onButtonClick(product)}>
            Add to Cart
          </Button>
        </List.Content>
        <List.Content>
          <List.Header>{product.name}</List.Header>
          <List.Description>{product.description}</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}
export default Product;
