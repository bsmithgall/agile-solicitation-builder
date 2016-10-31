var React = require('react');
var IndexLink = require('react-router').IndexLink;
var LogoutButton = require('../auth/login-button');

var Header = React.createClass({

  render: function() {
    var inheritStyle = {
      color: "inherit",
      textDecoration: "inherit",
    };

    return (
      <div>
        <div className="usa-disclaimer">
          <span className="usa-disclaimer-official">
            <img className="usa-flag_icon" alt="US flag signifying that this is a United States Federal Government website" src="/assets/img/us_flag_small.png" />
            An official website of the United States Government
          </span>
          <span className="usa-disclaimer-stage">
            This site is currently in alpha.
            <a href="https://github.com/18F/agile-solicitation-builder/issues" target="_blank">Help us improve</a>
          </span>
        </div>
        <LogoutButton className="top-right-auth-button" hideIfLoggedOut={true} />
        <div className="usa-grid">
          <div className="usa-width-one-whole header">
            <h1>
              <IndexLink to="/" style={inheritStyle}>Agile Solicitation Builder</IndexLink>
            </h1>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Header;
