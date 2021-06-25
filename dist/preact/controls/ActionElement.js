"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preactCompat = _interopRequireDefault(require("preact-compat"));

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
      return /*#__PURE__*/_preactCompat.default.createElement("span", null, /*#__PURE__*/_preactCompat.default.createElement("svg", {
        width: "11",
        height: "12",
        viewBox: "0 0 11 12",
        fill: "none"
      }, /*#__PURE__*/_preactCompat.default.createElement("path", {
        d: "M10.3582 2.25H9.60815V10.875C9.60815 11.0312 9.57886 11.1777 9.52026 11.3145C9.46167 11.4512 9.38159 11.5703 9.28003 11.6719C9.17847 11.7734 9.05933 11.8535 8.92261 11.9121C8.78589 11.9707 8.6394 12 8.48315 12H2.48315C2.3269 12 2.18042 11.9707 2.0437 11.9121C1.90698 11.8535 1.78784 11.7734 1.68628 11.6719C1.58472 11.5703 1.50464 11.4512 1.44604 11.3145C1.38745 11.1777 1.35815 11.0312 1.35815 10.875V2.25H0.608154V1.5H3.60815V0.75C3.60815 0.644531 3.62769 0.546875 3.66675 0.457031C3.70581 0.367188 3.75854 0.289062 3.82495 0.222656C3.89526 0.152344 3.97534 0.0976563 4.06519 0.0585938C4.15503 0.0195312 4.25269 0 4.35815 0H6.60815C6.71362 0 6.81128 0.0195312 6.90112 0.0585938C6.99097 0.0976563 7.06909 0.152344 7.1355 0.222656C7.20581 0.289062 7.2605 0.367188 7.29956 0.457031C7.33862 0.546875 7.35815 0.644531 7.35815 0.75V1.5H10.3582V2.25ZM4.35815 1.5H6.60815V0.75H4.35815V1.5ZM8.85815 2.25H2.10815V10.875C2.10815 10.9766 2.14526 11.0645 2.21948 11.1387C2.2937 11.2129 2.38159 11.25 2.48315 11.25H8.48315C8.58472 11.25 8.67261 11.2129 8.74683 11.1387C8.82104 11.0645 8.85815 10.9766 8.85815 10.875V2.25ZM4.35815 9.75H3.60815V3.75H4.35815V9.75ZM5.85815 9.75H5.10815V3.75H5.85815V9.75ZM7.35815 9.75H6.60815V3.75H7.35815V9.75Z",
        fill: "#A6A6A6"
      })));
    }

    if (className && className.indexOf("ruleGroup-clearRule") > -1) {
      return /*#__PURE__*/_preactCompat.default.createElement("span", null, /*#__PURE__*/_preactCompat.default.createElement("svg", {
        width: "11",
        height: "10",
        viewBox: "0 0 11 10",
        fill: "none"
      }, /*#__PURE__*/_preactCompat.default.createElement("path", {
        d: "M5.44434 8.75H7.5V9.375H2.21191L0.244141 7.40234C0.166016 7.32422 0.105794 7.23307 0.0634766 7.12891C0.0211589 7.02148 0 6.91081 0 6.79688C0 6.68294 0.0211589 6.57389 0.0634766 6.46973C0.105794 6.3623 0.167643 6.2679 0.249023 6.18652L6.09375 0.336914L9.9707 4.21875L5.44434 8.75ZM6.09375 1.2207L2.62695 4.6875L5.625 7.68066L9.08691 4.21875L6.09375 1.2207ZM4.55566 8.75L5.18066 8.125L2.1875 5.12695L0.693359 6.62598C0.647786 6.67155 0.625 6.72852 0.625 6.79688C0.625 6.86523 0.647786 6.9222 0.693359 6.96777L2.4707 8.75H4.55566Z",
        fill: "#0078D4"
      })), label);
    }

    if (className && className.indexOf("ruleGroup-addRule") > -1) {
      return /*#__PURE__*/_preactCompat.default.createElement("span", null, /*#__PURE__*/_preactCompat.default.createElement("svg", {
        width: "11",
        height: "10",
        viewBox: "0 0 11 10",
        fill: "none"
      }, /*#__PURE__*/_preactCompat.default.createElement("path", {
        d: "M10.2559 4.6875V5.3125H5.56836V10H4.94336V5.3125H0.255859V4.6875H4.94336V0H5.56836V4.6875H10.2559Z",
        fill: "#0078D4"
      })), label);
    }

    if (className && className.indexOf("ruleGroup-addGroup ") > -1) {
      return /*#__PURE__*/_preactCompat.default.createElement("span", null, /*#__PURE__*/_preactCompat.default.createElement("svg", {
        width: "10",
        height: "10",
        viewBox: "0 0 10 10",
        fill: "none"
      }, /*#__PURE__*/_preactCompat.default.createElement("path", {
        d: "M10 0V4.375H3.125V0H10ZM9.375 0.625H3.75V3.75H9.375V0.625ZM3.125 5.625H10V10H3.125V5.625ZM3.75 9.375H9.375V6.25H3.75V9.375ZM0.532227 3.21777L2.31934 5L0.532227 6.78223L0.0927734 6.34277L1.43066 5L0.0927734 3.65723L0.532227 3.21777Z",
        fill: "#0078D4"
      })), label);
    }

    return label;
  };

  return /*#__PURE__*/_preactCompat.default.createElement("button", {
    className: className,
    title: title,
    onClick: onClick
  }, renderLabel(label, className));
};

ActionElement.displayName = 'ActionElement';
var _default = ActionElement;
exports.default = _default;