var RadioButtonMixin = {
  radioButtonChange: function(key, event) {
    this.setState({[key]: event.target.id.split('radioChoice-')[1]})
  },

  radioButtonEditBoxChange: function(key, event) {
    debugger;
  },

  radioButtonInputChange: function(key, event) {
    this.setState({[key]: event.target.value});
  }
}

module.exports = RadioButtonMixin;
