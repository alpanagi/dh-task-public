import React from 'react';
import { Label } from 'semantic-ui-react';

class RatingLabel extends React.Component {

  render() {
    const ratingColorValue = Math.floor((this.props.rating / 5) * 200);
    const redValue = (200 - ratingColorValue).toString(16).padStart(2, '0');
    const greenValue = ratingColorValue.toString(16).padStart(2, '0');

    return (
      <Label
        pointing="left"
        horizontal
        style={{
          backgroundColor: `#${redValue}${greenValue}00`,
          color: 'white',
          marginLeft: '12px',
        }}
      >
        {this.props.rating}
      </Label>
    );
  }
};
export default RatingLabel;
