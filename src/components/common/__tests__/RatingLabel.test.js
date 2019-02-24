import { shallow } from 'enzyme';
import React from 'react';
import { Label } from 'semantic-ui-react';

import RatingLabel from 'components/common/RatingLabel';

it('renders the rating', () => {
  const wrapper = shallow(<RatingLabel rating={1.7} />);
  expect(wrapper.render().text()).toEqual('1.7');
});

it('renders a label for the rating with color based on rating', () => {
  const wrapper = shallow(
    <RatingLabel rating={1.7} />
  );
  expect(wrapper.find(Label).prop('style').backgroundColor)
    .toEqual('#844400');
});
