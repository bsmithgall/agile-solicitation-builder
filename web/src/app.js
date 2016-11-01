/* eslint react/prop-types: 0 */
var React = require('react');
var ReactDOM = require('react-dom');

// Dependencies
var View = require('react-flexbox');

// Router stuff
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Redirect = require('react-router').Redirect;

// Custom elements
var Welcome = require('./welcome');
var Request = require('./request');
var RequestOverview = require('./request_overview');
var Question = require('./question');
var Results = require('./results');
var Header = require('./components/Header');

var App = React.createClass({
  render: function() {
    var appStyle = {
      padding: 8,
    };

    return (
      <div style={appStyle}>
        <Header />
        {this.props.children}
      </div>
    );
  },
});

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="rfp" component={RequestOverview} />
        <Route path="rfp/:id" component={Request}>
          <Route path="question/:qid" component={Question} />
          <Route path="results" component={Results} />
        </Route>
      </Route>
  </Router>,
  document.getElementById('mount')
);
