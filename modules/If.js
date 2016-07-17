var React = require('react');
var Else = require('./Else');
var ElseIf = require('./ElseIf');

/**
 * Parse the version of React as an array of integers.
 * Only contains the major and the minor version number.
 */
function parseVersion() {
    var ver = React.version, matches;
    if (matches = /^(\d+)\.(\d+)/.exec(ver)) {
        return [parseInt(matches[1]), parseInt(matches[2])];
    }
    return [0, 0];
}

function isElseComponent(component) {
  return (component.type === Else.type || component.type === Else);
}

function isElseIfComponent(component) {
  return (component.type === ElseIf.type || component.type === ElseIf);
}

/**
 * If Component for conditionally rendering child components.
 * Use <Else/> to specify failed condition rendering
 */
var If = React.createClass({
  render: function () {
    var output;
    if (Array.isArray(this.props.children)) {
      output = this.props.children.reduce(function (agg, inp) {
        if (isElseComponent(inp)) {
          // if we find <Else/> handle it appropriately
          // only set the classname if this is false
          if (!agg.cond && !agg.precedingElseIfBlock) {
            agg.className = inp.props.className;
          }
          // mark that we have reached else
          agg.elseFound = true;
        } else if (isElseIfComponent(inp)) {
          // if we find <ElseIf/> handle it after inspecting
          // its condition
          if (!agg.cond && inp.props.cond) {
            agg.className = inp.props.className;
            agg.precedingElseIfBlock = true;
            agg.cond = true;
          } else if (agg.cond && !inp.props.cond) {
            agg.cond = false;
          }
        } else {
          // render children before else if condition is true
          // otherwise, the opposite should happen
          if (agg.cond && !agg.elseFound) {
            agg.children.push(inp);
          } else if (!agg.cond && agg.elseFound && !agg.precedingElseIfBlock) {
            agg.children.push(inp);
          }
        }
        return agg;
      }, {
        // set the default classname to be used
        className: this.props.className,
        cond: this.props.cond,
        children: [],
        elseFound: false,
        precedingElseIfBlock: false
      });
    } else {
      output = this.props.children;
    }

    // for React <15.0.0, keep child text node is wrapped by `span`, #4
    if (parseVersion()[0] < 15 && output.children && output.children.length === 1
            && typeof output.children[0] === 'string') {
        output.children[0] = React.createElement('span', null, output.children[0]);
    }

    var args = ["div", {className: output.className}].concat(output.children);
    return React.createElement.apply(this, args);
  }
});

module.exports = If;
