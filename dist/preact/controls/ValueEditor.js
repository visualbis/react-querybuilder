"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _preactCompat = _interopRequireWildcard(require("preact-compat"));
var _Autocomplete = require("@visualbi/bifrost-ui/dist/react/forms/Autocomplete");
var _DropDown = require("@visualbi/bifrost-ui/dist/react/forms/DropDown");
var _DatePickerComponent = _interopRequireDefault(require("./DatePickerComponent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var renderCustomInput = function renderCustomInput(props) {
  var placeHolder = props.placeHolder,
    selectedDay = props.selectedDay,
    className = props.className,
    isShowCalendar = props.isShowCalendar,
    setCalendar = props.setCalendar;
  var formattedValue = selectedDay ? "".concat(selectedDay.month, "/").concat(selectedDay.day, "/").concat(selectedDay.year) : '';
  var onClick = function onClick() {
    if (!isShowCalendar) setCalendar(true);
  };
  return /*#__PURE__*/_preactCompat.default.createElement("div", {
    role: "button",
    className: "date-input-container",
    onClick: onClick
  }, /*#__PURE__*/_preactCompat.default.createElement("input", {
    className: "".concat(className, " custom-input-class"),
    readOnly: true,
    placeholder: placeHolder,
    value: formattedValue
  }), isShowCalendar && /*#__PURE__*/_preactCompat.default.createElement(_DatePickerComponent.default, props));
};
var renderDefault = function renderDefault(props) {
  var inputType = props.inputType,
    value = props.value,
    title = props.title,
    className = props.className,
    placeHolder = props.placeHolder,
    inputDisabled = props.inputDisabled,
    handleOnChange = props.handleOnChange;
  var onChange = function onChange(e) {
    return handleOnChange(e.target.value);
  };
  return /*#__PURE__*/_preactCompat.default.createElement("div", {
    className: "rule-value-parent"
  }, /*#__PURE__*/_preactCompat.default.createElement("input", {
    type: inputType || 'text',
    value: value,
    title: title,
    disabled: inputDisabled,
    className: className,
    placeholder: placeHolder,
    onChange: onChange
  }));
};
var renderNumber = function renderNumber(props) {
  var value = props.value,
    title = props.title,
    className = props.className,
    placeHolder = props.placeHolder,
    inputDisabled = props.inputDisabled,
    handleOnChange = props.handleOnChange;
  var onChange = function onChange(e) {
    e.target.value = Math.abs(e.target.value.replace(/[^0-9]/, ''));
    handleOnChange(e.target.value);
  };
  return /*#__PURE__*/_preactCompat.default.createElement("div", {
    className: "rule-value-parent"
  }, /*#__PURE__*/_preactCompat.default.createElement("input", {
    type: "number",
    step: 1,
    onInput: onChange,
    value: value,
    title: title,
    disabled: inputDisabled,
    className: className,
    placeholder: placeHolder,
    role: "spinbutton",
    "aria-valuemin": 0,
    "aria-valuemax": 100000,
    min: 0,
    "aria-valuenow": 1,
    onChange: onChange
  }));
};
var renderTextArea = function renderTextArea(props) {
  var title = props.title,
    inputDisabled = props.inputDisabled,
    onTextAreaChange = props.onTextAreaChange,
    handleOnChange = props.handleOnChange,
    _value = props._value,
    className = props.className;
  var onBlur = function onBlur() {
    return handleOnChange(_value);
  };
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
    onBlur: onBlur
  }));
};
var renderCheckBox = function renderCheckBox(props) {
  var className = props.className,
    title = props.title,
    value = props.value,
    handleOnChange = props.handleOnChange;
  var onChange = function onChange(e) {
    return handleOnChange(e.target.checked);
  };
  return /*#__PURE__*/_preactCompat.default.createElement("input", {
    role: "checkbox",
    type: "checkbox",
    className: className,
    title: title,
    onChange: onChange,
    "aria-checked": !!value,
    checked: !!value,
    value: ''
  });
};
var renderSelect = function renderSelect(props) {
  var placeHolder = props.placeHolder,
    className = props.className,
    selectedOption = props.selectedOption,
    options = props.options,
    handleOnChange = props.handleOnChange;
  var onChange = function onChange(val) {
    return handleOnChange(val.value);
  };
  return /*#__PURE__*/_preactCompat.default.createElement(_DropDown.Dropdown, {
    placeholder: placeHolder,
    className: className,
    value: selectedOption,
    options: options,
    onChange: onChange
  });
};
var renderAutoComplete = function renderAutoComplete(props) {
  var placeHolder = props.placeHolder,
    value = props.value,
    options = props.options,
    handleOnChange = props.handleOnChange,
    className = props.className;
  var onChange = function onChange(val) {
    return handleOnChange(val);
  };
  return /*#__PURE__*/_preactCompat.default.createElement(_Autocomplete.Autocomplete, {
    scrollPositionSupport: true,
    placeholder: placeHolder,
    options: options,
    value: value,
    onChange: onChange,
    className: className
  });
};
var renderRadio = function renderRadio(props) {
  var value = props.value,
    handleOnChange = props.handleOnChange,
    className = props.className,
    title = props.title,
    values = props.values;
  var onChange = function onChange(e) {
    return handleOnChange(e.target.value);
  };
  return /*#__PURE__*/_preactCompat.default.createElement("span", {
    className: "".concat(className && className, " radio"),
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
      onChange: onChange
    }), /*#__PURE__*/_preactCompat.default.createElement("span", {
      className: "circle"
    }), /*#__PURE__*/_preactCompat.default.createElement("span", {
      className: "radio-title"
    }, v.label));
  }));
};
var onDateChange = function onDateChange(dateObj, setSelectedDay, handleOnChange) {
  setSelectedDay(dateObj);
  handleOnChange(dateObj ? "".concat(dateObj.month, "/").concat(dateObj.day, "/").concat(dateObj.year) : null);
};
var onCustomRendererChange = function onCustomRendererChange(val, handleOnChange) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id';
  handleOnChange(val[key]);
};
var onSelectDateChange = function onSelectDateChange(props) {
  var isTodaySelected = props.isTodaySelected,
    setSelectedDay = props.setSelectedDay,
    handleOnChange = props.handleOnChange,
    setTodayDate = props.setTodayDate;
  if (isTodaySelected) {
    onDateChange(null, setSelectedDay, handleOnChange);
    setTodayDate(false);
  }
};
var ValueEditor = function ValueEditor(props) {
  var operator = props.operator,
    value = props.value,
    handleOnChange = props.handleOnChange,
    type = props.type,
    placeHolder = props.placeHolder,
    values = props.values,
    customRenderer = props.customRenderer,
    getSelectionKey = props.getSelectionKey,
    field = props.field;
  var inputDisabled = false;
  var options = [];
  var selectedOption;
  var fieldType = type;
  var fieldPlaceHolder = placeHolder;
  if (['null', 'notNull', 'none', 'daysInThis', 'weeksInThis', 'monthsInThis', 'yearsInThis'].includes(operator) || fieldType === "none") {
    fieldType = 'text';
    inputDisabled = true;
    fieldPlaceHolder = '';
  }
  var _useState = (0, _preactCompat.useState)(value),
    _useState2 = _slicedToArray(_useState, 2),
    _value = _useState2[0],
    setValue = _useState2[1];
  var convertDateObj = function convertDateObj(dateString) {
    if (!dateString || typeof dateString !== 'string' || typeof dateString === 'string' && !dateString.includes('/')) return null;
    var d = new Date(dateString);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    return {
      day: day,
      month: month,
      year: year
    };
  };
  var _useState3 = (0, _preactCompat.useState)(convertDateObj(value)),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedDay = _useState4[0],
    setSelectedDay = _useState4[1];
  var _useState5 = (0, _preactCompat.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isTodaySelected = _useState6[0],
    setTodayDate = _useState6[1];
  var _useState7 = (0, _preactCompat.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isShowCalendar = _useState8[0],
    setCalendar = _useState8[1];
  var onTextAreaChange = function onTextAreaChange(e) {
    return setValue(e.target.value);
  };
  var onTodaysDateChange = function onTodaysDateChange() {
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    onDateChange({
      day: day,
      month: month,
      year: year
    }, setSelectedDay, handleOnChange);
    setTodayDate(true);
  };
  options = values ? values.map(function (item) {
    if (item.name == value) selectedOption = {
      value: item.name,
      label: item.label
    };
    return {
      value: item.name,
      label: item.label
    };
  }) : [];
  switch (fieldType) {
    case 'select':
      return renderSelect(_objectSpread(_objectSpread({}, props), {}, {
        selectedOption: selectedOption,
        options: options
      }));
    case 'autocomplete':
      return renderAutoComplete(_objectSpread(_objectSpread({}, props), {}, {
        options: options
      }));
    case 'checkbox':
      return renderCheckBox(props);
    case 'date':
      {
        var propList = _objectSpread(_objectSpread({}, props), {}, {
          placeHolder: fieldPlaceHolder,
          isShowCalendar: isShowCalendar,
          setCalendar: setCalendar,
          isTodaySelected: isTodaySelected,
          onTodaysDateChange: onTodaysDateChange,
          onSelectDateChange: onSelectDateChange({
            isTodaySelected: isTodaySelected,
            setSelectedDay: setSelectedDay,
            handleOnChange: handleOnChange,
            setTodayDate: setTodayDate
          }),
          selectedDay: selectedDay,
          setSelectedDay: setSelectedDay,
          onDateChange: onDateChange
        });
        return renderCustomInput(propList);
      }
    case 'radio':
      return renderRadio(props);
    case 'textarea':
      return renderTextArea(_objectSpread(_objectSpread({}, props), {}, {
        onTextAreaChange: onTextAreaChange,
        _value: _value,
        inputDisabled: inputDisabled
      }));
    case 'custom':
      {
        var key = field && (getSelectionKey === null || getSelectionKey === void 0 ? void 0 : getSelectionKey(field)) || 'id';
        if (customRenderer) return customRenderer(_objectSpread(_objectSpread({}, props), {}, {
          onChange: function onChange(val) {
            return onCustomRendererChange(val, handleOnChange, key);
          }
        }));
        return /*#__PURE__*/_preactCompat.default.createElement(_preactCompat.default.Fragment, null);
      }
    case 'numeric':
      return renderNumber(_objectSpread(_objectSpread({}, props), {}, {
        inputDisabled: inputDisabled
      }));
    default:
      return renderDefault(_objectSpread(_objectSpread({}, props), {}, {
        inputDisabled: inputDisabled
      }));
  }
};
ValueEditor.displayName = 'ValueEditor';
var _default = ValueEditor;
exports.default = _default;