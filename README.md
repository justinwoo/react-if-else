# React If/Else

Render blocks of components using a conditional, and supply <Else/> to
display other blocks.

## Usage

Install this package to your project.

Use CommonJS:

```js
var If = require('react-if-else').If;
var Else = require('react-if-else').Else;

var YourComponent = React.createClass({
  render: function () {
    <div>
      <If cond={true} className="my-conditions">
        If true~~~
        <h2>彼女さん募集中</h2>
      <Else className="my-conditions-else"/>
        If false~~~
        <h3>出会いの数だけで別れは増える</h3>
      </If>
    </div>
  }
});
```


## Demo

JSFiddle: http://jsfiddle.net/o3t1u5v5/
