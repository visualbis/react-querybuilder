"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotToggle = function NotToggle(_ref) {
  var className = _ref.className,
      handleOnChange = _ref.handleOnChange,
      title = _ref.title,
      checked = _ref.checked;

  var onChange = function onChange(e) {
    return handleOnChange(e.target.checked);
  }; // tslint:disable-next-line: react-a11y-input-elements


  return /*#__PURE__*/_react.default.createElement("label", {
    className: className,
    title: title
  }, "  ", /*#__PURE__*/_react.default.createElement("input", {
    role: "checkbox",
    placeholder: "",
    "aria-checked": !!checked,
    type: "checkbox",
    onChange: onChange,
    checked: !checked
  }), " ");
};

NotToggle.displayName = 'NotToggle';
var _default = NotToggle;
exports.default = _default;