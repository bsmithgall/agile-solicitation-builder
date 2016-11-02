var RadioButtonMixin = {
  radioButtonChange: function(key, event) {
    var updatedState = {}
    updatedState[key] = event.target.id.split('radioChoice-')[1]
    this.setState(updatedState)
  },

  radioButtonEditBoxChange: function(key, event) {
    debugger;
  },

  radioButtonInputChange: function(key, event) {
    var updatedState = {}
    updatedState[key] = event.target.value;
    this.setState(updatedState);
  }
}

module.exports = RadioButtonMixin;
