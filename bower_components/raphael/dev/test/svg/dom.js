(function (assert) {
  
  let paper,
    url = 'http://raphaeljs.com';
  
  QUnit.module('DOM', {
    beforeEach: function () {
      paper = new Raphael(document.getElementById('qunit-fixture'), 1000, 1000);
    },
    afterEach: function () {
      paper.remove();
    }
  });
  
  const equalNodePosition = function (assert, node, expectedParent, expectedPreviousSibling, expectedNextSibling) {
    assert.equal(node.parentNode, expectedParent);
    assert.equal(node.previousSibling, expectedPreviousSibling);
    assert.equal(node.nextSibling, expectedNextSibling);
  };
  
  const equalNodePositionWrapped = function (assert, node, anchor, expectedParent, expectedPreviousSibling, expectedNextSibling) {
    assert.equal(node.parentNode, anchor);
    equalNodePosition(assert, anchor, expectedParent, expectedPreviousSibling, expectedNextSibling);
  };

// Element#insertBefore
// --------------------
  
  QUnit.test('insertBefore: no element', function (assert) {
    const el = paper.rect();
    
    el.insertBefore(null);
    
    equalNodePosition(assert, el.node, paper.canvas, paper.defs, null);
  });
  
  QUnit.test('insertBefore: first element', function (assert) {
    const x = paper.rect();
    const el = paper.rect();
    
    el.insertBefore(x);
    
    equalNodePosition(assert, el.node, paper.canvas, paper.defs, x.node);
  });
  
  QUnit.test('insertBefore: middle element', function (assert) {
    const x = paper.rect();
    const y = paper.rect();
    const el = paper.rect();
    
    el.insertBefore(y);
    
    equalNodePosition(assert, el.node, paper.canvas, x.node, y.node);
  });
  
  QUnit.test('insertBefore: no element when wrapped in <a>', function (assert) {
    const el = paper.rect().attr('href', url),
      anchor = el.node.parentNode;
    
    el.insertBefore(null);
    
    equalNodePositionWrapped(assert, el.node, anchor, paper.canvas, paper.defs, null);
  });
  
  QUnit.test('insertBefore: first element when wrapped in <a>', function (assert) {
    const x = paper.rect();
    const el = paper.rect().attr('href', url),
      anchor = el.node.parentNode;
    
    el.insertBefore(x);
    
    equalNodePositionWrapped(assert, el.node, anchor, paper.canvas, paper.defs, x.node);
  });
  
  QUnit.test('insertBefore: first element wrapped in <a> and wrapped in <a>', function (assert) {
    const x = paper.rect().attr('href', url),
      xAnchor = x.node.parentNode;
    const el = paper.rect().attr('href', url),
      anchor = el.node.parentNode;
    
    el.insertBefore(x);
    
    equalNodePositionWrapped(assert, el.node, anchor, paper.canvas, paper.defs, xAnchor);
  });
  
  QUnit.test('insertBefore: middle element when wrapped in <a>', function (assert) {
    const x = paper.rect();
    const y = paper.rect();
    const el = paper.rect().attr('href', url),
      anchor = el.node.parentNode;
    
    el.insertBefore(y);
    
    equalNodePositionWrapped(assert, el.node, anchor, paper.canvas, x.node, y.node);
  });
  
  QUnit.test('insertBefore: middle element wrapped in <a> and wrapped in <a>', function (assert) {
    const x = paper.rect().attr('href', url),
      xAnchor = x.node.parentNode;
    const y = paper.rect().attr('href', url),
      yAnchor = y.node.parentNode;
    const el = paper.rect().attr('href', url),
      anchor = el.node.parentNode;
    
    el.insertBefore(y);
    
    equalNodePositionWrapped(assert, el.node, anchor, paper.canvas, xAnchor, yAnchor);
  });

// TODO...
// insertBefore: with set
// insertBefore: with nested set.

// Element#insertAfter
// -------------------
  
  QUnit.test('insertAfter: no element', function (assert) {
    const el = paper.rect();
    
    el.insertAfter(null);
    
    equalNodePosition(assert, el.node, paper.canvas, paper.defs, null);
  });
  
  QUnit.test('insertAfter: last element', function (assert) {
    const x = paper.rect();
    const el = paper.rect();
    
    el.insertAfter(x);
    
    equalNodePosition(assert, el.node, paper.canvas, x.node, null);
  });
  
  QUnit.test('insertAfter: middle element', function (assert) {
    const x = paper.rect();
    const y = paper.rect();
    const el = paper.rect();
    
    el.insertAfter(x);
    
    equalNodePosition(assert, el.node, paper.canvas, x.node, y.node);
  });
  
  QUnit.test('insertAfter: no element when wrapped in <a>', function (assert) {
    const el = paper.rect().attr('href', url),
      anchor = el.node.parentNode;
    
    el.insertAfter(null);
    
    equalNodePositionWrapped(assert, el.node, anchor, paper.canvas, paper.defs, null);
  });
  
  QUnit.test('insertAfter: last element when wrapped in <a>', function (assert) {
    const x = paper.rect();
    const el = paper.rect().attr('href', url),
      anchor = el.node.parentNode;
    
    el.insertAfter(x);
    
    equalNodePositionWrapped(assert, el.node, anchor, paper.canvas, x.node, null);
  });
  
  QUnit.test('insertAfter: last element wrapped in <a> and wrapped in <a>', function (assert) {
    const x = paper.rect().attr('href', url),
      xAnchor = x.node.parentNode;
    const el = paper.rect().attr('href', url),
      anchor = el.node.parentNode;
    
    el.insertAfter(x);
    
    equalNodePositionWrapped(assert, el.node, anchor, paper.canvas, xAnchor, null);
  });
  
  QUnit.test('insertAfter: middle element when wrapped in <a>', function (assert) {
    const x = paper.rect();
    const y = paper.rect();
    const el = paper.rect().attr('href', url),
      anchor = el.node.parentNode;
    
    el.insertAfter(x);
    
    equalNodePositionWrapped(assert, el.node, anchor, paper.canvas, x.node, y.node);
  });
  
  QUnit.test('insertAfter: middle element wrapped in <a> and wrapped in <a>', function (assert) {
    const x = paper.rect().attr('href', url),
      xAnchor = x.node.parentNode;
    const y = paper.rect().attr('href', url),
      yAnchor = y.node.parentNode;
    const el = paper.rect().attr('href', url),
      anchor = el.node.parentNode;
    
    el.insertAfter(x);
    
    equalNodePositionWrapped(assert, el.node, anchor, paper.canvas, xAnchor, yAnchor);
  });

// TODO...
// insertAfter: with set
// insertAfter: with nested set.

// Element#remove
// --------------
  
  QUnit.test('remove: after added', function (assert) {
    const el = paper.rect(),
      node = el.node;
    
    el.remove();
    
    assert.equal(el.node, null);
    assert.equal(node.parentNode, null);
  });
  
  QUnit.test('remove: when wrapped in <a>', function (assert) {
    const el = paper.rect().attr('href', url),
      node = el.node,
      anchor = node.parentNode;
    
    el.remove();
    
    assert.equal(el.node, null);
    assert.equal(node.parentNode, anchor);
    assert.equal(anchor.parentNode, null);
  });
  
  QUnit.test('remove: when already removed', function (assert) {
    const el = paper.rect(),
      node = el.node;
    
    el.remove();
    el.remove();
    
    assert.equal(el.node, null);
    assert.equal(node.parentNode, null);
  });
  
  QUnit.test('remove: when the canvas is removed', function (assert) {
    const el = paper.rect(),
      node = el.node;
    
    paper.remove();
    el.remove();
    
    assert.equal(el.node, null);
    assert.equal(node.parentNode, null);
  });

// Element#toFront
// --------------
  
  QUnit.test('toFront: normal', function (assert) {
    const el = paper.rect();
    const x = paper.rect();
    
    el.toFront();
    
    equalNodePosition(assert, el.node, paper.canvas, x.node, null);
  });
  
  QUnit.test('toFront: when wrapped in <a>', function (assert) {
    const el = paper.rect().attr('href', url),
      anchor = el.node.parentNode;
    const x = paper.rect();
    
    el.toFront();
    
    equalNodePositionWrapped(assert, el.node, anchor, paper.canvas, x.node, null);
  });

// Element#toBack
// --------------
  
  QUnit.test('toBack: normal', function (assert) {
    const x = paper.rect();
    const el = paper.rect();
    
    el.toBack();
    
    equalNodePosition(assert, el.node, paper.canvas, null, paper.desc);
    equalNodePosition(assert, x.node, paper.canvas, paper.defs, null);
  });
  
  QUnit.test('toBack: when wrapped in <a>', function (assert) {
    const x = paper.rect();
    const el = paper.rect().attr('href', url),
      anchor = el.node.parentNode;
    
    el.toBack();
    
    equalNodePositionWrapped(assert, el.node, anchor, paper.canvas, null, paper.desc);
    equalNodePosition(assert, x.node, paper.canvas, paper.defs, null);
  });


// Element#attrs
// -------------

// #x

// #y

// #rx

// #ry

// #transform

// #title

// #href

//keep adding and testing!


})();