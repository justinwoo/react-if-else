var React = require('react');

/**
 * Else component to be used with If to demarcate the beginning
 * of an Else block to be rendered when the condition is false.
 */
var Else = React.createClass({
  // don't render anything with Else
  render: function () {
    return null;
  }
});

module.exports = Else;
