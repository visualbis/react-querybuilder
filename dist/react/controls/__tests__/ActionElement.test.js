"use strict";

var _chai = require("chai");
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _ = require("..");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
describe('<ActionElement />', function () {
  var props = {
    handleOnClick: function handleOnClick() {
      return null;
    },
    className: '',
    level: 0
  };
  it('should exist', function () {
    (0, _chai.expect)(_.ActionElement).to.exist;
  });
  describe('when using default rendering', function () {
    it('should have a <button /> element', function () {
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_.ActionElement, props));
      (0, _chai.expect)(dom.find('button')).to.have.length(1);
    });
    it('should have the label passed into the <button />', function () {
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_.ActionElement, _extends({}, props, {
        label: "test"
      })));
      (0, _chai.expect)(dom.find('button').text()).to.equal('test');
    });
    it('should have the className passed into the <button />', function () {
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_.ActionElement, _extends({}, props, {
        className: "my-css-class"
      })));
      (0, _chai.expect)(dom.find('button').hasClass('my-css-class')).to.equal(true);
    });
    it('should call the onClick method passed in', function () {
      var count = 0;
      var onClick = function onClick() {
        return count++;
      };
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_.ActionElement, _extends({}, props, {
        handleOnClick: onClick
      })));
      dom.find('button').simulate('click');
      (0, _chai.expect)(count).to.equal(1);
    });
  });
});