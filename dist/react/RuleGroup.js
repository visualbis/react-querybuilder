"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuleGroup = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var RuleGroup = function RuleGroup(_ref) {
  var id = _ref.id,
      _ref$combinator = _ref.combinator,
      combinator = _ref$combinator === void 0 ? 'and' : _ref$combinator,
      _ref$rules = _ref.rules,
      rules = _ref$rules === void 0 ? [] : _ref$rules,
      translations = _ref.translations,
      schema = _ref.schema;
  var classNames = schema.classNames,
      hasColumnChildRule = schema.hasColumnChildRule,
      combinators = schema.combinators,
      controls = schema.controls,
      createRule = schema.createRule,
      createRuleGroup = schema.createRuleGroup,
      getLevel = schema.getLevel,
      isRuleGroup = schema.isRuleGroup,
      onGroupAdd = schema.onGroupAdd,
      onPropChange = schema.onPropChange,
      onRuleAdd = schema.onRuleAdd,
      showCombinatorsBetweenRules = schema.showCombinatorsBetweenRules,
      showAddGroup = schema.showAddGroup,
      showAddRule = schema.showAddRule;

  var onCombinatorChange = function onCombinatorChange(value) {
    onPropChange('combinator', value, id);
  };

  var addRule = function addRule(event) {
    event.preventDefault();
    event.stopPropagation();
    var newRule = createRule();
    onRuleAdd(newRule, id);
  };

  var addGroup = function addGroup(event) {
    event.preventDefault();
    event.stopPropagation();
    var newGroup = createRuleGroup();
    onGroupAdd(newGroup, id);
  }; // const removeGroup = (event: React.MouseEvent<Element, MouseEvent>) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   onGroupRemove(id, parentId || /* istanbul ignore next */ '');
  // };


  var level = getLevel(id); // const isClearEnabled = isRoot && enableClear && rules && rules.length;

  var removeOr = level < 1 && hasColumnChildRule();
  var combinatorCls = removeOr ? "disable-or" : "";
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "ruleGroup ".concat(classNames.ruleGroup),
    "data-rule-group-id": id,
    "data-level": level
  }, (!showCombinatorsBetweenRules && rules && rules.length > 1 || showAddGroup || showAddRule) && /*#__PURE__*/_react.default.createElement("div", {
    className: "ruleGroup-header ".concat(classNames.header)
  }, !showCombinatorsBetweenRules && rules && rules.length > 1 && /*#__PURE__*/_react.default.createElement(controls.combinatorSelector, {
    options: combinators,
    value: combinator,
    title: translations.combinators.title,
    className: "ruleGroup-combinators betweenRules ".concat(combinatorCls, " ").concat(classNames.combinators),
    handleOnChange: onCombinatorChange,
    rules: rules,
    level: level
  }), showAddGroup && /*#__PURE__*/_react.default.createElement(controls.addGroupAction, {
    label: translations.addGroup.label,
    title: translations.addGroup.title,
    className: "ruleGroup-addGroup ".concat(classNames.addGroup),
    handleOnClick: addGroup,
    rules: rules,
    level: level
  }), showAddRule && /*#__PURE__*/_react.default.createElement(controls.addRuleAction, {
    label: translations.addRule.label,
    title: translations.addRule.title,
    className: "ruleGroup-addRule ".concat(classNames.addRule),
    handleOnClick: addRule,
    rules: rules,
    level: level
  })), rules.length > 0 && rules.map(function (r, idx) {
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, {
      key: r.id
    }, idx === 1 && showCombinatorsBetweenRules && /*#__PURE__*/_react.default.createElement("div", {
      className: "ruleGroup-header ".concat(classNames.header)
    }, " ", /*#__PURE__*/_react.default.createElement(controls.combinatorSelector, {
      options: combinators,
      value: combinator,
      title: translations.combinators.title,
      className: "ruleGroup-combinators betweenRules ".concat(combinatorCls, "  ").concat(classNames.combinators),
      handleOnChange: onCombinatorChange,
      rules: rules,
      level: level
    })), isRuleGroup(r) ? /*#__PURE__*/_react.default.createElement(RuleGroup, {
      id: r.id,
      schema: schema,
      parentId: id,
      combinator: r.combinator,
      translations: translations,
      rules: r.rules,
      not: !!r.not
    }) : r.id ? /*#__PURE__*/_react.default.createElement(controls.rule, {
      id: r.id,
      field: r.field,
      value: r.value,
      operator: r.operator,
      schema: schema,
      parentId: id,
      translations: translations
    }) : null);
  }));
};

exports.RuleGroup = RuleGroup;
RuleGroup.displayName = 'RuleGroup';