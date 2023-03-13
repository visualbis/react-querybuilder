"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _preactCompat = _interopRequireDefault(require("preact-compat"));
var _DropDown = require("@visualbi/bifrost-ui/dist/react/forms/DropDown");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ValueSelector = function ValueSelector(_ref) {
  var className = _ref.className,
    handleOnChange = _ref.handleOnChange,
    options = _ref.options,
    value = _ref.value,
    placeHolderTooltip = _ref.placeHolderTooltip;
  var onChange = function onChange(value) {
    handleOnChange(value.value);
  };
  var selectedValue;
  var _options = options ? options.map(function (item) {
    var prefix = item.type === "number" ? "Σ " : "";
    if (item.name === value) {
      selectedValue = {
        value: item.name,
        label: prefix + item.label
      };
    }
    return {
      value: item.name,
      label: prefix + item.label
    };
  }) : [];
  return /*#__PURE__*/_preactCompat.default.createElement(_DropDown.Dropdown, {
    classNamePrefix: "react-select",
    placeHolderTooltip: placeHolderTooltip,
    className: className + " auto-complete",
    placeholder: "Select data field",
    isSearchable: false,
    value: selectedValue,
    options: _options,
    onChange: onChange
  });
};
ValueSelector.displayName = 'ValueSelector';
var _default = ValueSelector;
exports.default = _default;