var React = require('react');
var StateMixin = require('../../state_mixin');
var EditBox = require('./EditBox');

var radioButtonPropTypes = {
  questionText: React.PropTypes.string.isRequired,
  editBoxIfSelected: React.PropTypes.bool.isRequired,
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      textIfSelected: React.PropTypes.string,
      editBoxIfSelected: React.PropTypes.element
    })
  )
}

var RadioButtons = React.createClass({
  propTypes: radioButtonPropTypes,

  mixins: [StateMixin],

  getInitialState: function() {
    var elemId = this.props.elemId || Math.floor(Math.random() * 1000);
    return {
      elemId: elemId,
      currentChecked: {label: null}
    };
  },

  handleUpdate: function(event, key) {
    var newState = Object.assign({}, this.state);
    newState.currentChecked = this.props.options.filter(function(option) {
      return option.label === event.target.id.split('radioChoice-')[1];
    })[0];
    this.setState(newState);
  },

  makeRadioButtonChoices: function() {
    var choices = [];
    var state = this.state;
    this.props.options.forEach(function(option) {
      choices.push(
        <li className="radio" key={option.label}>
          <input
            type="radio"
            id={state.elemId + '-radioChoice-' + option.label}
            checked={state.currentChecked.label === option.label}
          />
          <label htmlFor={state.elemId + '-radioChoice-' + option.label}>{option.label}</label>
        </li>
      )
    });
    return choices;
  },

  renderSelection: function() {
    if (this.props.editBoxIfSelected && this.state.currentChecked.label !== null ) {
      return (
        this.state.currentChecked.editBoxIfSelected
      )
    } else if (this.state.currentChecked.label !== null) {
      return (
        <div
          className="resulting-text"
          dangerouslySetInnerHTML={ {__html: this.state.currentChecked.textIfSelected } }
        />
      )
    }
  },

  render: function() {
    return (
      <div className="radio-buttons-container">
        <div className="question">
          <div className="question-text">{this.props.questionText}</div>

          <fieldset className="usa-fieldset-inputs">
            <legend className="usa-sr-only">{this.props.questionText}</legend>
            <ul
              className="usa-unstyled-list"
              onChange={this.handleUpdate}
            >
              {this.makeRadioButtonChoices()}
            </ul>
          </fieldset>
        </div>

        {this.renderSelection()}
      </div>
    )
  }
})

module.exports = RadioButtons;
