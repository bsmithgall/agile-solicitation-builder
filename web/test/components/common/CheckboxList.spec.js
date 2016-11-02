import React from 'react';
import { shallow, mount } from 'enzyme';

import CheckboxList from '../../../src/components/common/CheckboxList'

describe('Components', function() {

  var component, opts;
  describe('<CheckboxList />', function() {
    beforeEach(function() {
      opts = [
        {id: 'testfoo', label: 'foo'},
        {id: 'testbar', label: 'bar'}
      ]

      component = mount(
        <CheckboxList
          questionText='foo'
          renderResults={true}
          resultQuestionText='bar'
          resultQuestionDescription='baz'

          handleCheck={sinon.spy()}
          options={opts}
          currentChecked={['foo']}
          checkboxListEditBoxChange={sinon.spy()}
        />
      )
    })

    it('renders correctly', function() {
      expect(component).to.have.length(1);
    });

    it('properly sets the question-text internal div', function() {
      expect(component.find('.checkbox-list-container .question.checkbox-list div.question-text').text()).to.equal('foo')
    });

    it('properly sets the question ul', function() {
      expect(component.find('ul').children()).to.have.length(2);
    });

    it('properly sets both checkbox inputs', function() {
      expect(component.find('#checkboxOptions-foo')).to.be.present;
      expect(component.find('#checkboxOptions-bar')).to.be.present;
    });

    it('should not have a resulting-text container div on load', function() {
      expect(component.find('div.check-resulting-text')).to.be.blank;
    });
  })
})
