import React from 'react';
import { Button, Menu } from 'semantic-ui-react';

import appHistory from 'appHistory';

class BackButton extends React.Component {

  onClick = () => {
    if (this.props.location.state) {
      appHistory.goBack();
    } else {
      appHistory.push('/');
    }
  };

  render() {
    return (
      <Menu.Menu position="right">
        <Menu.Item>
          <Button onClick={this.onClick}>Back</Button>
        </Menu.Item>
      </Menu.Menu>
    );
  }
};
export default BackButton;
