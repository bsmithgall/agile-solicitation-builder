var React = require('react');
var StateMixin = require("./state_mixin");

var RadioButtons = require('./components/common/RadioButtons');
var RadioButtonsMixin = require('./components/common/RadioButtonsMixin');

// Bootstrap
var Button = require('react-bootstrap').Button;

// Router stuff
var Link = require('react-router').Link;

// IDIQ & BPA require
// This is an RFQ for the alliant BPA #XXXXX
// This is an RFQ for an award under ID/IQ #XXXXX

var RequestOverview = React.createClass({
  mixins: [StateMixin, RadioButtonsMixin],
  getInitialState: function() {
    return {
      docType: "",
      agency: "",
      setaside: "none",
      baseNumber: "",
      baseNumberNeeded: false,
      programName: "",
      agencies: [],
    };
  },
  componentDidMount: function() {
    getAgencies(function(content){
      this.setState({ agencies: content["data"] });
    }.bind(this));
  },

  formatDocType: function() {
    var docTypeParts = this.state.docType.split(' (');
    var lastPart = docTypeParts[docTypeParts.length - 1];
    return lastPart.replace(')', '');
  },

  handleCreateRFQ: function() {
    debugger;
    createRFQ({
      doc_type: this.formatDocType(),
      agency: this.state.agency,
      setaside: this.state.setaside,
      base_number: this.state.baseNumber,
      program_name: this.state.programName,
    }, function(data) {
      // TODO add error handler
      var rfqId = data.id;
      var url = '#/rfp/' + rfqId + '/question/1';
      window.location.replace(url);
    });
  },

  render: function() {
    // Create the agency names list
    var agencyNameOptions = [(
      <option key="none" value="none">-- Please select --</option>
    )];
    for (i=0; i < this.state.agencies.length; i++) {
      var agency = this.state.agencies[i];
      agencyNameOptions.push(
        <option key={agency["abbreviation"]} value={agency["abbreviation"]}>{agency["full_name"]} ({agency["abbreviation"]})</option>
      );
    }

    var mainStyle = {
      paddingLeft: 16
    };

    return (
      <div className="usa-grid">
        <div className="usa-width-two-thirds" style={mainStyle}>
          <div className="page-heading">Preliminary Questions</div>
          <div className="responder-instructions">These questions are typically answered by the CO.</div>

          <p>We'll ask you some questions to understand what you want to build,
          and then let you download the generated documents.</p>

          <div className="question">
            <div className="question-text">To begin, what agency is this for?</div>
            <select className="medium-response" onChange={this.handleChange.bind(this, "agency")} value={this.state.agency}>
              {agencyNameOptions}
            </select>
          </div>

          <div className="question">
            <div className="question-text">Program Name: </div>
            <input type="text" className="medium-response" value={this.state.programName} onChange={this.handleChange.bind(this, "programName")} />
          </div>

          <RadioButtons
            questionText='This will be ...'
            renderIfSelected='input'
            inputLabel='Vehicle name:'
            radioButtonChange={this.radioButtonChange.bind(this, 'docType')}
            radioButtonInputChange={this.radioButtonInputChange.bind(this, 'baseNumber')}
            currentLabel={this.state.docType}
            options={[
              {label: 'a new purchase under FAR 13 (Purchase Order)', renderInput: false},
              {label: 'being issued off an existing Indefinite Delivery Indefinite Quantity (ID/IQ) (Task Order)', renderInput: true, inputLabel: 'Vehicle name:'},
              {label: 'being ordered off an existing Blanket Purchase Agreement (BPA) (Call)', renderInput: true, inputLabel: 'Vehicle name:'},
            ]}
          />

          <RadioButtons
            questionText='Do you intend to set aside this acquisition for any of the following under FAR part 19?'
            renderIfSelected='none'
            radioButtonChange={this.radioButtonChange.bind(this, 'setaside')}
            currentLabel={this.state.setaside}
            options={[
              { label: "Small Business" },
              { label: "8(a) Business Development Participants" },
              { label: "HUBZone Small Business Concerns" },
              { label: "Service-disabled Veteran-owned Small Business Concerns" },
              { label: "Economically Disadvantaged Women-owned Small Business Concerns" },
              { label: "The Women-Owned Small Business Program" },
              { label: "None of the above" }
            ]}
          />

          <Button bsStyle="primary" onClick={this.handleCreateRFQ}>{"Let's go!"}</Button>
        </div>
      </div>
    );
  },
});

module.exports = RequestOverview;
