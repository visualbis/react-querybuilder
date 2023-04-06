"use strict";

var _chai = require("chai");
var _enzyme = require("enzyme");
var _preactCompat = _interopRequireDefault(require("preact-compat"));
var _ = require("..");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
describe('<NotToggle />', function () {
  var props = {
    handleOnChange: function handleOnChange() {
      return null;
    },
    level: 0
  };
  it('should exist', function () {
    (0, _chai.expect)(_.NotToggle).to.exist;
  });
  describe('when using default rendering', function () {
    it('should have a <label /> element', function () {
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_preactCompat.default.createElement(_.NotToggle, props));
      (0, _chai.expect)(dom.find('label')).to.have.length(1);
    });
    it('should have an <input type="checkbox" /> element', function () {
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_preactCompat.default.createElement(_.NotToggle, props));
      (0, _chai.expect)(dom.find('input[type="checkbox"]')).to.have.length(1);
    });
    it('should have the value passed into the <input />', function () {
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_preactCompat.default.createElement(_.NotToggle, _extends({}, props, {
        checked: true
      })));
      (0, _chai.expect)(dom.find('input').props().checked).to.equal(true);
    });
    it('should have the className passed into the <label />', function () {
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_preactCompat.default.createElement(_.NotToggle, _extends({}, props, {
        className: "foo"
      })));
      (0, _chai.expect)(dom.find('label').hasClass('foo')).to.equal(true);
    });
    it('should call the onChange method passed in', function () {
      var count = 0;
      var mockEvent = {
        target: {
          checked: true
        }
      };
      var onChange = function onChange() {
        return count++;
      };
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_preactCompat.default.createElement(_.NotToggle, _extends({}, props, {
        handleOnChange: onChange
      })));
      dom.find('input').simulate('change', mockEvent);
      (0, _chai.expect)(count).to.equal(1);
    });
  });
});