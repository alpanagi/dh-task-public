import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';

import BackButton from 'components/header/BackButton';
import HeaderButtons from 'components/header/HeaderButtons';

export class Header extends React.Component {

  render() {
    return (
      <Segment basic>
        <Menu text>
          <Menu.Item as={Link} to="/">
            <img src="/logo.png" alt="logo" />
          </Menu.Item>
          <Menu.Item as={Link} to="/">
            <h2>DH Task</h2>
          </Menu.Item>
          <Switch>
            <Route path="/" exact component={HeaderButtons} />
            <Route path="/restaurants/:id" component={BackButton} />
          </Switch>
        </Menu>
      </Segment>
    );
  }
}
export default Header;
