# React If/Else

[![build status](https://img.shields.io/travis/justinwoo/react-if-else/master.svg?style=flat-square)](https://travis-ci.org/justinwoo/react-if-else)
[![npm version](https://img.shields.io/npm/v/react-if-else.svg?style=flat-square)](https://www.npmjs.com/package/react-if-else)

Render blocks of components using a conditional, and supply <Else/> to
display other blocks. Also supports using <ElseIf/> conditions to
display blocks (you may consider using [React-Cond](https://github.com/kimagure/react-cond) instead for this case).


## Usage

Install this package to your project.

Use CommonJS:

```js
var If = require('react-if-else').If;
var ElseIf = require('react-if-else').ElseIf;
var Else = require('react-if-else').Else;

var YourComponent = React.createClass({
  render: function () {
    <div>
      <If cond={true} className="my-conditions">
        If true~~~
        <h2>彼女さん募集中</h2>
      <ElseIf cond={false} className="my-conditions-else-if"/>
        ElseIf true~~~
        <h4>逢いたくなったらまぶたを閉じる</h4>
      <Else className="my-conditions-else"/>
        If false~~~
        <h3>出会いの数だけで別れは増える</h3>
      </If>
    </div>
  }
});
```


## Demo

JSFiddle: http://jsfiddle.net/tkpx7L6a/
