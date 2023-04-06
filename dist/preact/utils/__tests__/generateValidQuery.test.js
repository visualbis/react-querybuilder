"use strict";

var _chai = require("chai");
var _generateValidQuery = _interopRequireDefault(require("../generateValidQuery"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
describe('generateValidQuery', function () {
  describe('when initial query, with ID, is provided', function () {
    var queryWithID = {
      id: 'g-12345',
      combinator: 'and',
      rules: [{
        id: 'r-12345',
        field: 'firstName',
        value: 'Test',
        operator: '='
      }]
    };
    it('should not generate new ID if query provides ID', function () {
      var validQuery = (0, _generateValidQuery.default)(queryWithID);
      (0, _chai.expect)(validQuery.id).to.equal('g-12345');
      (0, _chai.expect)(validQuery.rules[0].id).to.equal('r-12345');
    });
  });
  describe('when initial query, without ID, is provided', function () {
    var queryWithoutID = {
      combinator: 'and',
      rules: [{
        field: 'firstName',
        value: 'Test without ID',
        operator: '='
      }]
    };
    it('should generate IDs if missing in query', function () {
      (0, _chai.expect)(queryWithoutID).to.not.haveOwnProperty('id');
      var validQuery = (0, _generateValidQuery.default)(queryWithoutID);
      (0, _chai.expect)(validQuery).haveOwnProperty('id');
      (0, _chai.expect)(validQuery.rules[0]).haveOwnProperty('id');
    });
  });
});