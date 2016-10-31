var React = require('react');
var StateMixin = require('../../state_mixin');

const initState = {
  resultString: '',
  options: {},
  renderedOptions: {}
}

var Checkbox = React.createClass({
  mixins: [StateMixin],

  getInitialState: function() {
    for (var option in this.props.options) {
      initState.options[option] = false;
      initState.renderedOptions[option] = ''
    }
    return initState;
  },

  handleCheck: function(key, event) {
    var newState = Object.assign({}, this.state);
    newState.options[key] = !this.state.options[key];

    checkedOpts = [];
    for (var option in newState.options) {
      if (newState.options[option] === true) {
        checkedOpts.push(this.props.options[option])
      }
    }
    newState.resultString = checkedOpts.join(', ').replace(/,\s([^,]+)$/, ' and $1');
    this.setState(newState);
  },

  renderResultEditBoxes: function() {
    var editBoxes = [];
    for (var option in this.state.options) {
      if (this.state.options[option] === true) {
        editBoxes.push(
          <div key={option}>
            <p>{this.props.options[option]}</p>
            <textarea
              rows="2"
              value={this.state.renderedOptions[option]}
            />
          </div>
        )
      }
    }
    return editBoxes;
  },

  renderResultingText: function() {
    if (this.props.renderResults === true && this.state.resultString.length > 0) {
      return (
        <div>
          <div className="resulting-text">The users of the product will include {this.state.resultString}</div>
          <div className="question">
            <div className="question-text">{this.props.resultQuestionText}</div>
            <div className="question-description">{this.props.resultQuestionDescription}</div>
            {this.renderResultEditBoxes()}
          </div>
        </div>
      )
    } else {
      return '';
    }
  },

  render: function() {
    var options = [];
    for (var key in this.props.options) {
      options.push(
        <li className="checkbox" key={key}>
          <input
            type="checkbox"
            id={"userTypesOptions:" + key}
            onClick={this.handleCheck.bind(this, key)}
            checked={this.state.options[key] === true}
          />

				  <label htmlFor={"userTypesOptions:" + key}>{this.props.options[key]}</label>
        </li>
      )
    }

    return (
      <div className="question">
        <div className="question-text">{this.props.questionText}</div>

        <fieldset className="usa-fieldset-inputs">
          <legend className="usa-sr-only">{this.props.questionText}</legend>
          <ul className="usa-unstyled-list">
            {options}
          </ul>
        </fieldset>

        {this.renderResultingText()}
      </div>
    )
  }
})

module.exports = Checkbox;
