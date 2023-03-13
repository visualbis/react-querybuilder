"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rule = void 0;
var _arrayFind = _interopRequireDefault(require("array-find"));
var _preactCompat = _interopRequireDefault(require("preact-compat"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var renderRemoveRuleAction = function renderRemoveRuleAction(_ref) {
  var controls = _ref.controls,
    translations = _ref.translations,
    classNames = _ref.classNames,
    removeRule = _ref.removeRule,
    level = _ref.level;
  return /*#__PURE__*/_preactCompat.default.createElement(controls.removeRuleAction, {
    label: translations.removeRule.label,
    title: translations.removeRule.title,
    className: "rule-remove ".concat(classNames.removeRule),
    handleOnClick: removeRule,
    level: level
  });
};
var renderValueEditor = function renderValueEditor(_ref2) {
  var controls = _ref2.controls,
    translations = _ref2.translations,
    classNames = _ref2.classNames,
    onValueChanged = _ref2.onValueChanged,
    field = _ref2.field,
    customRenderer = _ref2.customRenderer,
    getSelectionKey = _ref2.getSelectionKey,
    level = _ref2.level,
    fieldData = _ref2.fieldData,
    operator = _ref2.operator,
    getValueEditorType = _ref2.getValueEditorType,
    value = _ref2.value,
    getInputType = _ref2.getInputType,
    getPlaceHolder = _ref2.getPlaceHolder,
    getValues = _ref2.getValues,
    parentOperator = _ref2.parentOperator;
  return /*#__PURE__*/_preactCompat.default.createElement(controls.valueEditor, {
    field: field,
    fieldData: fieldData,
    title: translations.value.title,
    operator: operator,
    value: value,
    type: getValueEditorType(field, operator, parentOperator),
    inputType: getInputType(field, operator),
    placeHolder: getPlaceHolder(field, operator),
    values: getValues(field, operator),
    className: "rule-value ".concat(classNames.value),
    handleOnChange: onValueChanged,
    level: level,
    customRenderer: customRenderer,
    getSelectionKey: getSelectionKey
  });
};
var renderFieldSelector = function renderFieldSelector(_ref3) {
  var controls = _ref3.controls,
    translations = _ref3.translations,
    classNames = _ref3.classNames,
    fields = _ref3.fields,
    level = _ref3.level,
    field = _ref3.field,
    operator = _ref3.operator,
    onFieldChanged = _ref3.onFieldChanged;
  return /*#__PURE__*/_preactCompat.default.createElement(controls.fieldSelector, {
    options: fields,
    title: translations.fields.title,
    value: field,
    operator: operator,
    placeHolderTooltip: true,
    className: "rule-fields ".concat(classNames.fields),
    handleOnChange: onFieldChanged,
    level: level
  });
};
var renderParentOperatorSelector = function renderParentOperatorSelector(_ref4) {
  var controls = _ref4.controls,
    translations = _ref4.translations,
    classNames = _ref4.classNames,
    fieldData = _ref4.fieldData,
    level = _ref4.level,
    field = _ref4.field,
    parentOpertators = _ref4.parentOpertators,
    parentOperator = _ref4.parentOperator,
    onParentOperatorChanged = _ref4.onParentOperatorChanged;
  return /*#__PURE__*/_preactCompat.default.createElement(controls.parentOperatorSelector, {
    field: field,
    fieldData: fieldData,
    title: translations.operators.title,
    placeHolderTooltip: true,
    options: parentOpertators,
    value: parentOperator,
    className: "rule-operators ".concat(classNames.operators),
    handleOnChange: onParentOperatorChanged,
    level: level
  });
};
var renderOperatorSelector = function renderOperatorSelector(_ref5) {
  var controls = _ref5.controls,
    translations = _ref5.translations,
    classNames = _ref5.classNames,
    fieldData = _ref5.fieldData,
    level = _ref5.level,
    field = _ref5.field,
    getOperatorsList = _ref5.getOperatorsList,
    operator = _ref5.operator,
    onOperatorChanged = _ref5.onOperatorChanged;
  return /*#__PURE__*/_preactCompat.default.createElement(controls.operatorSelector, {
    field: field,
    fieldData: fieldData,
    title: translations.operators.title,
    placeHolderTooltip: true,
    options: getOperatorsList(field),
    value: operator,
    className: "rule-operators ".concat(classNames.operators),
    handleOnChange: onOperatorChanged,
    level: level
  });
};
var Rule = function Rule(_ref6) {
  var id = _ref6.id,
    parentId = _ref6.parentId,
    field = _ref6.field,
    operator = _ref6.operator,
    parentOperator = _ref6.parentOperator,
    value = _ref6.value,
    translations = _ref6.translations,
    _ref6$schema = _ref6.schema,
    classNames = _ref6$schema.classNames,
    controls = _ref6$schema.controls,
    fields = _ref6$schema.fields,
    getInputType = _ref6$schema.getInputType,
    getPlaceHolder = _ref6$schema.getPlaceHolder,
    getLevel = _ref6$schema.getLevel,
    getOperators = _ref6$schema.getOperators,
    getValueEditorType = _ref6$schema.getValueEditorType,
    getValues = _ref6$schema.getValues,
    onPropChange = _ref6$schema.onPropChange,
    onRuleRemove = _ref6$schema.onRuleRemove,
    removeIconatStart = _ref6$schema.removeIconatStart,
    customRenderer = _ref6$schema.customRenderer,
    getSelectionKey = _ref6$schema.getSelectionKey;
  var onElementChanged = function onElementChanged(property, value) {
    return onPropChange(property, value, id);
  };
  var onFieldChanged = function onFieldChanged(value) {
    return onElementChanged('field', value);
  };
  var onOperatorChanged = function onOperatorChanged(value) {
    return onElementChanged('operator', value);
  };
  var onParentOperatorChanged = function onParentOperatorChanged(value) {
    return onElementChanged('parentOperator', value);
  };
  var onValueChanged = function onValueChanged(value) {
    return onElementChanged('value', value);
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
  var parentOpertators = getOperators(field, true);
  var getOperatorsList = function getOperatorsList(field) {
    return getOperators(field, false, parentOperator);
  };
  var enableParentOperaton = !!(parentOpertators && parentOpertators.length);
  return /*#__PURE__*/_preactCompat.default.createElement("div", {
    className: "rule ".concat(classNames.rule),
    "data-rule-id": id,
    "data-level": level
  }, removeIconatStart && renderRemoveRuleAction({
    controls: controls,
    translations: translations,
    classNames: classNames,
    removeRule: removeRule,
    level: level
  }), renderFieldSelector({
    controls: controls,
    translations: translations,
    classNames: classNames,
    fields: fields,
    level: level,
    field: field,
    operator: operator,
    onFieldChanged: onFieldChanged
  }), enableParentOperaton && renderParentOperatorSelector({
    controls: controls,
    translations: translations,
    classNames: classNames,
    fieldData: fieldData,
    level: level,
    field: field,
    parentOpertators: parentOpertators,
    parentOperator: parentOperator,
    onParentOperatorChanged: onParentOperatorChanged
  }), !enableParentOperaton && renderOperatorSelector({
    controls: controls,
    translations: translations,
    classNames: classNames,
    fieldData: fieldData,
    level: level,
    field: field,
    getOperatorsList: getOperatorsList,
    operator: operator,
    onOperatorChanged: onOperatorChanged
  }), renderValueEditor({
    controls: controls,
    translations: translations,
    classNames: classNames,
    onValueChanged: onValueChanged,
    field: field,
    customRenderer: customRenderer,
    getSelectionKey: getSelectionKey,
    level: level,
    fieldData: fieldData,
    operator: operator,
    getValueEditorType: getValueEditorType,
    value: value,
    getInputType: getInputType,
    getPlaceHolder: getPlaceHolder,
    getValues: getValues,
    parentOperator: parentOperator
  }), enableParentOperaton && renderOperatorSelector({
    controls: controls,
    translations: translations,
    classNames: classNames,
    fieldData: fieldData,
    level: level,
    field: field,
    getOperatorsList: getOperatorsList,
    operator: operator,
    onOperatorChanged: onOperatorChanged
  }), !removeIconatStart && renderRemoveRuleAction({
    controls: controls,
    translations: translations,
    classNames: classNames,
    removeRule: removeRule,
    level: level
  }));
};
exports.Rule = Rule;
Rule.displayName = 'Rule';