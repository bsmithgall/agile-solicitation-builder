var CheckboxListMixin = {
  checkboxListChange: function(key, event) {
    var updatedState = Object.assign({}, this.state);
    var selected = event.target.getAttribute('data-label');

    // remove the item from the array if we already have it. otherwise, add it.
    if (updatedState[key].indexOf(selected) === -1) {
      updatedState[key].push(selected);
    } else {
      updatedState[key].splice(updatedState[key].indexOf(selected), 1)
    }

    this.setState(updatedState)
  },

  checkboxListEditBoxChange: function(event) {
    var updatedState = Object.assign({}, this.state);
    var selected = event.target.getAttribute('data-label');
    updatedState[selected] = event.target.value;

    this.setState(updatedState);
  }
}

module.exports = CheckboxListMixin
