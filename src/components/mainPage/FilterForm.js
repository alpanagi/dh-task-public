import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  Button, Checkbox, Dropdown, Header, Form, Segment
} from 'semantic-ui-react';
import queryString from 'query-string';

import { changeFilterFormVisibility } from 'actions';
import { categoryNames, statusNames, tagNames } from 'appData';
import appHistory from 'appHistory';
import normalizeFormValues from 'components/utils/normalizeFormValues';

export class FilterForm extends React.Component {

  onSubmit = formValues => {
    let normalizedFormValues = normalizeFormValues(formValues);
    if (this.props.queryParams.sort) {
      normalizedFormValues.sort = this.props.queryParams.sort;
    }

    if (Object.keys(normalizedFormValues).length > 0) {
      appHistory.push(`/?${queryString.stringify(normalizedFormValues)}`);
    } else {
      appHistory.push('/');
    }
  }

  onSemanticCheckboxChange = field => (event, { checked }) => {
    field.input.onChange(checked);
  }

  renderCheckboxes(items) {
    const renderCheckbox = field => (
      <Checkbox
        checked={field.input.checked}
        onChange={this.onSemanticCheckboxChange(field)}
        label={field.label}
      />
    );

    const renderRow = row => row.map(([value, text]) =>
      <Form.Field key={value}>
        <Field
          name={value}
          type="checkbox"
          component={renderCheckbox}
          label={text}
        />
      </Form.Field>
    );

    return _.chunk(Object.entries(items), 4).map(row =>
      <Form.Group key={row} widths="equal">
        {renderRow(row)}
      </Form.Group>
    );
  }

  onSemanticDropdownChange = field => (event, { value }) => {
    field.input.onChange(value);
  };

  renderRatingDropdown = field => {
    const options = [
      { text: '', value: 'none' },
      { text: '1', value: '1' },
      { text: '2', value: '2' },
      { text: '3', value: '3' },
      { text: '4', value: '4' },
    ];

    return (
      <Dropdown
        selection
        options={options}
        onChange={this.onSemanticDropdownChange(field)}
        value={field.input.value}
      />
    );
  };

  closeFilterForm = () => {
    this.props.changeFilterFormVisibility(false);
  }

  render() {
    if (!this.props.filterFormVisibility) {
      return null;
    }

    return (
      <Segment basic>
        <Header as="h3" dividing>Filter By</Header>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Restaurant Name</label>
              <Field name="name" component="input" />
            </Form.Field>
            <Form.Field>
              <label>Street Name</label>
              <Field name="streetname" component="input" />
            </Form.Field>
            <Form.Field>
              <label>Street Number</label>
              <Field name="streetnumber" component="input" />
            </Form.Field>
            <Form.Field>
              <label>Zipcode</label>
              <Field name="zipcode" component="input" />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Minimum Rating</label>
              <Field
                name="rating"
                component={this.renderRatingDropdown}
              />
            </Form.Field>
            <Form.Field>
              <label>Minimum Order</label>
              <Field name="minorder" component="input" />
            </Form.Field>
          </Form.Group>
          <Header as="h4" dividing>Status</Header>
          {this.renderCheckboxes(statusNames)}
          <Header as="h4" dividing>Categories</Header>
          {this.renderCheckboxes(categoryNames)}
          <Header as="h4" dividing>Tags</Header>
          {this.renderCheckboxes(tagNames)}
          <Button primary type="submit">
            Submit
          </Button>
          <Button id="filterformcancel" onClick={this.closeFilterForm}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  filterFormVisibility: state.filterFormVisibility,
  queryParams: state.queryParams,
  initialValues: state.queryParams,
});
export default connect(mapStateToProps, { changeFilterFormVisibility })(
  reduxForm({ form: 'filter', enableReinitialize: true })(FilterForm)
);
