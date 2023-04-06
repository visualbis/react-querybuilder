"use strict";

var _chai = require("chai");
var _preactCompat = _interopRequireDefault(require("preact-compat"));
var _enzyme = require("enzyme");
var _ = require("..");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
describe('<ValueSelector />', function () {
  var props = {
    handleOnChange: function handleOnChange() {
      return null;
    },
    level: 0
  };
  it('should exist', function () {
    (0, _chai.expect)(_.ValueSelector).to.exist;
  });
  describe('when using default rendering', function () {
    var options = [{
      name: 'foo',
      label: 'foo label'
    }, {
      name: 'bar',
      label: 'bar label'
    }];
    it('should have an <select /> element', function () {
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_preactCompat.default.createElement(_.ValueSelector, _extends({}, props, {
        options: options
      })));
      (0, _chai.expect)(dom.find('select')).to.have.length(1);
    });
    it('should have the options passed into the <select />', function () {
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_preactCompat.default.createElement(_.ValueSelector, _extends({}, props, {
        options: options
      })));
      (0, _chai.expect)(dom.find('option')).to.have.length(2);
    });
    it('should have the value passed into the <select />', function () {
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_preactCompat.default.createElement(_.ValueSelector, _extends({}, props, {
        options: options,
        value: "foo"
      })));
      (0, _chai.expect)(dom.find('select').props().value).to.equal('foo');
    });
    it('should have the className passed into the <select />', function () {
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_preactCompat.default.createElement(_.ValueSelector, _extends({}, props, {
        options: options,
        className: "foo"
      })));
      (0, _chai.expect)(dom.find('select').hasClass('foo')).to.equal(true);
    });
    it('should call the onChange method passed in', function () {
      var count = 0;
      var mockEvent = {
        target: {
          value: 'foo'
        }
      };
      var onChange = function onChange() {
        return count++;
      };
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_preactCompat.default.createElement(_.ValueSelector, _extends({}, props, {
        options: options,
        handleOnChange: onChange
      })));
      dom.find('select').simulate('change', mockEvent);
      (0, _chai.expect)(count).to.equal(1);
    });
  });
  describe('when the fields have the id key', function () {
    var fooId = '3';
    var barId = '5';
    var options = [{
      name: 'foo',
      label: 'foo label',
      id: fooId
    }, {
      name: 'bar',
      label: 'bar label',
      id: barId
    }];
    it('the options should have keys 3 and 5', function () {
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_preactCompat.default.createElement(_.ValueSelector, _extends({}, props, {
        options: options
      })));
      (0, _chai.expect)(dom.find('option').at(0).key()).to.equal("key-".concat(fooId));
      (0, _chai.expect)(dom.find('option').at(1).key()).to.equal("key-".concat(barId));
    });
  });
});