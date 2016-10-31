var React = require('react');
var History = require('react-router').History;

var Sidebar = React.createClass({
  mixins: [History],

  propTypes: {
    rfpId: React.PropTypes.string.isRequired,
    currentPage: React.PropTypes.string.isRequired,
    width: React.PropTypes.number.isRequired,
  },

  componentDidMount: function() {
    $('.menu-btn, .overlay, .sliding-panel-close').on('click touchstart',function (e) {
      $('.sidenav, .overlay').toggleClass('is-visible');
      e.preventDefault();
    });
  },

  handleFollowLink: function(e) {
    e.preventDefault();
    var link = e.target.getAttribute("href");
    this.props.onChange(function(){
      this.history.pushState(null, link, null);
    }.bind(this));
  },

  render: function() {
    var baseURL = "/rfp/" + this.props.rfpId;

    var postfixLinks = [
      {link: baseURL+ '/results', title: 'Results'}
    ];

    // Generate subpages
    var subpages = questionList.map(
      function(question) {
        return {
          link: baseURL + '/question/' + question.code,
          title: question.title
        };
      }
    ).concat(postfixLinks);

    var links = subpages.map(function(subpage, i) {
      var active = (subpage.link == this.props.currentPage);
      return (
        <li key={i} ref={"link-"+i}>
          <a
            className={active ? "usa-current" : ""}
            href={subpage.link}
            onClick={this.handleFollowLink}
          >
            {subpage.title}
          </a>
        </li>
      );
    }.bind(this));

    var style = {
      width: this.props.width,
    };

    return (
      <ul className="usa-sidenav-list" id="sidenav" style={style}>
        {links}
      </ul>
    );
  },
});

module.exports = Sidebar;
