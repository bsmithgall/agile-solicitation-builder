var React = require('react');
var EditBox = require('./EditBox');

var radioButtonPropTypes = {
  questionText: React.PropTypes.string.isRequired,
  currentLabel: React.PropTypes.string,
  renderIfSelected: React.PropTypes.oneOf(['editBox', 'input', 'text', 'none']).isRequired,
  radioButtonChange: React.PropTypes.func.isRequired,
  radioButtonInputChange: React.PropTypes.func,
  radioButtonEditBoxChange: React.PropTypes.func,
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      textIfSelected: React.PropTypes.string,
      editBox: React.PropTypes.element,
      inputLabel: React.PropTypes.string,
      renderInput: React.PropTypes.bool
    })
  )
}

var RadioButtons = React.createClass({
  propTypes: radioButtonPropTypes,

  getLabel: function() {
    var props = this.props;
    var filtered = props.options.filter(function(option) {
      return option.label === props.currentLabel;
    });
    return filtered.length === 0 ? { label: null } : filtered[0]
  },

  makeRadioButtonChoices: function(elemId) {
    var choices = [];
    var props = this.props;
    this.props.options.forEach(function(option) {
      choices.push(
        <li className="radio" key={option.label}>
          <input
            type="radio"
            id={elemId + '-radioChoice-' + option.label}
            onChange={props.radioButtonChange}
            checked={option.label === props.currentLabel}
          />
          <label htmlFor={elemId + '-radioChoice-' + option.label}>{option.label}</label>
        </li>
      )
    });
    return choices;
  },

  renderSelection: function() {
    var currentChecked = this.getLabel();
    if (currentChecked.label !== null) {
      switch (this.props.renderIfSelected) {
        case 'none':
          return '';
          break;
        case 'editBox':
          return currentChecked.editBox;
          break;
        case 'input':
          if (currentChecked.renderInput) {
            return (
              <div className="resulting-input">
                <label>{currentChecked.inputLabel}</label>
                <input type="text" className="medium-response" onChange={this.props.radioButtonInputChange} />
              </div>
            );
          }
          break;
        case 'text':
          return (
            <div
              className="resulting-text"
              dangerouslySetInnerHTML={ {__html: currentChecked.textIfSelected } }
            />
          );
          break;
        default:
          return '';
          break;
      }
    }
  },

  render: function() {
    var elemId = this.props.elemId || Math.floor(Math.random() * 1000);
    return (
      <div className="radio-buttons-container">
        <div className="question">
          <div className="question-text">{this.props.questionText}</div>

          <fieldset className="usa-fieldset-inputs">
            <legend className="usa-sr-only">{this.props.questionText}</legend>
            <ul className="usa-unstyled-list">
              {this.makeRadioButtonChoices(elemId)}
            </ul>
          </fieldset>
        </div>

        {this.renderSelection()}
      </div>
    )
  }
})

module.exports = RadioButtons;
