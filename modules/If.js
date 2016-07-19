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

var versions = parseVersion();

function isElementOfType(inst, cstr) {
    // from React 0.13.0, suggest to distinguish by the constructor directly, #5 
    return inst.type === (versions[0] == 0 && versions[1] < 13 ? cstr.type : cstr);
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
        if (isElementOfType(inp, Else)) {
          // if we find <Else/> handle it appropriately
          // only set the classname if this is false
          if (!agg.cond && !agg.precedingElseIfBlock) {
            agg.className = inp.props.className;
          }
          // mark that we have reached else
          agg.elseFound = true;
        } else if (isElementOfType(inp, ElseIf)) {
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
    if (versions[0] < 15 && output.children && output.children.length === 1) {
        var childType = typeof output.children[0];
        if (childType === 'number' || childType === 'string') {
            // with this extra invalid child, `props.children` is still an array
            // or the only child will be treated as content directly
            output.children.push(null);
        }
    }

    var args = ["div", {className: output.className}].concat(output.children);
    return React.createElement.apply(this, args);
  }
});

module.exports = If;
