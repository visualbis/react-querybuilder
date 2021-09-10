"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preactCompat = _interopRequireWildcard(require("preact-compat"));

var _Autocomplete = require("@visualbi/bifrost-ui/dist/react/forms/Autocomplete");

var _DropDown = require("@visualbi/bifrost-ui/dist/react/forms/DropDown");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ValueEditor = function ValueEditor(_ref) {
  var operator = _ref.operator,
      value = _ref.value,
      handleOnChange = _ref.handleOnChange,
      title = _ref.title,
      className = _ref.className,
      type = _ref.type,
      inputType = _ref.inputType,
      placeHolder = _ref.placeHolder,
      values = _ref.values;
  var inputDisabled = false;

  if (operator === 'null' || operator === 'notNull' || type === "none") {
    type = "text";
    inputDisabled = true;
    placeHolder = "";
  }

  var _useState = (0, _preactCompat.useState)(value),
      _useState2 = _slicedToArray(_useState, 2),
      _value = _useState2[0],
      setValue = _useState2[1];

  var onSelectChange = function onSelectChange(value) {
    handleOnChange(value.value);
  };

  var onTextInputChange = function onTextInputChange(e) {
    handleOnChange(e.target.value);
  };

  var onTextAreaChange = function onTextAreaChange(e) {
    setValue(e.target.value);
  };

  var applyTextAreaChange = function applyTextAreaChange() {
    handleOnChange(_value);
  };

  var onCheckboxChange = function onCheckboxChange(e) {
    return handleOnChange(e.target.checked);
  };

  var onAutoSuggetionChange = function onAutoSuggetionChange(value) {
    handleOnChange(value);
  };

  var options = [];
  var selectedOption;
  options = values ? values.map(function (item) {
    if (item.name == value) {
      selectedOption = {
        value: item.name,
        label: item.label
      };
    }

    return {
      value: item.name,
      label: item.label
    };
  }) : [];

  switch (type) {
    case 'select':
      return /*#__PURE__*/_preactCompat.default.createElement(_DropDown.Dropdown, {
        placeholder: placeHolder,
        className: className,
        value: selectedOption,
        options: options,
        onChange: onSelectChange
      });

    case 'autocomplete':
      return /*#__PURE__*/_preactCompat.default.createElement(_Autocomplete.Autocomplete, {
        scrollPositionSupport: true,
        placeholder: placeHolder,
        options: options,
        value: value,
        onChange: onAutoSuggetionChange,
        className: className
      });
    //  return   ( <Select classNamePrefix={"react-select"} placeholder={placeHolder} className={className+" auto-complete"}  value={selectedOption} options={options} onChange={onAutoSuggetionChange} />)   

    case 'checkbox':
      // tslint:disable-next-line: react-a11y-input-elements
      return /*#__PURE__*/_preactCompat.default.createElement("input", {
        role: "checkbox",
        type: "checkbox",
        className: className,
        title: title,
        onChange: onCheckboxChange,
        "aria-checked": !!value,
        checked: !!value
      });

    case 'radio':
      {
        var radioCls = className ? "".concat(className, " radio") : "radio";
        return /*#__PURE__*/_preactCompat.default.createElement("span", {
          className: radioCls,
          title: title
        }, values && values.map(function (v) {
          var isChecked = value === v.name;
          return /*#__PURE__*/_preactCompat.default.createElement("label", {
            key: v.name
          }, /*#__PURE__*/_preactCompat.default.createElement("input", {
            type: "radio",
            value: v.name,
            "aria-checked": isChecked,
            checked: isChecked,
            onChange: onTextInputChange
          }), /*#__PURE__*/_preactCompat.default.createElement("span", {
            className: "circle"
          }), /*#__PURE__*/_preactCompat.default.createElement("span", {
            className: "radio-title"
          }, v.label));
        }));
      }
      break;

    case 'textarea':
      return /*#__PURE__*/_preactCompat.default.createElement("div", {
        className: "rule-value-parent textarea"
      }, /*#__PURE__*/_preactCompat.default.createElement("textarea", {
        spellCheck: "false",
        value: _value,
        title: title,
        disabled: inputDisabled,
        className: className,
        placeholder: "Enter values separated by comma",
        onChange: onTextAreaChange,
        onBlur: applyTextAreaChange
      }));

    default:
      return /*#__PURE__*/_preactCompat.default.createElement("div", {
        className: "rule-value-parent"
      }, /*#__PURE__*/_preactCompat.default.createElement("input", {
        type: inputType || 'text',
        value: value,
        title: title,
        disabled: inputDisabled,
        className: className,
        placeholder: placeHolder,
        onChange: onTextInputChange
      }), " ");
  }
};

ValueEditor.displayName = 'ValueEditor';
var _default = ValueEditor;
exports.default = _default;