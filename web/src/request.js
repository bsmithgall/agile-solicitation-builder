var React = require('react');

// Dependencies

// Bootstrap
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

// Router stuff
var Link = require('react-router').Link;
var IndexLink = require('react-router').IndexLink;
var History = require('react-router').History;

// Custom elements
var questionList = require('./question_list');
var Sidebar = require('./components/Sidebar');

var Request = React.createClass({
  loadData: function(cb) {
    cb("Error: no data found");
  },
  updateQuestion: function(questionName, data) {
    var updates = {};
    updates[questionName] = data;
    this.setState(updates);
  },
  componentDidMount: function() {
    this.loadData(function(err, data) {
      if(err) {
        // console.log("Error fetching data for questions: "+err);
        return;
      }

      this.setState(data);
    }.bind(this));
  },

  handleSidebarChange: function(callback) {
    // Get child
    var child = React.Children.only(this.props.children);

    // console.log(child);
    if(child.type.displayName == "Question") {
      // If child is question, call save() with the callback
      // console.log("saving the child! it's a question...");
      this._child.save(callback);
    } else {
      // Otherwise, call callback
      // console.log("ignore the child, it's not a question (it's worthless)");
      callback();
    }
  },

  renderChildren: function() {
    return React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, {
        questionData: this.state,
        updateQuestion: this.updateQuestion,
        ref: function(child) {
          this._child = child;
        }.bind(this),
      });
    }.bind(this));
  },

  render: function() {
    var mainStyle = { paddingLeft: 16 }

    return (
      <div className="usa-grid">
        <div className="main usa-width-three-fourths" style={mainStyle}>
          {this.renderChildren()}
        </div>
        <div className="overlay"></div>
        <div className="usa-width-one-twelfth"></div>
        <aside className="usa-width-one-sixth side-bar">
          <Sidebar
            width={200}
            onChange={this.handleSidebarChange}
            currentPage={this.props.location.pathname}
            rfpId={this.props.params.id}
          />
        </aside>
      </div>
    );
  },
});

// <div className="usa-width-one-twelfth"></div>

module.exports = Request;
