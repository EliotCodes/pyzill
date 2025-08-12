const test = require('node:test');
const assert = require('node:assert');
const { removeSpace, getNestedValue, parseProxy } = require('../src/utils');

test('removeSpace collapses whitespace', () => {
  assert.strictEqual(removeSpace('  a   b  '), 'a b');
});

test('getNestedValue retrieves nested values', () => {
  const obj = { a: { b: { c: 1 } } };
  assert.strictEqual(getNestedValue(obj, 'a.b.c'), 1);
  assert.strictEqual(getNestedValue(obj, 'a.b.d', 'x'), 'x');
});

test('parseProxy encodes credentials', () => {
  const url = parseProxy('example.com', '8080', 'user name', 'p@ss');
  assert.strictEqual(url, 'http://user%20name:p%40ss@example.com:8080');
});
