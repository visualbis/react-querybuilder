"use strict";

var _chai = require("chai");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
var _sinon = _interopRequireDefault(require("sinon"));
var _ = require("..");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
describe('<ValueEditor />', function () {
  var props = {
    handleOnChange: function handleOnChange() {
      return null;
    },
    level: 0
  };
  it('should exist', function () {
    (0, _chai.expect)(_.ValueEditor).to.exist;
  });
  describe('when using default rendering', function () {
    it('should have an <input /> element', function () {
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_.ValueEditor, props));
      (0, _chai.expect)(dom.find('input')).to.have.length(1);
    });
    it('should have the value passed into the <input />', function () {
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_.ValueEditor, _extends({}, props, {
        value: "test"
      })));
      (0, _chai.expect)(dom.find('input').props().value).to.equal('test');
    });
    it('should render nothing for operator "null"', function () {
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_.ValueEditor, _extends({}, props, {
        operator: "null"
      })));
      (0, _chai.expect)(dom.type()).to.be.null;
    });
    it('should render nothing for operator "notNull"', function () {
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_.ValueEditor, _extends({}, props, {
        operator: "notNull"
      })));
      (0, _chai.expect)(dom.type()).to.be.null;
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
      var dom = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_.ValueEditor, _extends({}, props, {
        handleOnChange: onChange
      })));
      dom.find('input').simulate('change', mockEvent);
      (0, _chai.expect)(count).to.equal(1);
    });
  });
  describe('when rendering a select', function () {
    it('should render the correct number of options', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_.ValueEditor, _extends({}, props, {
        type: "select",
        values: [{
          name: 'test',
          label: 'Test'
        }]
      })));
      var select = wrapper.find('select');
      (0, _chai.expect)(select.length).to.equal(1);
      var opts = wrapper.find('select option');
      (0, _chai.expect)(opts.length).to.equal(1);
    });
    it('should call the onChange method passed in', function () {
      var handleOnChange = _sinon.default.spy();
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_.ValueEditor, _extends({}, props, {
        type: "select",
        handleOnChange: handleOnChange,
        values: [{
          name: 'test',
          label: 'Test'
        }]
      })));
      var select = wrapper.find('select');
      select.simulate('change', {
        target: {
          value: 'test'
        }
      });
      (0, _chai.expect)(handleOnChange.calledOnceWith('test')).to.equal(true);
    });
  });
  describe('when rendering a checkbox', function () {
    it('should render the checkbox and react to changes', function () {
      var handleOnChange = _sinon.default.spy();
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_.ValueEditor, _extends({}, props, {
        type: "checkbox",
        handleOnChange: handleOnChange
      })));
      var checkbox = wrapper.find('input[type="checkbox"]');
      (0, _chai.expect)(checkbox.length).to.equal(1);
      wrapper.simulate('change', {
        target: {
          checked: true
        }
      });
      (0, _chai.expect)(handleOnChange.calledOnceWith(true)).to.equal(true);
    });
  });
  describe('when rendering a radio button set', function () {
    it('should render the radio buttons with labels', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_.ValueEditor, _extends({}, props, {
        type: "radio",
        values: [{
          name: 'test',
          label: 'Test'
        }]
      })));
      var input = wrapper.find('label input[type="radio"]');
      (0, _chai.expect)(input.length).to.equal(1);
    });
    it('should call the onChange handler', function () {
      var handleOnChange = _sinon.default.spy();
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_.ValueEditor, _extends({}, props, {
        type: "radio",
        handleOnChange: handleOnChange,
        values: [{
          name: 'test',
          label: 'Test'
        }]
      })));
      var input = wrapper.find('input');
      input.simulate('change', {
        target: {
          value: 'test'
        }
      });
      (0, _chai.expect)(handleOnChange.calledOnceWith('test')).to.equal(true);
    });
  });
});