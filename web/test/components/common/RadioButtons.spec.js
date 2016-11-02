import React from 'react';
import { shallow, mount } from 'enzyme';

import RadioButtons from '../../../src/components/common/RadioButtons';
import EditBox from '../../../src/components/common/EditBox';

describe('Components', function() {
  var component, opts;

  describe('<RadioButtons />', function() {
    context('No additional rendering', function() {
      beforeEach(function() {
        component = mount(
          <RadioButtons
            questionText='choices only'
            renderIfSelected='none'
            options={[ {label: 'foo'}, {label: 'bar'} ]}
            elemId={1}
            radioButtonChange={sinon.spy()}
          />
        )
      })

      afterEach(function() {
        component = null;
      })

      it('renders correctly', function() {
        expect(component).to.have.length(1);
      });

      it('renders question text correctly', function() {
        expect(component.find('div.question-text').text()).to.eq('choices only');
      });

      it('renders radio button <input> tags for all opts', function() {
        expect(component.find('input').length).to.eq(2);
      });

      it('renders both radio buttons appropriately', function() {
        expect(component.find('#1-radioChoice-foo')).to.be.present;
        expect(component.find('#1-radioChoice-bar')).to.be.present;
      });
    });

    context('Text', function() {
      beforeEach(function() {
        opts = [
          {label: 'foo', textIfSelected: '<b>Foo!</b>'},
          {label: 'bar', textIfSelected: '<b>Bar!</b>'}
        ];
        component = mount(
          <RadioButtons
            questionText='text'
            renderIfSelected='text'
            options={opts}
            currentLabel='foo'
            elemId={1}
            radioButtonChange={sinon.spy()}
          />
        )
      })

      afterEach(function() {
        opts = null;
        component = null;
      })

      it('renders the text output', function() {
        expect(component.find('.resulting-text')).to.be.present;
        expect(component.find('.resulting-text').text()).to.equal('Foo!');
      });

      it('renders the correct text output as html', function() {
        expect(component.find('.resulting-text b')).to.be.present;
      });
    });

    context('Input', function() {
      beforeEach(function() {
        opts = [
          {label: 'foo', renderInput: true, inputLabel: 'Foo!'},
          {label: 'bar', renderInput: false, inputLabel: 'Bar!' },
        ];
      });

      afterEach(function() {
        opts = null;
        component = null;
      });

      context('Do input render', function() {
        beforeEach(function() {
          component = mount(
            <RadioButtons
              questionText='input'
              renderIfSelected='input'
              options={opts}
              currentLabel='foo'
              elemId={1}
              radioButtonChange={sinon.spy()}
              radioButtonInputChange={sinon.spy()}
            />
          )
        })

        it('should render a text input', function() {
          expect(component.find('.resulting-input input')).to.be.present;
        });

        it('should properly label the text input label', function() {
          expect(component.find('.resulting-input label').text()).to.equal('Foo!');
        });
      })

      context('Override input render', function() {
        beforeEach(function() {
          component = mount(
            <RadioButtons
              questionText='input'
              renderIfSelected='input'
              options={opts}
              currentLabel='bar'
              elemId={1}
              radioButtonChange={sinon.spy()}
              radioButtonInputChange={sinon.spy()}
            />
          )
        })

        it('should not render a text input', function() {
          expect(component.find('.resulting-input input')).to.not.be.present;
        });
      })
    });

    context('EditBox', function() {
      beforeEach(function() {
        opts = [
          {label: 'foo', editBox: <EditBox text='Foo!' editing={false} onStatusChange={function() {}} onTextChange={function() {}} />},
          {label: 'bar', editBox: <EditBox text='Bar!' editing={false} onStatusChange={function() {}} onTextChange={function() {}} />},
        ];
        component = mount(
          <RadioButtons
            questionText='text'
            renderIfSelected='editBox'
            options={opts}
            currentLabel='foo'
            elemId={1}
            radioButtonChange={sinon.spy()}
          />
        )
      });

      afterEach(function() {
        opts = null;
        component = null;
      });

      it('should properly render an EditBox', function() {
        expect(component.find('EditBox')).to.be.present;
      })

      it('should render the edit box with the proper containing text', function() {
        expect(component.find('EditBox .edit-content').text()).to.equal('Foo!\n')
      })
    });
  });
});
