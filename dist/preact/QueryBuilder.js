"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryBuilder = void 0;

var _arrayFindIndex = _interopRequireDefault(require("array-find-index"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _nanoid = require("nanoid");

var _objectAssign2 = _interopRequireDefault(require("object-assign"));

var _preactCompat = _interopRequireWildcard(require("preact-compat"));

var _controls = require("./controls");

var _Rule = require("./Rule");

var _RuleGroup = require("./RuleGroup");

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultTranslations = {
  fields: {
    title: 'Fields'
  },
  operators: {
    title: 'Operators'
  },
  value: {
    title: 'Value'
  },
  removeRule: {
    label: 'x',
    title: 'Remove rule'
  },
  removeGroup: {
    label: 'x',
    title: 'Remove group'
  },
  addRule: {
    label: ' Add filter',
    title: 'Add filter'
  },
  clearRule: {
    label: ' Clear',
    title: 'Clear rule'
  },
  addGroup: {
    label: ' Add group',
    title: 'Add group'
  },
  combinators: {
    title: 'Combinators'
  },
  notToggle: {
    title: 'Invert this group'
  }
};
var defaultOperators = [{
  name: 'in',
  label: 'in'
}, {
  name: 'null',
  label: 'is null'
}, {
  name: 'notNull',
  label: 'is not null'
}, {
  name: 'notIn',
  label: 'not in'
}, {
  name: '=',
  label: '='
}, {
  name: '!=',
  label: '!='
}, {
  name: '<',
  label: '<'
}, {
  name: '>',
  label: '>'
}, {
  name: '<=',
  label: '<='
}, {
  name: '>=',
  label: '>='
}, {
  name: 'contains',
  label: 'contains'
}, {
  name: 'beginsWith',
  label: 'begins with'
}, {
  name: 'endsWith',
  label: 'ends with'
}, {
  name: 'doesNotContain',
  label: 'does not contain'
}, {
  name: 'doesNotBeginWith',
  label: 'does not begin with'
}, {
  name: 'doesNotEndWith',
  label: 'does not end with'
}];
var defaultCombinators = [{
  name: 'and',
  label: 'And'
}, {
  name: 'or',
  label: 'Or'
}];
var defaultControlClassnames = {
  queryBuilder: '',
  ruleGroup: '',
  header: '',
  combinators: '',
  addRule: '',
  clearRule: "",
  addGroup: '',
  removeGroup: '',
  notToggle: '',
  rule: '',
  fields: '',
  operators: '',
  value: '',
  removeRule: ''
};
var defaultControlElements = {
  addGroupAction: _controls.ActionElement,
  clearRuleAction: _controls.ActionElement,
  removeGroupAction: _controls.ActionElement,
  addRuleAction: _controls.ActionElement,
  removeRuleAction: _controls.ActionElement,
  combinatorSelector: _controls.NavTab,
  fieldSelector: _controls.ValueSelector,
  operatorSelector: _controls.ValueSelector,
  valueEditor: _controls.ValueEditor,
  notToggle: _controls.NotToggle,
  ruleGroup: _RuleGroup.RuleGroup,
  rule: _Rule.Rule
};

var QueryBuilder = function QueryBuilder(_ref) {
  var query = _ref.query,
      _ref$fields = _ref.fields,
      fields = _ref$fields === void 0 ? [] : _ref$fields,
      _ref$operators = _ref.operators,
      operators = _ref$operators === void 0 ? defaultOperators : _ref$operators,
      _ref$combinators = _ref.combinators,
      combinators = _ref$combinators === void 0 ? defaultCombinators : _ref$combinators,
      _ref$translations = _ref.translations,
      translations = _ref$translations === void 0 ? defaultTranslations : _ref$translations,
      controlElements = _ref.controlElements,
      getPlaceHolder = _ref.getPlaceHolder,
      getOperators = _ref.getOperators,
      getValueEditorType = _ref.getValueEditorType,
      getInputType = _ref.getInputType,
      getValues = _ref.getValues,
      onQueryChange = _ref.onQueryChange,
      controlClassnames = _ref.controlClassnames,
      _ref$showCombinatorsB = _ref.showCombinatorsBetweenRules,
      showCombinatorsBetweenRules = _ref$showCombinatorsB === void 0 ? false : _ref$showCombinatorsB,
      _ref$enableNormalView = _ref.enableNormalView,
      enableNormalView = _ref$enableNormalView === void 0 ? false : _ref$enableNormalView,
      onAdvancedClick = _ref.onAdvancedClick,
      _ref$showNotToggle = _ref.showNotToggle,
      showNotToggle = _ref$showNotToggle === void 0 ? false : _ref$showNotToggle,
      getSelectedColumn = _ref.getSelectedColumn,
      _ref$resetOnFieldChan = _ref.resetOnFieldChange,
      resetOnFieldChange = _ref$resetOnFieldChan === void 0 ? true : _ref$resetOnFieldChan,
      _ref$showAddGroup = _ref.showAddGroup,
      showAddGroup = _ref$showAddGroup === void 0 ? true : _ref$showAddGroup,
      _ref$showAddRule = _ref.showAddRule,
      showAddRule = _ref$showAddRule === void 0 ? true : _ref$showAddRule,
      _ref$resetOnOperatorC = _ref.resetOnOperatorChange,
      resetOnOperatorChange = _ref$resetOnOperatorC === void 0 ? false : _ref$resetOnOperatorC,
      _ref$removeIconatStar = _ref.removeIconatStart,
      removeIconatStart = _ref$removeIconatStar === void 0 ? false : _ref$removeIconatStar;

  var getInitialQuery = function getInitialQuery() {
    // Gets the initial query   
    return query && (0, _utils.generateValidQuery)(query) || createRuleGroup();
  };

  var createRuleGroup = function createRuleGroup() {
    return {
      id: "g-".concat((0, _nanoid.nanoid)()),
      rules: [],
      combinator: combinators[0].name,
      not: false
    };
  };

  var createRule = function createRule() {
    var field = fields[0].name;

    if (getSelectedColumn) {
      var selection = getSelectedColumn();
      if (selection) field = getSelectedColumn();
    }

    return {
      id: "r-".concat((0, _nanoid.nanoid)()),
      field: field,
      value: '',
      operator: getOperatorsMain(field)[0].name
    };
  };

  var _useQueryBuilderProps = useQueryBuilderProps(getValueEditorType, getInputType, getValues, getOperators, operators, getPlaceHolder),
      getValueEditorTypeMain = _useQueryBuilderProps.getValueEditorTypeMain,
      getInputTypeMain = _useQueryBuilderProps.getInputTypeMain,
      getOperatorsMain = _useQueryBuilderProps.getOperatorsMain,
      getRuleDefaultValue = _useQueryBuilderProps.getRuleDefaultValue,
      getValuesMain = _useQueryBuilderProps.getValuesMain,
      getPlaceHolderMain = _useQueryBuilderProps.getPlaceHolderMain,
      getValidQuery = _useQueryBuilderProps.getValidQuery,
      getNormalQuery = _useQueryBuilderProps.getNormalQuery,
      getRuleUpdatedValue = _useQueryBuilderProps.getRuleUpdatedValue;

  var _useQueryBuilderActio = useQueryBuilderActions(query, fields, combinators, createRule, getInitialQuery, onQueryChange, getOperatorsMain, getValidQuery, getRuleDefaultValue, resetOnFieldChange, resetOnOperatorChange, getValueEditorType, getSelectedColumn, getRuleUpdatedValue),
      root = _useQueryBuilderActio.root,
      clearRule = _useQueryBuilderActio.clearRule,
      setRoot = _useQueryBuilderActio.setRoot,
      _notifyQueryChange = _useQueryBuilderActio._notifyQueryChange,
      getLevelFromRoot = _useQueryBuilderActio.getLevelFromRoot,
      onGroupRemove = _useQueryBuilderActio.onGroupRemove,
      onRuleRemove = _useQueryBuilderActio.onRuleRemove,
      onPropChange = _useQueryBuilderActio.onPropChange,
      onGroupAdd = _useQueryBuilderActio.onGroupAdd,
      onAddRullonRootLevel = _useQueryBuilderActio.onAddRullonRootLevel,
      onRuleAdd = _useQueryBuilderActio.onRuleAdd;

  var schema = {
    fields: fields,
    combinators: combinators,
    classNames: _objectSpread(_objectSpread({}, defaultControlClassnames), controlClassnames),
    clearRule: clearRule,
    createRule: createRule,
    createRuleGroup: createRuleGroup,
    onRuleAdd: onRuleAdd,
    onGroupAdd: onGroupAdd,
    onRuleRemove: onRuleRemove,
    onGroupRemove: onGroupRemove,
    onPropChange: onPropChange,
    getLevel: getLevelFromRoot,
    isRuleGroup: _utils.isRuleGroup,
    controls: _objectSpread(_objectSpread({}, defaultControlElements), controlElements),
    getOperators: getOperatorsMain,
    getValueEditorType: getValueEditorTypeMain,
    getInputType: getInputTypeMain,
    getPlaceHolder: getPlaceHolderMain,
    getValues: getValuesMain,
    showCombinatorsBetweenRules: showCombinatorsBetweenRules,
    showAddGroup: showAddGroup,
    showAddRule: showAddRule,
    showNotToggle: showNotToggle,
    removeIconatStart: removeIconatStart
  };
  (0, _preactCompat.useEffect)(function () {
    // Set the query state when a new query prop comes in
    setRoot((0, _utils.generateValidQuery)(query || getInitialQuery()));
  }, [query]);
  (0, _preactCompat.useEffect)(function () {
    // Notify a query change on mount
    _notifyQueryChange(root);
  }, []);
  var updatedroot = root;

  if (enableNormalView) {
    updatedroot = getNormalQuery(root);
  }

  var isNoRulesApplied = enableNormalView && updatedroot.rules.length === 0;
  return /*#__PURE__*/_preactCompat.default.createElement("div", null, /*#__PURE__*/_preactCompat.default.createElement("div", {
    className: "queryBuilder ".concat(schema.classNames.queryBuilder)
  }, isNoRulesApplied && /*#__PURE__*/_preactCompat.default.createElement("span", {
    className: "no-rule"
  }, " No filters applied"), !isNoRulesApplied && /*#__PURE__*/_preactCompat.default.createElement(schema.controls.ruleGroup, {
    translations: _objectSpread(_objectSpread({}, defaultTranslations), translations),
    enableClear: enableNormalView,
    isRoot: true,
    rules: updatedroot.rules,
    combinator: root.combinator,
    schema: schema,
    id: root.id,
    not: !!root.not
  })), enableNormalView && /*#__PURE__*/_preactCompat.default.createElement("div", {
    className: "queryBuilder-footer"
  }, /*#__PURE__*/_preactCompat.default.createElement("div", {
    title: "Open advanced filter",
    role: "button",
    className: "queryBuilder-footer-advanced",
    onClick: onAdvancedClick
  }, /*#__PURE__*/_preactCompat.default.createElement("span", {
    className: "ms-Icon ms-Icon--FilterSettings"
  }), /*#__PURE__*/_preactCompat.default.createElement("span", {
    className: "queryBuilder-footer-title"
  }, "Advanced")), /*#__PURE__*/_preactCompat.default.createElement("div", {
    title: "Add new filter",
    role: "button",
    className: "queryBuilder-footer-addfilter",
    onClick: onAddRullonRootLevel
  }, /*#__PURE__*/_preactCompat.default.createElement("span", {
    className: "ms-Icon ms-Icon--Add"
  }), /*#__PURE__*/_preactCompat.default.createElement("span", {
    className: "queryBuilder-footer-title"
  }, "Add Filter"))));
};

exports.QueryBuilder = QueryBuilder;

var useQueryBuilderActions = function useQueryBuilderActions(query, fields, combinators, createRule, getInitialQuery, onQueryChange, getOperatorsMain, getValidQuery, getRuleDefaultValue, resetOnFieldChange, resetOnOperatorChange, getValueEditorType, getSelectedColumn, getRuleUpdatedValue) {
  var _useState = (0, _preactCompat.useState)(getInitialQuery()),
      _useState2 = _slicedToArray(_useState, 2),
      root = _useState2[0],
      setRoot = _useState2[1];

  var onRuleAdd = function onRuleAdd(rule, parentId) {
    // Adds a rule to the query
    var rootCopy = (0, _cloneDeep.default)(root);
    var parent = (0, _utils.findRule)(parentId, rootCopy);

    if (parent) {
      // istanbul ignore else 
      var groupIndex = parent.rules.findIndex(function (rule) {
        return rule.combinator;
      });

      if (groupIndex > -1) {
        parent.rules.splice(groupIndex, 0, _objectSpread(_objectSpread({}, rule), {}, {
          value: getRuleDefaultValue(rule)
        }));
      } else {
        parent.rules.push(_objectSpread(_objectSpread({}, rule), {}, {
          value: getRuleDefaultValue(rule)
        }));
      }

      setRoot(rootCopy);

      _notifyQueryChange(rootCopy);
    }
  };

  var onAddRullonRootLevel = function onAddRullonRootLevel() {
    var rootCopy = (0, _cloneDeep.default)(root);
    var groupIndex = rootCopy.rules.findIndex(function (rule) {
      return rule.combinator;
    });

    if (groupIndex > -1) {
      rootCopy.rules.splice(groupIndex, 0, createRule());
    } else {
      rootCopy.rules.push(createRule());
    }

    setRoot(rootCopy);

    _notifyQueryChange(rootCopy);
  };

  var onGroupAdd = function onGroupAdd(group, parentId) {
    //Adds a rule group to the query
    var rootCopy = (0, _cloneDeep.default)(root);
    var parent = (0, _utils.findRule)(parentId, rootCopy);

    if (parent) {
      // istanbul ignore else
      var newRule = createRule();
      group.rules.push(_objectSpread(_objectSpread({}, newRule), {}, {
        value: getRuleDefaultValue(newRule)
      }));
      parent.rules.push(group);
      setRoot(rootCopy);

      _notifyQueryChange(rootCopy);
    }
  };

  var onPropChange = function onPropChange(prop, value, ruleId) {
    var rootCopy = (0, _cloneDeep.default)(root);
    var rule = (0, _utils.findRule)(ruleId, rootCopy);

    if (rule) {
      // istanbul ignore else 
      var _preOperator = rule.operator;
      (0, _objectAssign2.default)(rule, _defineProperty({}, prop, value));

      if (resetOnFieldChange && prop === 'field') {
        // Reset operator and set default value for field change
        (0, _objectAssign2.default)(rule, {
          operator: getOperatorsMain(rule.field)[0].name,
          value: getRuleDefaultValue(rule)
        });
      }

      if (resetOnOperatorChange && prop === 'operator') {
        var _value = getRuleUpdatedValue(rule, _preOperator);

        Object.assign(rule, {
          value: _value
        });
      }

      setRoot(rootCopy);

      _notifyQueryChange(rootCopy, prop, ruleId);
    }
  };

  var onRuleRemove = function onRuleRemove(ruleId, parentId) {
    //Removes a rule from the query
    var rootCopy = (0, _cloneDeep.default)(root);
    var parent = (0, _utils.findRule)(parentId, rootCopy);

    if (parent) {
      // istanbul ignore else 
      var index = (0, _arrayFindIndex.default)(parent.rules, function (x) {
        return x.id === ruleId;
      });
      parent.rules.splice(index, 1);
      var updatedQuery = {
        id: rootCopy.id,
        name: rootCopy.name ? rootCopy.name : "",
        email: rootCopy.email ? rootCopy.email : "",
        rules: [],
        combinator: rootCopy.combinator
      };
      getValidQuery(rootCopy, updatedQuery, true);
      setRoot(updatedQuery);

      _notifyQueryChange(updatedQuery);
    }
  };

  var onGroupRemove = function onGroupRemove(groupId, parentId) {
    //Removes a rule group from the query
    var rootCopy = (0, _cloneDeep.default)(root);
    var parent = (0, _utils.findRule)(parentId, rootCopy);

    if (parent) {
      // istanbul ignore else 
      var index = (0, _arrayFindIndex.default)(parent.rules, function (x) {
        return x.id === groupId;
      });
      parent.rules.splice(index, 1);
      var updatedQuery = {
        id: rootCopy.id,
        name: rootCopy.name ? rootCopy.name : "",
        email: rootCopy.email ? rootCopy.email : "",
        isActive: rootCopy.isActive,
        rules: [],
        combinator: rootCopy.combinator
      };
      getValidQuery(rootCopy, updatedQuery, true);
      setRoot(updatedQuery);

      _notifyQueryChange(updatedQuery);
    }
  };

  var clearRule = function clearRule() {
    var rootCopy = (0, _cloneDeep.default)(root);
    var updatedQuery = {
      id: rootCopy.id,
      name: rootCopy.name ? rootCopy.name : "",
      email: rootCopy.email ? rootCopy.email : "",
      isActive: rootCopy.isActive,
      rules: [],
      combinator: rootCopy.combinator
    };
    setRoot(updatedQuery);

    _notifyQueryChange(updatedQuery);
  };

  var getLevelFromRoot = function getLevelFromRoot(id) {
    //Gets the level of the rule with the provided ID
    return (0, _utils.getLevel)(id, 0, root);
  };

  var _notifyQueryChange = function _notifyQueryChange(newRoot, prop, ruleId) {
    // Executes the `onQueryChange` function, if provided   
    if (onQueryChange) {
      // istanbul ignore else
      var newQuery = (0, _cloneDeep.default)(newRoot);
      onQueryChange(newQuery, prop, ruleId);
    }
  };

  return {
    root: root,
    clearRule: clearRule,
    setRoot: setRoot,
    getInitialQuery: getInitialQuery,
    createRule: createRule,
    _notifyQueryChange: _notifyQueryChange,
    getLevelFromRoot: getLevelFromRoot,
    onGroupRemove: onGroupRemove,
    onRuleRemove: onRuleRemove,
    onPropChange: onPropChange,
    onGroupAdd: onGroupAdd,
    onAddRullonRootLevel: onAddRullonRootLevel,
    onRuleAdd: onRuleAdd
  };
};

var useQueryBuilderProps = function useQueryBuilderProps(getValueEditorType, getInputType, getValues, getOperators, operators, getPlaceHolder) {
  var getNormalQuery = function getNormalQuery(query) {
    var updatedQuery = {
      id: query.id,
      name: query.name ? query.name : "",
      email: query.email ? query.email : "",
      isActive: query.isActive,
      rules: [],
      combinator: query.combinator
    };
    query.rules.forEach(function (rule) {
      if (!rule.combinator) updatedQuery.rules.push(rule);
    });
    return updatedQuery;
  };

  var getValueEditorTypeMain = function getValueEditorTypeMain(field, operator) {
    // Gets the ValueEditor type for a given field and operator  
    if (getValueEditorType) {
      var vet = getValueEditorType(field, operator);
      if (vet) return vet;
    }

    return 'text';
  };

  var getPlaceHolderMain = function getPlaceHolderMain(field, operator) {
    // Gets the `<input />` type for a given field and operator  
    if (getPlaceHolder) {
      var placeHolder = getPlaceHolder(field, operator);
      if (placeHolder) return placeHolder;
    }

    return '';
  };

  var getInputTypeMain = function getInputTypeMain(field, operator) {
    // Gets the `<input />` type for a given field and operator  
    if (getInputType) {
      var inputType = getInputType(field, operator);
      if (inputType) return inputType;
    }

    return 'text';
  };

  var getValuesMain = function getValuesMain(field, operator) {
    // Gets the list of valid values for a given field and operator  
    if (getValues) {
      var vals = getValues(field, operator);
      if (vals) return vals;
    }

    return [];
  };

  var getOperatorsMain = function getOperatorsMain(field) {
    // Gets the operators for a given field
    if (getOperators) {
      var ops = getOperators(field);
      if (ops) return ops;
    }

    return operators;
  };

  var getRuleUpdatedValue = function getRuleUpdatedValue(rule, preOperator) {
    var preType = getValueEditorType && getValueEditorType(rule.field, preOperator);
    var curType = getValueEditorType && getValueEditorType(rule.field, rule.operator);
    var _value = rule.value;

    if (preType != curType) {
      switch (curType) {
        case "checkbox":
          _value = true;
          break;

        case "radio":
          _value = true;
          break;

        default:
          _value = "";
      }
    }

    return _value;
  };

  var getRuleDefaultValue = function getRuleDefaultValue(rule) {
    var value = '';
    var values = getValuesMain(rule.field, rule.operator);

    if (values.length) {
      value = "";
    } else {
      var editorType = getValueEditorTypeMain(rule.field, rule.operator);

      if (editorType === 'checkbox') {
        value = false;
      }
    }

    return value;
  };

  var getValidQuery = function getValidQuery(query, parent, isRoot) {
    var root;

    if (query.combinator) {
      var _query = query;

      if (isRoot) {
        root = parent;
      } else {
        root = {
          id: _query.id,
          rules: [],
          combinator: _query.combinator
        };
      }

      var len = _query.rules.length;

      for (var i = 0; i < len; i++) {
        var _rule2 = _query.rules[i];
        getValidQuery(_rule2, root, false);
      }

      if (!isRoot && root.rules.length > 0) {
        parent.rules.push(root);
      }
    } else {
      var _rule = query;
      root = {
        field: _rule.field,
        operator: _rule.operator,
        value: _rule.value
      };
      parent.rules.push(root);
    }
  };

  return {
    getRuleUpdatedValue: getRuleUpdatedValue,
    getValueEditorTypeMain: getValueEditorTypeMain,
    getInputTypeMain: getInputTypeMain,
    getOperatorsMain: getOperatorsMain,
    getRuleDefaultValue: getRuleDefaultValue,
    getValuesMain: getValuesMain,
    getPlaceHolderMain: getPlaceHolderMain,
    getValidQuery: getValidQuery,
    getNormalQuery: getNormalQuery
  };
};

QueryBuilder.displayName = 'QueryBuilder';