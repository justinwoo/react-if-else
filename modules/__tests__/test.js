jest.dontMock('../If');
jest.dontMock('../Else');
var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var If = require('../If');
var Else = require('../Else');
var ElseIf = require('../ElseIf');

function elementMountTest(element) {
  return element.isMounted();
}

function elementChecks(element) {
  expect(element).toBeDefined();
}

describe('If', function () {
  it('renders correctly', function () {
    var component = TestUtils.renderIntoDocument(
      <If>
        Hello World
      </If>
    );
    expect(component).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(
      component, If
    )).toBe(true);
  });

  it('has the correct content', function () {
    var component = TestUtils.renderIntoDocument(
      <If cond={true} className="my-conditions">
        If true~~~
        <h2>彼女さん募集中</h2>
      <Else className="my-conditions-else"/>
        If false~~~
        <h3>出会いの数だけで別れは増える</h3>
      </If>
    );
    /**
     * output structure:
     * <div class="my-conditions">
     *   If true~~~
     *   <h2>彼女さん募集中</h2>
     * </div>
     */
    var elements = TestUtils.findAllInRenderedTree(component, elementMountTest);

    var containerElement = elements[1];
    elementChecks(containerElement);
    expect(containerElement.props.className).toBe('my-conditions');

    var noTagElement = elements[2];
    elementChecks(noTagElement);
    expect(noTagElement.props).toBe('If true~~~');

    var h2Element = elements[3];
    elementChecks(h2Element);
    expect(h2Element.props.children).toBe('彼女さん募集中');
  });

  it('handles else correctly', function () {
    var component = TestUtils.renderIntoDocument(
      <If cond={false} className="my-conditions">
        If true~~~
        <h2>完全無理</h2>
      <ElseIf cond={false} className="my-conditions-else-if"/>
        If ElseIf~~~
        <h4>お金さえあればどんな願いでも叶う〜</h4>
      <Else className="my-conditions-else"/>
        If false~~~
        <h3>空の向こうは夢がある〜</h3>
      </If>
    );

    var elements = TestUtils.findAllInRenderedTree(component, elementMountTest);

    var containerElement = elements[1];
    elementChecks(containerElement);
    expect(containerElement.props.className).toBe('my-conditions-else');

    var noTagElement = elements[2];
    elementChecks(noTagElement);
    expect(noTagElement.props).toBe('If false~~~');

    var h3Element = elements[3];
    elementChecks(h3Element);
    expect(h3Element.props.children).toBe('空の向こうは夢がある〜');
  });

  it('handles else if correctly', function () {
    var component = TestUtils.renderIntoDocument(
      <If cond={false} className="my-conditions">
        カレーウドン
      <ElseIf cond={true} className="my-conditions-else-if"/>
        スープカレー
      <Else className="my-conditions-else"/>
        もやし
      </If>
    );

    var elements = TestUtils.findAllInRenderedTree(component, elementMountTest);

    var containerElement = elements[1];
    elementChecks(containerElement);
    expect(containerElement.props.className).toBe('my-conditions-else-if');

    var noTagElement = elements[2];
    elementChecks(noTagElement);
    expect(noTagElement.props).toBe('スープカレー');
  });

  it('handles stacked else if correctly', function () {
    var component = TestUtils.renderIntoDocument(
      <If cond={false} className="my-conditions">
        酔生夢死
      <ElseIf cond={true} className="my-conditions-else-if"/>
        千載一遇
      <ElseIf cond={false} className="my-conditions-else-if-2"/>
        一石二鳥
      <Else className="my-conditions-else"/>
        自業自得
      </If>
    );

    var elements = TestUtils.findAllInRenderedTree(component, elementMountTest);

    var containerElement = elements[1];
    elementChecks(containerElement);
    expect(containerElement.props.className).toBe('my-conditions-else-if');

    var noTagElement = elements[2];
    elementChecks(noTagElement);
    expect(noTagElement.props).toBe('千載一遇');
  });
});
