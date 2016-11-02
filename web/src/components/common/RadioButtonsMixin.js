var RadioButtonMixin = {
  radioButtonChange: function(key, event) {
    var updatedState = {}
    updatedState[key] = event.target.id.split('radioChoice-')[1]
    this.setState(updatedState)
  },

  radioButtonInputChange: function(key, event) {
    var updatedState = {}
    updatedState[key] = event.target.value;
    this.setState(updatedState);
  }
}

module.exports = RadioButtonMixin;
