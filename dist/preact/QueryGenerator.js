"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryGenerator = void 0;

var _preactCompat = _interopRequireDefault(require("preact-compat"));

var _QueryBuilder = require("./QueryBuilder");

require("../../css/query-builder.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "./query-builder.less";
var QueryGenerator = function QueryGenerator(_ref) {
  var onQueryChange = _ref.onQueryChange,
      query = _ref.query,
      _ref$fields = _ref.fields,
      fields = _ref$fields === void 0 ? [] : _ref$fields,
      getOperators = _ref.getOperators,
      getInputType = _ref.getInputType,
      getPlaceHolder = _ref.getPlaceHolder,
      getValueEditorType = _ref.getValueEditorType,
      getValues = _ref.getValues,
      showAddGroup = _ref.showAddGroup,
      removeIconatStart = _ref.removeIconatStart,
      showAddRule = _ref.showAddRule,
      showCombinatorsBetweenRules = _ref.showCombinatorsBetweenRules,
      enableNormalView = _ref.enableNormalView,
      onAdvancedClick = _ref.onAdvancedClick,
      getSelectedColumn = _ref.getSelectedColumn;
  var generatorCls = !showAddGroup ? "query-generator hide-group" : "query-generator";
  return /*#__PURE__*/_preactCompat.default.createElement("div", {
    className: generatorCls
  }, /*#__PURE__*/_preactCompat.default.createElement(_QueryBuilder.QueryBuilder, {
    query: query,
    fields: fields,
    controlClassnames: {
      fields: 'form-control'
    },
    onQueryChange: onQueryChange,
    getOperators: getOperators,
    getInputType: getInputType,
    getPlaceHolder: getPlaceHolder,
    getValueEditorType: getValueEditorType,
    showCombinatorsBetweenRules: showCombinatorsBetweenRules,
    enableNormalView: enableNormalView,
    onAdvancedClick: onAdvancedClick,
    showAddGroup: showAddGroup,
    removeIconatStart: removeIconatStart,
    showAddRule: showAddRule,
    resetOnOperatorChange: true,
    getValues: getValues,
    getSelectedColumn: getSelectedColumn
  }));
};

exports.QueryGenerator = QueryGenerator;