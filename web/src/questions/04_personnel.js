var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../components/common/EditBox");
var RadioButtons = require('../components/common/RadioButtons');

var STATES = [
  "keyPersonnelIntro",
  "performanceWorkStatement",
  "keyPersonnelRequirements",
  "evaluateKeyPersonnel",
  "notEvaluateKeyPersonnel",
  "clearanceRequired",
  "onSiteRequired",
];

var Requirement = React.createClass({
  mixins: [StateMixin],
  save: function(cb) {
    var data = {};

    for (i=0; i < STATES.length; i++){
      var stateName = STATES[i];
      data[stateName] = this.state[stateName];
    }
    var rfqId = getId(window.location.hash);
    put_data(4, "get_content", rfqId, data, cb);
  },
  getInitialState: function() {
    var initialStates = getStates(STATES);
    return initialStates;
  },
  componentDidMount: function() {
    var rfqId = getId(window.location.hash);
    get_data(4, rfqId, function(content){
      var componentStates = getComponents(content["data"]);
      this.setState( componentStates );
    }.bind(this));
  },
  render: function() {
    return (
      <div>
        <div className="page-heading">Contractor Personnel</div>
        <div className="responder-instructions">These questions are typically answered by the PM.</div>

        <EditBox
          text={this.state.keyPersonnelIntro}
          editing={this.state.edit === 'keyPersonnelIntro'}
          onStatusChange={this.toggleEdit.bind(this, 'keyPersonnelIntro')}
          onTextChange={this.handleChange.bind(this, 'keyPersonnelIntro')}>
        </EditBox>

        <div className="sub-heading">Security Clearances</div>

        <RadioButtons
          questionText="What is the highest level of clearance that will be required?"
          editBoxIfSelected={false}
          options={[
            {label: 'None', textIfSelected: 'Contractor personnel will <b>not</b> be required to have a security clearance.'},
            {label: 'Confidential', textIfSelected: 'Contractor personnel will be required to have a security clearance at the <b>Confidential</b> level.'},
            {label: 'Secret', textIfSelected: 'Contractor personnel will be required to have a security clearance at the <b>Secret</b> level.'},
            {label: 'Top Secret', textIfSelected: 'Contractor personnel will be required to have a security clearance at the <b>Top Secret</b> level.'}
          ]}
        />

        <RadioButtons
          questionText='Will any of the work be done onsite?'
          editBoxIfSelected={false}
          options={[
            {label: 'Yes', textIfSelected: 'An onsite presence by the contractor will be required.'},
            {label: 'No', textIfSelected: 'An onsite presence by the contractor will not be required.'}
          ]}
        />

        <div className="sub-heading">Key Personnel Evaluation Process</div>

        <RadioButtons
          questionText='Do you want to require and evaluate key personnel?'
          editBoxIfSelected={true}
          options={[
            {label: 'Yes', editBoxIfSelected: (
              <EditBox
                text={this.state.keyPersonnelRequirements}
                editing={this.state.edit === 'keyPersonnelRequirements'}
                onStatusChange={this.toggleEdit.bind(this, 'keyPersonnelRequirements')}
                onTextChange={this.handleChange.bind(this, 'keyPersonnelRequirements')}>
              </EditBox>
            )},
            {label: 'No', editBoxIfSelected: (
              <EditBox
                text={this.state.notEvaluateKeyPersonnel}
                editing={this.state.edit === 'notEvaluateKeyPersonnel'}
                onStatusChange={this.toggleEdit.bind(this, 'notEvaluateKeyPersonnel')}
                onTextChange={this.handleChange.bind(this, 'notEvaluateKeyPersonnel')}>
              </EditBox>
            )}
          ]}
        />

        <div className="question">
          <div className="question-text">Performance Work Statement</div>

          <EditBox
            text={this.state.performanceWorkStatement}
            editing={this.state.edit === 'performanceWorkStatement'}
            onStatusChange={this.toggleEdit.bind(this, 'performanceWorkStatement')}
            onTextChange={this.handleChange.bind(this, 'performanceWorkStatement')}>
          </EditBox>
        </div>
      </div>
    );
  },
});


module.exports = Requirement;
