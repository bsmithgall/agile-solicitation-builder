var React = require('react');

var Clin = React.createClass({
  render: function() {
    return (
      <form id="additional-clin" class="additional-clin">
        <table>
          <tr>
            <td colSpan="2"><input type="text" className="long-response" id="row1"/></td>
          </tr>
          <tr>
            <td colSpan="2"><input type="text" className="long-response" id="row2" /></td>
          </tr>
          <tr>
            <td><input type="text" id="row3a" /></td>
            <td><input type="text" id="row3b" /></td>
          </tr>
          <tr>
            <td><input type="text" id="row4a" /></td>
            <td><input type="text" id="row4b" /></td>
          </tr>
          <tr>
            <td><input type="text" id="row5a" /></td>
            <td><input type="text" id="row5b" /></td>
          </tr>
          <tr>
            <td><input type="text" id="row6a" /></td>
            <td><input type="text" id="row6b" /></td>
          </tr>
        </table>
      </form>
    );
  }
});

module.exports = Clin;
