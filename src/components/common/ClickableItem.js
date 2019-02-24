import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from 'semantic-ui-react';

class ClickableItem extends React.Component {

  render() {
    return (
      <Item as={Link} to={{ pathname: this.props.path, state: true }}>
        {this.props.children}
      </Item>
    );
  }
};
export default ClickableItem;
