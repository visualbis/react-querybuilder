"use strict";

var _chai = require("chai");

var _ = require("..");

describe('when calculating the level of a rule', function () {
  var query = {
    combinator: 'and',
    id: '111',
    rules: [{
      id: '222',
      field: 'firstName',
      value: 'Test',
      operator: '='
    }, {
      id: '333',
      field: 'firstName',
      value: 'Test',
      operator: '='
    }, {
      combinator: 'and',
      id: '444',
      rules: [{
        id: '555',
        field: 'firstName',
        value: 'Test',
        operator: '='
      }]
    }]
  };
  it('should be 0 for the top level', function () {
    (0, _chai.expect)((0, _.getLevel)('111', 0, query)).to.equal(0);
    (0, _chai.expect)((0, _.getLevel)('222', 0, query)).to.equal(0);
    (0, _chai.expect)((0, _.getLevel)('333', 0, query)).to.equal(0);
  });
  it('should be 1 for the second level', function () {
    (0, _chai.expect)((0, _.getLevel)('444', 0, query)).to.equal(1);
    (0, _chai.expect)((0, _.getLevel)('555', 0, query)).to.equal(1);
  });
  it('should handle an invalid id', function () {
    (0, _chai.expect)((0, _.getLevel)('546', 0, query)).to.equal(-1);
  });
});