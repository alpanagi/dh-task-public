import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Header from 'components/Header';
import MainPage from 'components/MainPage';
import RestaurantPage from 'components/RestaurantPage';

class App extends React.Component {

  render() {
    return (
      <Container>
        <Header />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/restaurants/:id" component={RestaurantPage} />
          <Redirect to="/" />
        </Switch>
      </Container>
    );
  }
};
export default App;
