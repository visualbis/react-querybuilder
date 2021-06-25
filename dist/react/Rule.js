"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rule = void 0;

var _arrayFind = _interopRequireDefault(require("array-find"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Rule = function Rule(_ref) {
  var id = _ref.id,
      parentId = _ref.parentId,
      field = _ref.field,
      operator = _ref.operator,
      value = _ref.value,
      translations = _ref.translations,
      _ref$schema = _ref.schema,
      classNames = _ref$schema.classNames,
      controls = _ref$schema.controls,
      fields = _ref$schema.fields,
      getInputType = _ref$schema.getInputType,
      getPlaceHolder = _ref$schema.getPlaceHolder,
      getLevel = _ref$schema.getLevel,
      getOperators = _ref$schema.getOperators,
      getValueEditorType = _ref$schema.getValueEditorType,
      getValues = _ref$schema.getValues,
      onPropChange = _ref$schema.onPropChange,
      onRuleRemove = _ref$schema.onRuleRemove,
      removeIconatStart = _ref$schema.removeIconatStart;

  var onElementChanged = function onElementChanged(property, value) {
    onPropChange(property, value, id);
  };

  var onFieldChanged = function onFieldChanged(value) {
    onElementChanged('field', value);
  };

  var onOperatorChanged = function onOperatorChanged(value) {
    onElementChanged('operator', value);
  };

  var onValueChanged = function onValueChanged(value) {
    onElementChanged('value', value);
  };

  var removeRule = function removeRule(event) {
    event.preventDefault();
    event.stopPropagation();
    onRuleRemove(id, parentId);
  };

  var fieldData = (0, _arrayFind.default)(fields, function (f) {
    return f.name === field;
  });
  var level = getLevel(id);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "rule ".concat(classNames.rule),
    "data-rule-id": id,
    "data-level": level
  }, removeIconatStart && /*#__PURE__*/_react.default.createElement(controls.removeRuleAction, {
    label: translations.removeRule.label,
    title: translations.removeRule.title,
    className: "rule-remove ".concat(classNames.removeRule),
    handleOnClick: removeRule,
    level: level
  }), /*#__PURE__*/_react.default.createElement(controls.fieldSelector, {
    options: fields,
    title: translations.fields.title,
    value: field,
    operator: operator,
    placeHolderTooltip: true,
    className: "rule-fields ".concat(classNames.fields),
    handleOnChange: onFieldChanged,
    level: level
  }), /*#__PURE__*/_react.default.createElement(controls.operatorSelector, {
    field: field,
    fieldData: fieldData,
    title: translations.operators.title,
    placeHolderTooltip: true,
    options: getOperators(field),
    value: operator,
    className: "rule-operators ".concat(classNames.operators),
    handleOnChange: onOperatorChanged,
    level: level
  }), /*#__PURE__*/_react.default.createElement(controls.valueEditor, {
    field: field,
    fieldData: fieldData,
    title: translations.value.title,
    operator: operator,
    value: value,
    type: getValueEditorType(field, operator),
    inputType: getInputType(field, operator),
    placeHolder: getPlaceHolder(field, operator),
    values: getValues(field, operator),
    className: "rule-value ".concat(classNames.value),
    handleOnChange: onValueChanged,
    level: level
  }), !removeIconatStart && /*#__PURE__*/_react.default.createElement(controls.removeRuleAction, {
    label: translations.removeRule.label,
    title: translations.removeRule.title,
    className: "rule-remove ".concat(classNames.removeRule),
    handleOnClick: removeRule,
    level: level
  }));
};

exports.Rule = Rule;
Rule.displayName = 'Rule';