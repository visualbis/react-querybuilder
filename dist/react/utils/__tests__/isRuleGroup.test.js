"use strict";

var _chai = require("chai");

var _ = require("..");

describe('isRuleGroup', function () {
  var rule = {
    id: 'r-01234',
    field: 'test',
    operator: '=',
    value: 'test value'
  };
  var ruleGroup = {
    id: 'g-01234',
    combinator: 'and',
    rules: []
  };
  it('identifies a rule', function () {
    (0, _chai.expect)((0, _.isRuleGroup)(rule)).to.be.false;
  });
  it('identifies a rule group', function () {
    (0, _chai.expect)((0, _.isRuleGroup)(ruleGroup)).to.be.true;
  });
});