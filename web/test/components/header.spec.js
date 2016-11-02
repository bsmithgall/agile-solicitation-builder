import React from 'react';
import { shallow } from 'enzyme';

import Header from '../../src/components/header'

describe('Components', function() {
  describe('<Header />', function() {
    it('renders correctly', function() {
      const header = shallow(<Header />);
      expect(header).to.have.length(1);
    })
  })
})
