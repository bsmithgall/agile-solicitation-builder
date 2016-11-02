var React = require('react');

var checkboxListPropTypes = {
  resultQuestionText: React.PropTypes.string.isRequired,
  resultQuestionDescription: React.PropTypes.string,
  renderResults: React.PropTypes.bool,
  handleCheck: React.PropTypes.func.isRequired,
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      inputId: React.PropTypes.string,
      label: React.PropTypes.string,
      editBox: React.PropTypes.bool
    })
  ),
  checkboxListEditBoxChange: React.PropTypes.func.isRequired,
  currentChecked: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  currentCheckedInputs: React.PropTypes.objectOf(React.PropTypes.string)
}

var CheckboxList = React.createClass({
  propTypes: checkboxListPropTypes,

  componentWillMount: function() {
    var elemId = this.props.elemId || Math.floor(Math.random() * 1000)
    this.setState({elemId: elemId})
  },

  computeResultString: function() {
    return this.props.currentChecked.join(', ').replace(/,\s([^,]+)$/, ' and $1');
  },

  renderResultEditBoxes: function() {
    var editBoxes = [];
    var props = this.props;
    var state = this.state;
    this.props.options.forEach(function(option) {
      if (props.currentChecked.indexOf(option.label) > -1 && option.editBox === true) {
        editBoxes.push(
          <div key={state.elemId + '-CheckboxList-' + option.id}>
            <p>{option.label}</p>
            <textarea
              rows="2"
              data-label={option.inputId}
              value={props.currentCheckedInputs[option.id]}
              onChange={props.checkboxListEditBoxChange}
            />
          </div>
        )
      }
    })
    return editBoxes;
  },

  renderResultingText: function() {
    var resultString = this.computeResultString()
    if (this.props.renderResults === true && resultString.length > 0) {
      return (
        <div className="check-resulting-text">
          <div className="resulting-text">The users of the product will include {resultString}</div>
          <div className="question">
            <div className="question-text">{this.props.resultQuestionText}</div>
            <div className="question-description">{this.props.resultQuestionDescription}</div>
            {this.renderResultEditBoxes(this.state.elemId)}
          </div>
        </div>
      )
    } else {
      return '';
    }
  },

  render: function() {
    var options = [];
    var props = this.props;
    var state = this.state;
    this.props.options.forEach(function(option) {
      options.push(
        <li className="checkbox" key={state.elemId + '-CheckboxList-' + option.id}>
          <input
            type="checkbox"
            id={state.elemId + "-checkBoxOptions-" + option.id}
            onChange={props.handleCheck}
            data-label={option.label}
            checked={props.currentChecked.indexOf(option.label) > -1}
          />

          <label htmlFor={'checkBoxOptions-' + option.id}>{option.label}</label>
        </li>
      )
    });

    return (
      <div className="checkbox-list-container">
        <div className="question checkbox-list">
          <div className="question-text">{this.props.questionText}</div>

          <fieldset className="usa-fieldset-inputs">
            <legend className="usa-sr-only">{this.props.questionText}</legend>
            <ul className="usa-unstyled-list">
              {options}
            </ul>
          </fieldset>

        </div>
        {this.renderResultingText(this.state.elemId)}
      </div>
    )
  }
})

module.exports = CheckboxList;
