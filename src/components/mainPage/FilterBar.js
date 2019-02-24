import React from 'react';
import { connect } from 'react-redux';
import { Button, Header, Label, Segment } from 'semantic-ui-react';

import appHistory from 'appHistory';
import {
  categoryNames, fieldNames, sortingNames, statusNames, tagNames
} from 'appData';

export class FilterBar extends React.Component {

  removeFilters = () => {
    appHistory.push('/');
  }

  renderLabel = (key, value) => {
    if (categoryNames[key] && value === true) {
      return <Label key={key}>{`Category: ${categoryNames[key]}`}</Label>
    }
    if (tagNames[key] && value === true) {
      return <Label key={key}>{`Tag: ${tagNames[key]}`}</Label>
    }
    if (statusNames[key] && value === true) {
      return <Label key={key}>{`Status: ${statusNames[key]}`}</Label>
    }
    if (key === 'sort') {
      return <Label key={value}>{`Sort: ${sortingNames[value]}`}</Label>
    }

    return <Label key={value}>{`${fieldNames[key]}: ${value}`}</Label>
  }

  render() {
    if (Object.keys(this.props.queryParams).length === 0) {
      return null;
    }

    return (
      <Segment basic>
        <Header as="h3" dividing>Filters & Sorting</Header>
        <Button color="orange" floated="right" onClick={this.removeFilters}>
          Clear Filters
        </Button>
        {Object.entries(this.props.queryParams).map(
          ([key, value]) => this.renderLabel(key, value)
        )}
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  queryParams: state.queryParams,
});
export default connect(mapStateToProps)(FilterBar);
