"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavTab = function NavTab(_ref) {
  var className = _ref.className,
      handleOnChange = _ref.handleOnChange,
      options = _ref.options,
      title = _ref.title,
      value = _ref.value;

  var onChange = function onChange(e) {
    handleOnChange(e.target.value);
  };

  return /*#__PURE__*/_react.default.createElement("span", {
    className: className,
    title: title
  }, options && options.map(function (v) {
    var isChecked = value === v.name;
    return /*#__PURE__*/_react.default.createElement("label", {
      className: "radio",
      key: v.name
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "radio",
      value: v.name,
      "aria-checked": isChecked,
      checked: isChecked,
      onChange: onChange
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: "circle"
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: "radio-title"
    }, v.label));
  })) //   <div className={className}>
  //       {options.map((option) => {
  //   const key = option.id ? `key-${option.id}` : `key-${option.name}`;
  //   const cls =  value == option.name?"combinators active":"combinators";
  //   return (
  //     <input type="button" className={cls} role="button" data-key={option.name} key={option.name} onClick={onChange} value={option.label}/>
  //   );
  // })}
  //   </div>
  ;
};

NavTab.displayName = 'NavTab';
var _default = NavTab;
exports.default = _default;