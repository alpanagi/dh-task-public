import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Menu } from 'semantic-ui-react';
import queryString from 'query-string';

import { changeFilterFormVisibility } from 'actions';
import appHistory from 'appHistory';
import normalizeFormValues from 'components/utils/normalizeFormValues';

export class HeaderButtons extends React.Component {

  onFilterClick = event => {
    this.props.changeFilterFormVisibility(!this.props.filterFormVisibility);
  };

  onSortChange = sorting => event => {
    let newQueryParams = _.omit(this.props.queryParams, 'sort');
    newQueryParams = normalizeFormValues(newQueryParams);
    if (sorting !== 'none') {
      newQueryParams.sort = sorting;
    }

    if (Object.keys(newQueryParams).length > 0) {
      appHistory.push(`/?${queryString.stringify(newQueryParams)}`);
    } else {
      appHistory.push('/');
    }
  };

  render() {
    return (
      <Menu.Menu position="right">
        <Dropdown item closeOnChange text="Sort By">
          <Dropdown.Menu>
            <Dropdown.Item onClick={this.onSortChange('none')} text="None" />
            <Dropdown.Item
              onClick={this.onSortChange('name-asc')}
              text='Name Ascending'
            />
            <Dropdown.Item
              onClick={this.onSortChange('name-desc')}
              text='Name Descending'
            />
            <Dropdown.Item
              onClick={this.onSortChange('rating-asc')}
              text='Rating Ascending'
            />
            <Dropdown.Item
              onClick={this.onSortChange('rating-desc')}
              text='Rating Descending'
            />
            <Dropdown.Item
              onClick={this.onSortChange('min-order-asc')}
              text='Minimum Order Ascending'
            />
            <Dropdown.Item
              onClick={this.onSortChange('min-order-desc')}
              text='Minimum Order Descending'
            />
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item>
          <Button primary onClick={this.onFilterClick}>
            Filter
          </Button>
        </Menu.Item>
      </Menu.Menu>
    );
  }
};

const mapStateToProps = state => ({
  filterFormVisibility: state.filterFormVisibility,
  queryParams: state.queryParams,
});
const mapDispatchToProps = {
  changeFilterFormVisibility,
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderButtons);
