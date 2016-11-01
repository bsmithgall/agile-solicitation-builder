import React from 'react';
import { shallow, mount } from 'enzyme';

import RadioButtons from '../../../src/components/common/RadioButtons'

describe('Components', function() {
  var component, opts;

  describe('<RadioButtons />', function() {
    context('No embedded edit box', function() {
      opts = [
        { label: 'foo', textIfSelected: 'foo!' },
        { label: 'bar', textIfSelected: 'bar!' }
      ]

      component = mount(
        <RadioButtons
          questionText='test radio buttons'
          renderIfSelected='none'
          options={opts}
          elemId={1}
          radioButtonChange={sinon.spy()}
        />
      )

      it('renders correctly', function() {
        expect(component).to.have.length(1);
      });

      it('renders question text correctly', function() {
        expect(component.find('div.question-text').text()).to.eq('test radio buttons');
      });

      it('renders radio button <input> tags for all opts', function() {
        expect(component.find('input').length).to.eq(2);
      });

      it('renders both radio buttons appropriately', function() {
        expect(component.find('#1-radioChoice-foo')).to.be.present;
        expect(component.find('#1-radioChoice-bar')).to.be.present;
      })
    })
  })
})
