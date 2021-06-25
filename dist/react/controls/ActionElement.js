"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionElement = function ActionElement(_ref) {
  var className = _ref.className,
      handleOnClick = _ref.handleOnClick,
      label = _ref.label,
      title = _ref.title;

  var onClick = function onClick(e) {
    return handleOnClick(e);
  };

  var renderLabel = function renderLabel(label, className) {
    if (label == "x") {
      return /*#__PURE__*/_react.default.createElement("span", {
        className: "ms-Icon ms-Icon--Delete"
      });
    }

    if (className && className.indexOf("ruleGroup-clearRule") > -1) {
      return /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("span", {
        className: "ms-Icon ms-Icon--EraseTool"
      }), label);
    }

    if (className && className.indexOf("ruleGroup-addRule") > -1) {
      return /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("svg", {
        width: "11",
        height: "10",
        viewBox: "0 0 11 10",
        fill: "none"
      }, /*#__PURE__*/_react.default.createElement("path", {
        d: "M10.2559 4.6875V5.3125H5.56836V10H4.94336V5.3125H0.255859V4.6875H4.94336V0H5.56836V4.6875H10.2559Z",
        fill: "#0078D4"
      })), label);
    }

    if (className && className.indexOf("ruleGroup-addGroup ") > -1) {
      return /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("svg", {
        width: "10",
        height: "10",
        viewBox: "0 0 10 10",
        fill: "none"
      }, /*#__PURE__*/_react.default.createElement("path", {
        d: "M10 0V4.375H3.125V0H10ZM9.375 0.625H3.75V3.75H9.375V0.625ZM3.125 5.625H10V10H3.125V5.625ZM3.75 9.375H9.375V6.25H3.75V9.375ZM0.532227 3.21777L2.31934 5L0.532227 6.78223L0.0927734 6.34277L1.43066 5L0.0927734 3.65723L0.532227 3.21777Z",
        fill: "#0078D4"
      })), label);
    }

    return label;
  };

  return /*#__PURE__*/_react.default.createElement("button", {
    className: className,
    title: title,
    onClick: onClick
  }, renderLabel(label, className));
};

ActionElement.displayName = 'ActionElement';
var _default = ActionElement;
exports.default = _default;